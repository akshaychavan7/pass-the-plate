import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type RootStackParamList = {
  Home: undefined
  FoodDetail: { item: any }
  Messages: undefined
  Conversation: { conversation: any }
  Map: undefined
  SmartPantry: undefined
  AddFood: undefined
  Profile: undefined
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList> 