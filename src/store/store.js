import { configureStore } from "@reduxjs/toolkit";
import { playerSlice } from "./player/playerSlice";
import { playlistSlice } from "./playlist/playlistSlice";

export const store = configureStore({
  reducer: { player: playerSlice.reducer, playlist: playlistSlice.reducer },
});
