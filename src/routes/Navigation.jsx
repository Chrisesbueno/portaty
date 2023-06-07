import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginNavigator from "./Authentication/LoginNavigator";

// amplify
import { Auth, Hub, API, graphqlOperation, Storage } from "aws-amplify";
import * as mutationsNavigation from "@/graphql/CustomMutations/Navigation";

// recoil
import { useRecoilState } from "recoil";
import { userAutenticated } from "@/atoms/index";
import Tabs from "./Tabs/Tabs";
import SearchNavigator from "./Tabs/SearchNavigator";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const [userAuth, setUserAuth] = useRecoilState(userAutenticated);

  const checkUser = async () => {
    try {
      const result = await Auth.currentAuthenticatedUser({
        bypassCache: true
      });
      setUserAuth(result);
      if (!result.attributes['custom:identityID'] || result.attributes['custom:identityID'] === "") await updateAttributeIdentityID(result)
      // configStoragePrefix(result);
      // console.log("Configurado")
    } catch (error) {
      setUserAuth(undefined);
      console.error("CHECK USER ERROR: ", error)
    }
  };

  const updateAttributeIdentityID = async (user) => {
    try {
      // obtenermos el identityID (id unico por usuario autenticado por cognito)
      const { identityId } = await Auth.currentUserCredentials();
      // cargar atributo en cognito
      await Auth.updateUserAttributes(user, {
        "custom:identityID": identityId
      })
      // cargar en customer shop
      const params = {
        input: {
          userID: user.attributes.sub,
          identityId: identityId
        }
      }
      const ejele = await API.graphql({
        query: mutationsNavigation.updateChargeIdentityIdCustomerShop,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: params
      })
      console.log("EJELE: ", ejele)
    } catch (error) {
      console.error("Error al cargar Atributo: ", error);
    }

  }

  const configStoragePrefix = (result) => {
    Storage.configure({
      customPrefix: {
        public: 'myPublicPrefix/',
        protected: 'myProtectedPrefix/',
        private: 'myPrivatePrefix/'
      },

    })
  }
  useEffect(() => {
    // crear subscripcion
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log("HUB: ", event);
      console.log("HUB DATA: ", data);
      switch (event) {
        case "signIn":
          checkUser();
          break;
        case "signOut":
          setUserAuth(undefined);
          break;
        case "confirmSignUp":
          break;
        case "autoSignIn":
          break;
        case "updateUserAttributes":
          break;
      }
    });
    // Preguntar si el usuario existe
    checkUser();
    return unsubscribe;
  }, []);



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={`Login`}>
        {!userAuth && (
          <Stack.Screen
            name={`Login_Welcome`}
            component={LoginNavigator}
            options={{
              headerShown: false,
            }}
          />
        )}
        <Stack.Screen
          name={`Navigator`}
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchNavigator"
          component={SearchNavigator}
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
