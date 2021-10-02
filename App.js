import { StatusBar } from "expo-status-bar";
// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
// import firebase, { auth, db } from "./api/Firebase/firebase";
import {
	StyleSheet,
	Text,
	View,
	// StatusBar,
	LogBox,
	Platform,
	SafeAreaView,
	Alert,
	Dimensions,
	ImageBackground,
	ActivityIndicator,
} from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./stores/configureStore";
import { enableScreens } from "react-native-screens";
import { actions } from "./stores/main";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./screens/Home";
import { Editor } from "./screens/Editor";
import { Viewer } from "./screens/Viewer";
import { ThemeColors } from "./utils/navigationTheme";
import { useColorScheme } from "react-native-appearance";
import * as Analytics from "expo-firebase-analytics";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { width, height, scale } = Dimensions.get("window");

enableScreens();
const { persistor, store } = configureStore();

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={<ActivityIndicator />} persistor={persistor}>
				<StatusBar barStyle={"light-content"} />
			</PersistGate>
			<Router />
		</Provider>
	);
}
function Router() {
	const scheme = useColorScheme();
	const routeNameRef = React.useRef();
	const navigationRef = React.useRef(null);

	return (
		<View style={{ flex: 1 }}>
			<NavigationContainer
				// theme={ThemeColors(scheme)}
				// theme={ navigationTheme } ref={ navigationRef }
				ref={navigationRef}
				onReady={() => {
					const currentRouteName =
						navigationRef?.current?.getCurrentRoute()?.name;
					routeNameRef.current =
						navigationRef?.current?.getCurrentRoute()?.name;
				}}
				onStateChange={() => {
					const previousRouteName = routeNameRef.current;
					const currentRouteName =
						navigationRef?.current?.getCurrentRoute()?.name;
					if (previousRouteName !== currentRouteName) {
						// The line below uses the expo-firebase-analytics tracker
						// https://docs.expo.io/versions/latest/sdk/firebase-analytics/
						// Change this line to use another Mobile analytics SDK
						Analytics.setCurrentScreen(currentRouteName);
					}
					// Save the current route name for later comparision
					routeNameRef.current = currentRouteName;
				}}
			>
				<Stack.Navigator
				// headerMode="none"
				// screenOptions={{ animationEnabled: false }}
				>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Editor" component={Editor} />
					<Stack.Screen name="Viewer" component={Viewer} />
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}
