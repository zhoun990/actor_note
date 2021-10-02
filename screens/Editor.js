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
	KeyboardAvoidingView,
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

function toBase64Url(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var reader = new FileReader();
		reader.onloadend = function () {
			callback(reader.result);
		};
		reader.readAsDataURL(xhr.response);
	};
	xhr.open("GET", url);
	xhr.responseType = "blob";
	xhr.send();
}
const _pickImage = async (callback) => {
	await ImagePicker.requestMediaLibraryPermissionsAsync();
	const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

	if (status == "granted") {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				// aspect: [4, 3],
				quality: 1,
			});

			//撮影された（ローカルの）写真を取得
			// const localUri = await fetch(result.uri);
			//blobを取得
			// const localBlob = await localUri.blob();
			// if (!result.cancelled) {
			// ImageManipulatorでリサイズ処理
			if (result.uri) {
				const picActions = [];
				picActions.push({ resize: { width: 350 } });
				const manipulatorResult = await ImageManipulator.manipulateAsync(
					result.uri,
					picActions,
					{
						compress: 0.3,
					}
				);
				console.log(
					"^_^ Log \n file: Editor.js \n line 53 \n manipulatorResult",
					manipulatorResult
				);

				// this.setState({
				// 	imgUrl: manipulatorResult.uri,
				// });
				// const localUri = await fetch(manipulatorResult.uri);
				// const localBlob = await localUri.blob();
				// setBlobImage(localBlob);
				// }
				// if (!result.cancelled) {
				// 	setImage(result.uri);
				// }
				toBase64Url(manipulatorResult.uri, function (base64Url) {
					callback(base64Url);
				});
			}
		} catch (E) {
			console.log(E);
		}
	} else {
		Alert.alert(
			"写真にアクセスできません。",
			"サムネイル画像を変更するには、端末の設定からアクセスを許可してください。"
		);
	}
};
export const Editor = ({ navigation }) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.main);
	const index = useSelector((state) => state.main.index);
	const item = useSelector((state) => state.main.item[index]);

	const [name, setName] = useState(item.name);
	const [label, setLabel] = useState(item.label);
	const [note, setNote] = useState(item.note);
	const [image, setImage] = useState(item.image);
	const [_keyboardHeight, setKeyboardHeight] = useState(0);
	const imageFunction = (base64) => {
		setImage(base64);
	};
	const [keyboardHeight] = useKeyboard();
	useEffect(() => {
		navigation.setOptions({
			// headerRight: () => (
			// 	<TouchableOpacity
			// 		style={{ marginRight: 30 }}
			// 		onPress={() => editDone()}
			// 	>
			// 		<Text style={{ fontWeight: "bold" }}>完了</Text>
			// 	</TouchableOpacity>
			// ),

			title: "Edit",
		});
		dispatch(
			actions.editDone({
				index: index,
				value: {
					image: image,
					name: name,
					label: label,
					note: note,
				},
			})
		);
	}, [name, label, note, image]);
	useEffect(() => {
		keyboardHeight > _keyboardHeight && setKeyboardHeight(keyboardHeight + 30);
	}, [keyboardHeight]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<ScrollView style={{ flex: 1 }}>
				<View style={{ flex: 1, margin: 30 }}>
					<View
						style={{ flexDirection: "row", borderWidth: 0, marginBottom: 7 }}
					>
						<TouchableOpacity
							style={{ justifyContent: "center" }}
							onPress={async () => {
								await _pickImage(imageFunction);
							}}
						>
							{image ? (
								<Image
									source={{ uri: image }}
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
						</TouchableOpacity>
						<View style={{ flex: 1, marginTop: 20 }}>
							<Input
								label="Name"
								value={name}
								onChangeText={(value) => setName(value)}
							/>
						</View>
					</View>

					<Input
						numberOfLines={10}
						multiline={true}
						label="Label"
						style={{ textAlignVertical: "top" }}
						value={label}
						onChangeText={(value) => setLabel(value)}
					/>
					<Input
						label="Note"
						numberOfLines={10}
						multiline={true}
						style={{ textAlignVertical: "top" }}
						value={note}
						onChangeText={(value) => setNote(value)}
					/>
				</View>
				<View style={{ height: _keyboardHeight }} />
			</ScrollView>
		</SafeAreaView>
	);
};
import { Keyboard, KeyboardEvent } from "react-native";

export const useKeyboard = () => {
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	function onKeyboardDidShow(e) {
		setKeyboardHeight(e.endCoordinates.height);
	}

	function onKeyboardDidHide() {
		setKeyboardHeight(0);
	}

	useEffect(() => {
		Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
		Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
		return () => {
			Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow);
			Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide);
		};
	}, []);

	return [keyboardHeight];
};
