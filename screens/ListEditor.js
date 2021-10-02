import React, { useEffect, useState } from "react";
import {
	Alert,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
// import { auth } from "../api/Firebase/firebase";
import { actions } from "../stores/main";
import { ListEmptyComponent } from "./Home";

export const EditMode = ({ navigation, onEditEnd }) => {
	const list = useSelector((state) => state.main.item);

	const [scrollEnabled, setScrollEnabled] = useState(true);
	const [items, setItems] = useState(list);

	const dispatch = useDispatch();

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() => {
						if (items.length !== list.length) {
							Alert.alert(
								`アイテムが削除されます。`,
								`${
									list.length - items.length
								}個のアイテムが削除されます。\n編集を完了してもよろしいですか？`,
								[
									{
										text: "Cancel",

										style: "cancel",
									},
									{
										text: "OK",
										onPress: () => {
											onEditEnd();
											dispatch(actions.editItems(items));
										},
									},
								]
							);
						} else {
							onEditEnd();
							dispatch(actions.editItems(items));
						}
					}}
					style={{ marginRight: 20, paddingHorizontal: 5 }}
				>
					<Icon
						name="checkmark-outline"
						type="ionicon"
						color="#007FFF"
						size={30}
					/>
					{/* <Text style={{ fontSize: 17 }}>Done</Text> */}
				</TouchableOpacity>
			),
			headerLeft: () => (
				<TouchableOpacity
					onPress={() => {
						onEditEnd();
					}}
					style={{ marginLeft: 20, paddingHorizontal: 5 }}
				>
					<Icon
						name="arrow-back-outline"
						type="ionicon"
						// color="#007FFF"
						size={23}
					/>
					{/* <Text style={{ fontSize: 17 }}>Done</Text> */}
				</TouchableOpacity>
			),
			title: "Edit List",
		});
	}, [items]);

	const onDelete = (index) => {
		const newList = [];
		for (let i = 0; i < items.length; i++) {
			if (i !== index) {
				newList.push(items[i]);
			}
		}
		setItems(newList);
	};
	const renderItem = ({ item, index, drag, isActive }) => {
		return (
			<View
				style={{
					backgroundColor: "white",
					// marginVertical: 8,
					// marginHorizontal: 16,
					// flex: 1,
					// flexDirection: "row",
					borderRadius: 10,
					paddingVertical: 20,
					paddingHorizontal: 5,
					marginVertical: 4,
					marginHorizontal: 16,
					flex: 1,
					flexDirection: "row",
				}}
			>
				<TouchableOpacity
					style={{
						width: "15%",
						marginRight: 10,
					}}
					onPress={() => onDelete(index)}
				>
					<View
						style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
					>
						<Icon name="trash-outline" type="ionicon" color="red" size={30} />
					</View>
				</TouchableOpacity>
				<View style={{ flex: 1 }}>
					<View style={{ borderBottomWidth: 0.5, borderColor: "#007FFF" }}>
						<Text
							style={{
								fontWeight: "bold",
								color: "#3B3B3B",
								fontSize: Platform.OS === "ios" ? 32 : 24,
								flexGrow: 1,
								textAlign: "center",
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
								color: "gray",
							}}
						>
							{item.label}
						</Text>
					)}
				</View>

				<TouchableOpacity
					style={{
						width: "20%",
					}}
					onPressIn={drag}
					// onLongPress={drag}
				>
					<View
						style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
					>
						<Icon name="menu-outline" type="ionicon" color="gray" size={30} />
					</View>
				</TouchableOpacity>
			</View>
		);
	};

	// @see https://github.com/kutlugsahin/react-smooth-dnd
	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<DraggableFlatList
				data={items}
				renderItem={renderItem}
				keyExtractor={(item, i) => String(i)}
				ListEmptyComponent={<ListEmptyComponent />}
				ListHeaderComponent={<View style={{ height: 20 }} />}
				ListFooterComponent={<View style={{ height: 100 }} />}
				onDragEnd={({ data }) => setItems(data)}
			/>
		</View>
	);
};
