import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: null,
  id: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  info: null,
  videosRelated: [],
};

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    status: localStorage.getItem("status-audio")
      ? localStorage.getItem("status-audio")
      : null,
    audio: localStorage.getItem("audio")
      ? JSON.parse(localStorage.getItem("audio"))
      : initialState,
  },
  reducers: {
    onLoadInfo: (state, { payload }) => {
      state.audio = {
        ...state.audio,
        info: payload.info,
        videosRelated: payload.videosRelated,
      };
    },
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
  onLoadInfo,
  onConverter,
  onReady,
  onPlaying,
  onCurrentTime,
  onDuration,
  onReset,
} = playerSlice.actions;
