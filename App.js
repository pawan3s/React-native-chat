import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./views/login";
import ForgrtPasswordScreen from "./views/forgotPassword";
import Register from "./views/register";
import ConversationList from "./views/conversationList";
import Conversation from "./views/conversation";
import { Provider as PaperProvider } from "react-native-paper";
import Profile from "./views/profile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen
            name='ForgetPassword'
            component={ForgrtPasswordScreen}
          />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='ConversationList' component={ConversationList} />
          <Stack.Screen name='Conversation' component={Conversation} />
          <Stack.Screen name='Profile' component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
