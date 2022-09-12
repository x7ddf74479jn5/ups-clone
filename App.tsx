import { Text, View } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import utilities from "tailwind.json";

export default function App() {
  return (
    // @ts-ignore TailwindProvider ims missing a type definition
    <TailwindProvider utilities={utilities}>
      <View></View>
    </TailwindProvider>
  );
}
