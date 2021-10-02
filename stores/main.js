import { createSlice } from "@reduxjs/toolkit";
// import store from ".";

// Stateの初期状態
const initialState = {
	item: [],
	index: null,
};

const slice = createSlice({
	name: "main",
	initialState,
	reducers: {
		handleIndex: (state, action) => {
			state.index = action.payload;
		},
		editItems: (state, action) => {
			state.item = action.payload;
		},
		addItem: (state, action) => {
			state.item[state.item.length] = {
				image: null,
				name: "",
				label: "",
				note: "",
			};
		},
		editDone: (state, action) => {
			state.item[action.payload.index] = action.payload.value;
		},
	},
});

export default slice.reducer;
// Action Creatorsをエクスポートする
export const actions = slice.actions;
