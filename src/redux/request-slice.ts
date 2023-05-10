import { Album } from "@/types/album";
import { createSlice } from "@reduxjs/toolkit";
import SpotifyWebApi from "spotify-web-api-js";

const initialState = {
  user: { name: "João Vitor S" },
  params: {} as Params,
  token: "",
  isLoggedIn: false,
  tracks: [{}],
};

export type Params = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

const CLIENT_ID = "dc1a822c2a73439c9fbb2ea8f8b7e424";
const CLIENT_SECRET = "683776ce5cd9473f9ead3d3af11dfb90";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000";
const SPACE_DELIMITER = "%20";
const SCOPES = "user-read-playback-state";

const stock = createSlice({
  name: "requests",
  initialState,
  reducers: {
    handleLogin: (state) => {
      // window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES}&response_type=token&show_dialog=true`;
      // state.tracks.push({ name: "Ow boy" });
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
      // state.token = paramsSplitUp.access_token;
      if (state.params.access_token) {
        state.isLoggedIn = true;
        state.token = state.params.access_token;
      }
    },

    fetchPlaybackStatus: (state) => {
      fetch("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: `Bearer ${state.params.access_token}`,
        },
      })
        .then((response) => {
          response.json();
        })
        .then((data: any) => {
          console.log(data);
          // const dataResponse = data.item.album;
          // const { images, name, genres, artists } = dataResponse;
          // const newAlbum: Album = {
          //   name: name,
          //   artists: artists,
          //   images: images,
          //   genres: genres,
          // };
          // state.tracks.push(newAlbum);
        });
    },
  },
});
export const { handleLogin, getAuthParams, fetchPlaybackStatus } =
  stock.actions;
export default stock.reducer;
