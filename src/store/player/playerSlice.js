import { createSlice } from "@reduxjs/toolkit";

const initialStateCurrentAudio = {
  url: null,
  id: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  seek: 0,
  info: null,
  next: null,
};

const initialStatePlaylist = {
  id: null,
  title: "",
  items: [],
  channel: null,
};

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    status: localStorage.getItem("status-audio")
      ? localStorage.getItem("status-audio")
      : null,
    currentAudio: localStorage.getItem("currentAudio")
      ? JSON.parse(localStorage.getItem("currentAudio"))
      : initialStateCurrentAudio,
    playlist: localStorage.getItem("playlist")
      ? JSON.parse(localStorage.getItem("playlist"))
      : initialStatePlaylist,
  },
  reducers: {
    onNextAudio: (state, { payload }) => {
      state.status = "starting-audio";
      state.currentAudio = { ...initialStateCurrentAudio, next: payload.id };
    },
    onLoadInfo: (state, { payload }) => {
      state.currentAudio = {
        ...state.currentAudio,
        next: null,
        id: payload.id,
        info: payload.info,
        videosRelated: payload.videosRelated,
      };
      state.status = "info-loaded";
    },
    onLoadAudio: (state, { payload }) => {
      state.currentAudio = {
        ...state.currentAudio,
        url: payload.url,
        isPlaying:true,
      };
      state.status = "audio-ready";
    },
    onLoading: (state) => {
      state.status = "loading-audio";
    },
    onPlaylist: (state, { payload }) => {
      state.playlist = {
        id: payload.id,
        title: payload.title,
        items: payload.items,
        channel: payload.channel,
      };
    },
    onConverter: (state) => {
      state.status = "converting-audio";
    },
    onSaving: (state) => {
      state.status = "saving-audio";
    },
    onSaved: (state) => {
      state.status = "audio-saved";
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
    onSeek: (state, { payload }) => {
      state.currentAudio = {
        ...state.currentAudio,
        seek: payload.seek,
      };
    },
    onReset: (state) => {
      state.status = null;
      state.currentAudio = initialStateCurrentAudio;
      state.playlist = initialStatePlaylist;
    },
    onResetUrl: (state) => {
      state.status = "reset-url";
      state.currentAudio = {
        ...state.currentAudio,
        url: null,
        isPlaying: false,
      };
    },
  },
});

export const {
  onNextAudio,
  onLoadAudio,
  onLoadInfo,
  onLoading,
  onPlaylist,
  onConverter,
  onSaving,
  onSaved,
  onPlaying,
  onCurrentTime,
  onDuration,
  onSeek,
  onReset,
  onResetUrl,
} = playerSlice.actions;
