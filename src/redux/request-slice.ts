import { Album } from "@/types/album";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    name: "João Vitor",
    perfil: "https://avatars.githubusercontent.com/u/87434656?s=96&v=4",
  },
  params: {} as Params,
  token: "",
  isLoggedIn: false,
  tracks: [{}],
  playing: {
    name: "Nada tocando",
    artists: "",
    artistName: "",
    images: "",
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
    handleLogin: (state) => {
      // window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES}&response_type=token&show_dialog=true`;
      // state.tracks.push({ name: "Ow boy" });
    },
    increment: (state) => {
      state.tracks.push();
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
    },
    fetchBackground: (state, action: { type: string; payload: string }) => {
      state.backgroundPlayer = action.payload;
    },
  },
});
export const {
  handleLogin,
  getAuthParams,
  fetchPlaybackStatus,
  fetchBackground,
} = stock.actions;
export default stock.reducer;
