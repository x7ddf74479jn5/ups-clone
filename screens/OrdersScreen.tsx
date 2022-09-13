import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";
import { useTailwind } from "tailwind-rn/dist";
import { useOrders } from "../hooks/useOrders";
import { Button, Image } from "@rneui/themed";
import { OrderCard } from "../components/OrderCard";

type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

export const OrdersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const { loading, orders, error } = useOrders();
  const [ascending, setAscending] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}>Orders</Text>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#EB6A7C" }}>
      <Image
        source={{ uri: "assets/purchase-order-tracking-software.jpg" }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />

      <View>
        <Button
          onPress={() => setAscending(!ascending)}
          color="pink"
          titleStyle={{ color: "gray", fontWeight: "400" }}
          style={tw("py-2 px-5")}
        >
          {ascending ? "Showing: Oldest First" : "Showing: Recent First"}
        </Button>

        {orders
          .sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </ScrollView>
  );
};
