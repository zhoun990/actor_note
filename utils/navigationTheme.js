import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";

import Colors, { darkColors } from "../utils/colors";

export const ThemeColors = (scheme) => {
	// const scheme = "useColorScheme();";

	if (scheme !== "dark") {
		return {
			...DefaultTheme,
			// override colors
			colors: {
				...DefaultTheme.colors,
				primary: "#007FFF",
				// primary: Colors.primary,
				// background: Colors.background,
				// card: Colors.white,
				// text: Colors.primary,
				// border: Colors.frame,
				// notification: darkColors.card,
			},
		};
	} else {
		return {
			...DarkTheme,
			// override colors
			colors: {
				...DarkTheme.colors,
				// primary: darkColors.primary,
				// background: darkColors.background,
				// card: darkColors.card,
				// text: darkColors.text,
				// border: darkColors.border,
				// notification: darkColors.card,
			},
		};
	}
};
