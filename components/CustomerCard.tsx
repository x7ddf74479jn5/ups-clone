import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useCustomerOrders } from "../hooks/useCustomerOrders";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { CustomersScreenNavigationProps } from "../screens/CustomersScreen";
import { Card, Icon } from "@rneui/themed";

type Props = {
  userId: string;
  name: string;
  email: string;
};

export const CustomerCard: React.FC<Props> = ({ email, name, userId }) => {
  const { loading, orders, error } = useCustomerOrders(userId);
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProps>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("MyModal", { name, userId })}>
      <Card containerStyle={tw("p-5 rounded-lg ")}>
        <View>
          <View style={tw("flex-row justify-between")}>
            <View>
              <Text style={tw("text-2xl font-bold")}>{name}</Text>
              <Text style={[tw("text-sm"), { color: "#59C1CC" }]}>ID: {userId}</Text>
            </View>

            <View style={tw("flex-row items-center justify-end")}>
              <Text style={{ color: "#59C1CC" }}>{loading ? "loading..." : `${orders.length} x`}</Text>
              <Icon name="box" type="entypo" color="#59C1CC" style={tw("mb-5 ml-auto")} size={50} />;
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};
