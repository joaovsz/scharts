import {
  CLIENT_ID,
  REDIRECT_URL_AFTER_LOGIN,
  SCOPES,
  SPOTIFY_AUTHORIZE_ENDPOINT,
} from "@/pages/Login/routers";
import { Album } from "@/types/album";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  params: {},
  token: "",
  isLoggedIn: false,
  tracks: [{}],
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
      window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES}&response_type=token&show_dialog=true`;
      state.tracks.push({ name: "Ow boy" });
    },
    increment: (state) => {
      state.tracks.push({ name: "Dizeres" });
    },
    getAuthParams: (state, action: { type: string; payload: string }) => {
      const tokenAfterHash = action.payload.substring(1);
      const paramsInUrl = tokenAfterHash.split("&");
      const paramsSplitUp: Params = paramsInUrl.reduce(
        (accumulator: any, param) => {
          const [key, value] = param.split("=");
          accumulator[key] = value;
          return accumulator;
        },
        {}
      );
      state.params = paramsSplitUp;
    },

    fetchPlaybackStatus: (state, action: { type: string; payload: {} }) => {
      fetch("https://api.spotify.com/v1/me/player", {
        headers: { Authorization: "Bearer" + action },
      })
        .then((response) => {
          response.json();
        })
        .then((data: any) => {
          const dataResponse = data.item.album;
          const { images, name, genres, artists } = dataResponse;
          const newAlbum: Album = {
            name: name,
            artists: artists,
            images: images,
            genres: genres,
          };
          state.tracks.push(newAlbum);
        });
    },
  },
});
export const { handleLogin, getAuthParams } = stock.actions;
export default stock.reducer;
