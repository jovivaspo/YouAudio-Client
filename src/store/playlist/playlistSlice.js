import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAudio: null,
  items: [],
  title: "",
  id: null,
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: localStorage.getItem("playlist")
    ? JSON.parse(localStorage.getItem("playlist"))
    : initialState,
  reducers: {
    onInit: (state, { payload }) => {
      state.items = payload.items;
      state.currentAudio = payload.items[0];
      state.title = payload.title;
      state.id = payload.title;
    },
    onChange: (state, { payload }) => {
      state.currentAudio = state.items[payload.index];
    },
    onReset: (state) => {
      state = initialState;
    },
  },
});

export const { onInit, onChange, onReset } = playlistSlice.actions;
