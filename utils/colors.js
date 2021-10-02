import React, { useEffect, useState, useCallback, useRef } from "react";
import { useColorScheme } from "react-native-appearance";
export const Colors = {
	primary: "#a965e0",
	background: "#ffffff",
	card: "#ffffff",
	text: "#f57c00",
	border: "#636363",
	secondary: "#86868d",
	link: "#039be5",
};
export const DarkColors = {
	primary: "#b08eff",
	// primary: "#f57c00",
	background: "#000000",
	card: "#303030",
	text: "#ffffff",
	border: "#636363",
	// notification:
	secondary: "#636363",
	link: "#039be5",
};
export const darkColorcontroller = () => {
	let scheme = useColorScheme();

	React.useEffect(() => {}, []);
	if (scheme == "dark") {
		return Colors;
	} else {
		return DarkColors;
	}
};
