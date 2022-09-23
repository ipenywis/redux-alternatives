import { createModel, init, Models } from "@rematch/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PhotosList } from "../../components/photosList";
import { fetchPhotos } from "../../services/photos";
import { IPhoto } from "../../typings/photo";
import { IRootModel } from "./models";

export const photos = createModel<IRootModel>()({
  state: [] as IPhoto[],
  reducers: {
    setPhotos(state, payload: IPhoto[]) {
      return payload;
    },
    incrementVotes: (state, payload: number) => {
      const photos = state;

      const updatedPhotos = photos.map((photo) => {
        if (photo.id === payload)
          ///< payload = photoId
          return { ...photo, votes: photo.votes + 1 };

        return photo;
      });

      return updatedPhotos;
    },
  },
  effects: (dispatch) => ({
    async fetchPhotos(payload: number, state) {
      const photos = await fetchPhotos();
      dispatch.photos.setPhotos(photos || []);
    },
  }),
});

//Component
export function RematchDemo() {
  const photos = useSelector((state: IRootModel) => state.photos);
  const dispatch = useDispatch();

  console.log("Photos: ", photos);

  useEffect(() => {
    dispatch.photos.fetchPhotos();
  }, []);

  return (
    <PhotosList
      photos={photos as any}
      onVote={dispatch.photos.incrementVotes}
    />
  );
}
