import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllExpenses from './app/layouts/AllExpenses';
import ManageExpense from './app/layouts/ManageExpense';
import RecentExpense from './app/layouts/RecentExpense';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalStyles } from './constants/Colors';
import { Ionicons} from "@expo/vector-icons"
import IconButton from './components/UI/IconButton';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator 
    screenOptions={
      ({ navigation }) =>({
        headerStyle:{ backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight:({tintColor}) => 
          <IconButton 
            icon="add" 
            size={24} 
            color={tintColor} 
            onPress={() => {navigation.navigate('ManageExpense')}}/>
          })}>
      <BottomTabs.Screen 
        name="RecentExpense" 
        component={RecentExpense} 
        options={{
          title:"Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({color, size}) => 
            <Ionicons name='hourglass' style={{color: color,}} size={size} />
        }}/>
      <BottomTabs.Screen 
        name="AllExpenses" 
        component={AllExpenses} 
        options={{
          title:"All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({color, size}) => 
            <Ionicons name='calendar' style={{color: color,}} size={size} />
        }}/>
    </BottomTabs.Navigator>
  )
}
const App = () => {

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle:{ backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor:"white"
            }}>
            <Stack.Screen 
              name="ExpensesOverview" 
              component={ExpensesOverview} 
              options={{
                headerShown: false
              }}/>
            <Stack.Screen 
              name="ManageExpense" 
              component={ManageExpense}
              options={{
                presentation:'modal',
              }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </> 
  )
}
export default App;

const styles = StyleSheet.create({
  
});
