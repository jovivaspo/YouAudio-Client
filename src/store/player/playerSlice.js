import { createSlice } from "@reduxjs/toolkit";

const initialStateCurrentAudio = {
  url: null,
  id: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  seek: 0,
  info: null,
};

const initialStatePlaylist =  {
  id:null,
  title: "",
  items: [],
}

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    status: localStorage.getItem("status-audio")
      ? localStorage.getItem("status-audio")
      : null,
    currentAudio: localStorage.getItem("currentAudio")
      ? JSON.parse(localStorage.getItem("currentAudio"))
      : initialStateCurrentAudio,
    playlist:localStorage.getItem("playlist")
    ? JSON.parse(localStorage.getItem("playlist"))
    : initialStatePlaylist
  },
  reducers: {
    onLoadAudio: (state, { payload }) => {
      state.currentAudio = {
        ...state.currentAudio,
        url: payload.url,
      };
      state.status = "ready";
    },
    onLoading: (state) => {
      state.status = "loading-audio";
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
        id: payload.id,
        title: payload.title,
        items: payload.items,
      };
    },
    onConverter: (state) => {
      state.status = "converting";
    },
    onSaving: (state) => {
      state.status = "saving";
    },
    onSaved: (state) => {
      state.status = "saved";
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
     
    },
    onResetUrl: (state) => {
      state.status = "new-url";
      state.currentAudio = {
        ...state.currentAudio,
        url: null,
        isPlaying: false,
      };
    },
  },
});

export const {
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
