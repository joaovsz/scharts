import { User } from "@/types/User";
import { Album } from "@/types/album";

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {} as User,
  params: {} as Params,
  token: "",
  isLoggedIn: false,
  recentPlayed: [] as Album[],
  tracks: [] as Album[],
  playing: {
    name: "Nada tocando",
    artists: "",
    artistName: "",
    image: "",
    artistPhoto: "",
  } as Album,
  backgroundPlayer: "",
};

export type Params = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

const stock = createSlice({
  name: "requests",
  initialState,
  reducers: {
    getUser: (state, action: { type: {}; payload: User }) => {
      state.user = action.payload;
    },

    getAuthParams: (state, action: { type: string; payload: string }) => {
      const token = action.payload ? action.payload.split("=")[1] : "";
      state.token = token;
      if (state.token) {
        state.isLoggedIn = true;
      }
    },

    fetchPlaybackStatus: (state, action: { type: any; payload: Album }) => {
      state.playing = action.payload;
      const someTrack = state.tracks.some(
        (item: Album) => item.name === state.playing.name
      );
      console.log(someTrack, state.playing.name);
      if (!someTrack) {
        state.tracks.push(action.payload);
      }
    },
    fetchRecentPlayed: (state, action: { type: any; payload: Album }) => {
      state.recentPlayed.push(action.payload);
    },
    fetchBackground: (state, action: { type: string; payload: string }) => {
      state.backgroundPlayer = action.payload;
    },
  },
});
export const {
  getAuthParams,
  fetchPlaybackStatus,
  fetchBackground,
  getUser,
  fetchRecentPlayed,
} = stock.actions;
export default stock.reducer;
