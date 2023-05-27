import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const CustomCategory = ({
  title,
  icon,
  onPress,
  activeSelect = "",
  itemId,
  condition,
  bgCondition
}) => {
  const global = require("@/utils/styles/global.js");
  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 80,
        marginVertical: 10,
      }}
      onPress={onPress}
      activeOpacity={1}
    >
      <View
        style={[
          activeSelect === itemId ? global.mainBgColor : {borderColor: '#404040', borderWidth: 0.4},
          {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            height: 67,
            width: 67,
          },
        ]}
      >
        {condition ? (
          <View style={{backgroundColor: bgCondition, height: 30, width: 30, borderRadius: 60}} />
        ) : (
          <Image
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
            source={{ uri: icon }}
          />
        )}
      </View>

      <Text
        style={[global.topGray ,{
          flex: 1,
          fontSize: 13,
          marginTop: 5,
          textTransform: "capitalize",
          textAlign: "center",
          fontFamily: "regular",
        }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomCategory;
