import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import React, { useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { Image, Input } from "@rneui/themed";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/queries";
import { CustomerCard } from "../components/CustomerCard";

export type CustomersScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>;

export const CustomersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProps>();
  const [input, setInput] = useState("");
  const { loading, data, error } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#59C1CC" }}>
      <Image
        source={{
          uri: "assets/uU8GTZM.jpeg",
        }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />

      <Input
        placeholder="Search by Customer"
        value={input}
        onChangeText={setInput}
        containerStyle={tw("bg-white pt-5 pb-0 px-10")}
      />

      {data?.getCustomers
        .filter((customer: CustomerList) => customer.value.name.includes(input))
        .map(({ name: ID, value: { name, email } }: CustomerResponse) => (
          <CustomerCard key={ID} email={email} name={name} userId={ID} />
        ))}
    </ScrollView>
  );
};
