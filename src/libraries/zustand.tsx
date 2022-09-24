import { useEffect } from "react";
import { PhotosList } from "../components/photosList";
import create from "zustand";
import { fetchPhotos } from "../services/photos";
import { IPhoto } from "../typings/photo";

//Store State interface
interface IPhotosState {
  photos: IPhoto[];
  setPhotos: (photos: IPhoto[]) => void;
  increaseVotes: (photoId: number) => void;
  fetchAllPhotos: () => void;
}

//Zustand Store ✅ 🐻
const usePhotosStore = create<IPhotosState>((set) => ({
  photos: [],
  setPhotos: (photos: IPhoto[]) => set({ photos }),
  votes: 0,
  increaseVotes: (photoId: number) =>
    set((state) => {
      const oldPhotos = state.photos;
      const updatedPhotos = oldPhotos.map((photo) => {
        if (photo.id === photoId) return { ...photo, votes: photo.votes + 1 };

        return photo;
      });

      return { photos: updatedPhotos };
    }),
  fetchAllPhotos: async () => {
    const fetchedPhotos = await fetchPhotos();
    if (fetchedPhotos) set({ photos: fetchedPhotos || [] });
  },
}));

export function ZustandDemo() {
  const { photos, setPhotos, increaseVotes, fetchAllPhotos } = usePhotosStore(
    (state) => state
  );

  useEffect(() => {
    fetchAllPhotos();
  }, []);

  return <PhotosList photos={photos} onVote={increaseVotes} />;
}
