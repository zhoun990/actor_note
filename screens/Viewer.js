import React, { useEffect, useState, createRef, useRef } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	Pressable,
	View,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	Button,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import * as Linking from "expo-linking";
// import * as Analytics from "expo-firebase-analytics";
// import { Text, Button } from "../custom/CustomComponents";
import { Colors } from "../utils/colors";
// import { auth } from "../api/Firebase/firebase";
import { actions } from "../stores/main";
import { Icon, Input } from "react-native-elements";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Image } from "react-native";
import { KeyboardAvoidingView } from "react-native";

export const Viewer = ({ navigation }) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.main);
	const index = useSelector((state) => state.main.index);
	const item = useSelector((state) => state.main.item[index]);
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 30 }}
					onPress={() => navigation.navigate("Editor")}
				>
					<Icon
						name="create-outline"
						type="ionicon"
						color="#007FFF"
						size={30}
					/>
				</TouchableOpacity>
			),

			title: "Detail",
		});
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<View style={{ flex: 1, margin: 30 }}>
				<View style={{ flexDirection: "row", borderWidth: 0 }}>
					<View style={{ justifyContent: "center" }}>
						{item.image ? (
							<Image
								source={{ uri: item.image }}
								style={{
									width: 100,
									height: 100,
									borderRadius: 10,
								}}
							/>
						) : (
							<Icon
								name="image-outline"
								type="ionicon"
								color="gray"
								size={30}
								style={{
									width: 100,
									height: 100,
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 10,
									borderWidth: 1,
									borderColor: "#007FFF",
								}}
							/>
						)}
					</View>
					<View style={{ flex: 1, marginTop: 20, marginLeft: 10 }}>
						<View style={{ borderBottomWidth: 0.5, borderColor: "#007FFF" }}>
							<Text
								style={{
									fontSize: 22,
									textAlign: "center",
									fontWeight: "400",
								}}
							>
								{item.name || "no title"}
							</Text>
						</View>
						<Text
							style={{
								fontSize: Platform.OS === "ios" ? 18 : 15,
								marginTop: 5,
							}}
						>
							{item.label}
						</Text>
					</View>
				</View>
				<ScrollView style={{ margin: 20 }}>
					<Text
						style={{
							fontSize: Platform.OS === "ios" ? 17 : 14,
							fontWeight: "500",
							color: "gray",
							marginLeft: 3,
						}}
					>
						Note
					</Text>
					<Text style={{ fontSize: Platform.OS === "ios" ? 20 : 16 }}>
						{item.note}
					</Text>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};
