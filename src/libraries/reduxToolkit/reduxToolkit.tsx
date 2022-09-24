import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { PhotosList } from "../../components/photosList";
import { fetchPhotos } from "../../services/photos";
import { IPhoto } from "../../typings/photo";
import { AppDispatch, RootState } from "./store";

interface IPhotosState {
  photos: IPhoto[];
}

const initialState: IPhotosState = {
  photos: [],
};

export const fetchAllPhotos = createAsyncThunk("photos/all", async () => {
  const photos = await fetchPhotos();
  return photos || [];
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("/fakeApi/posts");
  return response.data;
});

export const photosSlice = createSlice({
  name: "PhotosSlice",
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<IPhoto[]>) => {
      state.photos = action.payload;
    },
    incrementVotes: (state, action: PayloadAction<number>) => {
      const photos = state.photos;

      const updatedPhotos = photos.map((photo) => {
        if (photo.id === action.payload)
          return { ...photo, votes: photo.votes + 1 };

        return photo;
      });

      state.photos = updatedPhotos;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllPhotos.fulfilled,
      (state, action: PayloadAction<IPhoto[]>) => {
        state.photos = action.payload;
      }
    );
  },
});

const incrementVotes = photosSlice.actions.incrementVotes;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function ReduxToolkitDemo() {
  const photos = useAppSelector((state) => state.photos.photos);
  const dispatch = useDispatch();

  const onVote = (photoId: number) => {
    dispatch(incrementVotes(photoId));
  };

  useEffect(() => {
    dispatch(fetchAllPhotos() as any);
  }, []);

  return <PhotosList photos={photos} onVote={onVote} />;
}
