import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: null,
  id: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  info: null,
};

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    status: localStorage.getItem("status-audio")
      ? localStorage.getItem("status-audio")
      : null,
    currentAudio: localStorage.getItem("currentAudio")
      ? JSON.parse(localStorage.getItem("currentAudio"))
      : initialState,
    playlist: {
      title: "",
      items: [],
    },
  },
  reducers: {
    onLoadAudio: (state, { payload }) => {
      state.currentAudio = {
        ...state.currentAudio,
        url: payload.url,
      };
      state.status = "ready";
    },
    onLoadInfo: (state, { payload }) => {
      state.currentAudio = {
        ...state.currentAudio,
        id: payload.id,
        info: payload.info,
        videosRelated: payload.videosRelated,
      };
      state.status = "new-item-selected";
    },
    onPlaylist: (state, { payload }) => {
      state.playlist = {
        title: payload.playlist.title,
        items: payload.playlist.items,
      };
    },
    onConverter: (state) => {
      state.status = "converting";
    },
    onPlaying: (state, { payload }) => {
      state.currentAudio = {
        ...state.currentAudio,
        isPlaying: payload.isPlaying,
      };
    },
    onCurrentTime: (state, { payload }) => {
      state.currentAudio = {
        ...state.currentAudio,
        currentTime: payload.currentTime,
      };
    },
    onDuration: (state, { payload }) => {
      state.currentAudio = {
        ...state.currentAudio,
        duration: payload.duration,
      };
    },
    onReset: (state) => {
      state.status = null;
      state.currentAudio = initialState;
      state.playlist = {
        title: "",
        items: [],
      };
    },
  },
});

export const {
  onLoadAudio,
  onLoadInfo,
  onPlaylist,
  onConverter,
  onPlaying,
  onCurrentTime,
  onDuration,
  onReset,
} = playerSlice.actions;
