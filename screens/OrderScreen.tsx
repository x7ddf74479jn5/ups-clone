import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";
import { DeliveryCard } from "../components/DeliveryCard";

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;
export const OrderScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "black" },
      headerTitle: order.trackingItems.customer.name,
      headerBackTitle: "Deliveries",
      headerTintColor: "#EB6A7C",
    });
  }, [order]);

  return (
    <View style={tw("-mt-2")}>
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};
