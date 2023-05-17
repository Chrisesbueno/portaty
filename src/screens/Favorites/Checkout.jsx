import { View, Text} from "react-native";
import React, { useState } from "react";
import styles from "@/utils/styles/Checkout.module.css";
import CustomAddressCard from "@/components/CustomAddressCard";
import CustomCardList from "@/components/CustomCardList";
import { ScrollView } from "react-native-gesture-handler";
import CustomShippingCard from "@/components/CustomShippingCard";
import { es } from "@/utils/constants/lenguage";
import ModalSellComplete from "@/components/ModalSellComplete";

const Checkout = ({ navigation }) => {
  const global = require("@/utils/styles/global.js");
  const onHandlePress = () => navigation.navigate("Address_Edit");
  const onHandlePreview = () => navigation.navigate("Order_Preview");
  return (
    <ScrollView style={[styles.container, global.bgWhite]}>
      <View style={styles.section}>
        <Text style={styles.title}>{es.checkout.address.title}</Text>

        <CustomAddressCard
          content={{
            title: "Casa",
            text: "Calle 5 #34 - Barquisimeto, Lara",
          }}
          handlePress={onHandlePress}
        />
      </View>

      <View style={styles.section}>
        <View style={[styles.line, global.bgWhiteSmoke]} />

        <Text style={styles.title}>{es.checkout.order.title}</Text>

        <CustomCardList />
        {/* <CustomCardList /> */}
        {/* <CustomCardList /> */}
      </View>
      <View style={[styles.section, { marginBottom: 100 }]}>
        <View style={[styles.line, global.bgWhiteSmoke]} />

        <Text style={styles.title}>{es.checkout.shipping.title}</Text>
        <CustomShippingCard
          content={{
            title: "Estándar",
            text: "Fecha estimada: Lunes 17 Abril",
          }}
        />
       <ModalSellComplete onHandlePress={() => onHandlePreview()} />
      </View>
    </ScrollView>
  );
};

export default Checkout;