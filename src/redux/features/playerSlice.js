import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
  artist: {
    artistDetails: [],
    status: 'loading',
  },
};

export const fetchArtist = createAsyncThunk('artist/fetchArtist', async (id) => {
  const { data } = await axios.get(
    `https://shazam-core.p.rapidapi.com/v2/artists/details?artist_id=${id}`,
    {
      headers: {
        'X-RapidAPI-Key': '7789f587bcmshf673095c888b885p135b99jsn51402eff3b29',
      },
    },
  );
  return data?.data;
});

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
  extraReducers: {
    [fetchArtist.fulfilled.type]: (state, action) => {
      state.artist.artistDetails = action.payload;
      state.artist.status = 'loading';
      state.artist.status = 'success';
    },
    [fetchArtist.pending.type]: (state) => {
      state.artist.status = 'loading';
    },
    [fetchArtist.rejected.type]: (state) => {
      state.artist.status = 'error';
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } =
  playerSlice.actions;

export default playerSlice.reducer;
