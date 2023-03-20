import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: null,
  id: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
};

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    status: null,
    audio: localStorage.getItem("audio")
      ? JSON.parse(localStorage.getItem("audio"))
      : initialState,
  },
  reducers: {
    onConverter: (state) => {
      state.status = "converting";
    },
    onReady: (state, { payload }) => {
      state.status = "ready";
      state.audio = {
        ...state.audio,
        url: payload.url,
        id: payload.id,
        isPlaying: false,
      };
    },
    onPlaying: (state, { payload }) => {
      state.audio = { ...state.audio, isPlaying: payload.isPlaying };
    },
    onCurrentTime: (state, { payload }) => {
      state.audio = { ...state.audio, currentTime: payload.currentTime };
    },
    onDuration: (state, { payload }) => {
      state.audio = { ...state.audio, duration: payload.duration };
    },
    onReset: (state) => {
      state.status = null;
      state.audio = initialState;
    },
  },
});

export const {
  onConverter,
  onReady,
  onPlaying,
  onCurrentTime,
  onDuration,
  onReset,
} = playerSlice.actions;
