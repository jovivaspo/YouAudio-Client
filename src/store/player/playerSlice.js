import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    status: null,
    audio: null,
  },
  reducers: {
    onConverter: (state) => {
      state.status = "converting";
    },
    onReady: (state, { payload }) => {
      state.status = "ready";
      state.audio = {
        url: payload.url,
        isPlaying: false,
        duration: 0,
        currentTime: 0,
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
  },
});

export const { onConverter, onReady, onPlaying, onCurrentTime, onDuration } =
  playerSlice.actions;
