import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
export const CustomersScreen = () => {
  const tw = useTailwind();
  return (
    <SafeAreaView style={tw("")}>
      <Text>CustomersScreen</Text>
    </SafeAreaView>
  );
};
