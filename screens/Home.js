import React, { useEffect, useState, createRef, useRef } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	Pressable,
	View,
	TouchableOpacity,
	FlatList,
	ScrollView,
	SafeAreaView,
	Image,
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
import DraggableFlatList from "react-native-draggable-flatlist";
import { EditMode } from "./ListEditor";

export const Home = ({ navigation }) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.main);
	const list = useSelector((state) => state.main.item);
	// useEffect(() => {
	// 	Analytics.setCurrentScreen("xx_entrance_screen");
	// }, []);
	const [mode, setMode] = useState(0);
	const onEditEnd = () => {
		setMode(0);
	};
	useEffect(() => {
		mode === 0 &&
			navigation.setOptions({
				headerRight: () => (
					<TouchableOpacity
						onPress={() => {
							dispatch(actions.handleIndex(list.length));

							dispatch(actions.addItem());
							navigation.navigate("Editor");
						}}
						style={{ marginRight: 20, paddingHorizontal: 5 }}
					>
						<Icon name="add-outline" type="ionicon" color="#007FFF" size={30} />
					</TouchableOpacity>
				),
				headerLeft: () => (
					<TouchableOpacity
						onPress={() => {
							setMode(1);
						}}
						style={{ marginLeft: 20, paddingHorizontal: 5 }}
					>
						{/* <Text style={{ fontSize: 17 }}>Edit</Text> */}
						<Icon
							name="list-outline"
							type="ionicon"
							color="#007FFF"
							size={30}
						/>
					</TouchableOpacity>
				),
				title: "Home",
			});
	}, [list, mode]);
	const renderItem = (props) => {
		const item = props.item;
		return (
			<TouchableOpacity
				onPress={() => {
					dispatch(actions.handleIndex(props.index));
					navigation.navigate("Viewer");
				}}
				style={{
					backgroundColor: "white",
					borderRadius: 10,
					padding: 20,
					marginVertical: 4,
					marginHorizontal: 16,
					flex: 1,
					flexDirection: "row",
				}}
			>
				<View style={{ marginRight: 20 }}>
					{item.image ? (
						<Image
							source={{ uri: item.image }}
							style={{
								width: 70,
								height: 70,
								borderRadius: 10,
							}}
						/>
					) : (
						<Icon
							name="image-outline"
							type="ionicon"
							color="gray"
							style={{
								width: 70,
								height: 70,
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 10,
								borderWidth: 1,
								borderColor: "#007FFF",
							}}
						/>
					)}
				</View>

				<View style={{ flex: 1 }}>
					<View style={{ borderBottomWidth: 0.5, borderColor: "#007FFF" }}>
						<Text
							style={{
								textAlign: "center",
								// fontSize: 25,
								marginBottom: 10,
								fontWeight: "bold",
								color: "#3B3B3B",
								// color: "#333333",
								fontSize: Platform.OS === "ios" ? 32 : 24,
							}}
						>
							{item.name || "no title"}
						</Text>
					</View>
					{item.label.length > 0 && (
						<Text
							style={{
								fontSize: Platform.OS === "ios" ? 19 : 15,
								overflow: "hidden",
								margin: 3,
							}}
						>
							{item.label}
						</Text>
					)}
				</View>
			</TouchableOpacity>
		);
	};
	if (mode === 1) {
		return <EditMode navigation={navigation} onEditEnd={onEditEnd} />;
	}
	return (
		<View
			style={{
				flex: 1,
				flex: 1,
				justifyContent: "center",
			}}
		>
			<FlatList
				style={{ flex: 1 }}
				data={list}
				renderItem={renderItem}
				keyExtractor={(item, i) => String(i)}
				ListEmptyComponent={<ListEmptyComponent />}
				ListHeaderComponent={<View style={{ height: 20 }} />}
				ListFooterComponent={<View style={{ height: 100 }} />}
			/>
		</View>
	);
};
export const ListEmptyComponent = () => (
	<SafeAreaView style={{ flex: 1, alignItems: "center" }}>
		<Text
			style={{
				fontWeight: "bold",
				color: "gray",
				fontSize: 32,
				marginTop: 10,
			}}
		>
			No Item
		</Text>
	</SafeAreaView>
);
