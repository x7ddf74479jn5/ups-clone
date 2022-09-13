import { View, Text } from "react-native";
import React from "react";

type Props = {
  item: Order;
};

export const OrderCard: React.FC<Props> = ({ order }) => {
  return (
    <View>
      <Text>OrderCard</Text>
    </View>
  );
};
