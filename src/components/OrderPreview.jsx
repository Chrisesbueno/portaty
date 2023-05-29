import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import CustomCardOrder from "./CustomCardOrder";
import styles from "@/utils/styles/OrderPreview.module.css";
import CustomTimeOrderCard from "./CustomTimeOrderCard";
import { ScrollView } from "react-native-gesture-handler";
import { Auth, API } from "aws-amplify";
import * as queries from "@/graphql/queries";
import * as customHome from "@/graphql/CustomQueries/Home";
import * as mutations from "@/graphql/mutations";

const OrderPreview = ({route}) => {
  const global = require("@/utils/styles/global.js");
  const { product, order, images } = route.params
  const [customerShop, setCustomerShop] = useState('')
  const fetchOrder = async () => {

    const orderDetail = await API.graphql({
      query: customHome.getOrderItem,
      variables: {
        id: '02de5db7-0ce1-40ca-8f51-b4c04ea974a4',
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    // const shop = await API.graphql({
    //   query: queries.getCustomerShop,
    //   variables: { userID: orderDetail.data.getOrderDetail.items.items[0].item.product.owner },
    //   authMode: "AMAZON_COGNITO_USER_POOLS",
    // });
    // const productItem = await API.graphql({
    //   query: customHome.getADProductPrueba,
    //   variables: { id: shop.data.getCustomerShop.purchaseOrders.items[0].items.items[0].item.product.productID },
    //   authMode: "AWS_IAM",
    // });]
    console.log(orderDetail.data)
    // // setCustomerShop()/*  */
  }
  useEffect(() => {
    fetchOrder()
  }, [])
  
  return (
    <ScrollView style={[global.bgWhite, { padding: 20, flex: 1, paddingTop: 10 }]}>
      <Text style={styles.title}>Pedido</Text>
      <CustomCardOrder item={product} image={images[0]}/>
      <View style={[styles.line, global.bgWhiteSmoke]} />
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>Tiempo estimado</Text>
        <CustomTimeOrderCard
          content={{
            title: "Estándar",
            text: "Fecha estimada: Lunes 17 Abril",
          }}
        />
      </View>
      <View style={[styles.line, global.bgWhiteSmoke]} />
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>Seguimiento de tu pedido</Text>
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 5,
              borderWidth: 0.5,
              borderColor: "#404040",
              borderRadius: 12,
              padding: 10,
            },
          ]}
        >
          <View
            style={[
              {
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                marginBottom: 10,
                resizeMode: "contain",
              }}
              source={require("@/utils/images/departure.png")}
            />
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
              }}
              source={
                true
                  ? require("@/utils/images/yes.png")
                  : require("@/utils/images/circle.png")
              }
            />
            <Text
              style={[global.topGray, { fontFamily: "light", fontSize: 12 }]}
            >
              Embalado
            </Text>
          </View>
          <Image
            style={{
              width: 100,
              height: 30,
              marginBottom: -45,
              resizeMode: "contain",
            }}
            source={require("@/utils/images/lines.png")}
          />
          <View
            style={[
              {
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                marginBottom: 10,
                resizeMode: "contain",
              }}
              source={require("@/utils/images/send.png")}
            />
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
              }}
              source={
                false
                  ? require("@/utils/images/yes.png")
                  : require("@/utils/images/circle.png")
              }
            />
            <Text
              style={[global.topGray, { fontFamily: "light", fontSize: 12 }]}
            >
              Enviado
            </Text>
          </View>
          <Image
            style={{
              width: 100,
              height: 30,
              marginBottom: -45,
              resizeMode: "contain",
            }}
            source={require("@/utils/images/lines.png")}
          />
          <View
            style={[
              {
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                marginBottom: 10,
                resizeMode: "contain",
              }}
              source={require("@/utils/images/arrival.png")}
            />
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
              }}
              source={
                false
                  ? require("@/utils/images/yes.png")
                  : require("@/utils/images/circle.png")
              }
            />
            <Text
              style={[global.topGray, { fontFamily: "light", fontSize: 12 }]}
            >
              Llegada
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.line, global.bgWhiteSmoke]} />
      <View style={{marginBottom: 95}}>
        <Text style={styles.title}>Total del pedido</Text>
        <View>
        <Text style={styles.numberOrder}>Precio del producto: ${product.price}.00</Text>
          <Text style={styles.numberOrder}>Impuestos: $10.00</Text>
          <Text style={styles.numberOrder}>Envio: $10.00</Text>
          <Text style={styles.numberOrder}>Comision: $10.00</Text>
      <View style={[styles.lineTotal, global.bgWhiteSmoke]} />
          <Text style={styles.numberTotal}>Total: $130.00</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderPreview;
