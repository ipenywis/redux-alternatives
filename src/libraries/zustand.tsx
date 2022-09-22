import { useEffect } from "react";
import { PhotosList } from "../components/photosList";
import create from "zustand";
import { fetchPhotos } from "../services/photos";
import { IPhoto } from "../typings/photo";

// const photos = [
//   "https://images.unsplash.com/photo-1570802592508-dffb2536a538?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3024&q=80",
//   "https://images.unsplash.com/photo-1647421620439-7f5e729c4672?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
//   "https://images.unsplash.com/photo-1663112882927-1f51700a1861?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
//   "https://images.unsplash.com/photo-1576580349568-d510cd92186a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
//   "https://images.unsplash.com/photo-1650204871001-205a952bda1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
//   "https://images.unsplash.com/photo-1661264996659-dcdcbad42630?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
//   "https://images.unsplash.com/photo-1663583513676-9f6361cd859d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
// ];

//Store State interface
interface IPhotosState {
  photos: IPhoto[];
  setPhotos: (photos: IPhoto[]) => void;
  increaseVotes: (photoId: number) => void;
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
}));

export function ZustandDemo() {
  const { photos, setPhotos, increaseVotes } = usePhotosStore((state) => state);

  const fetch = async () => {
    const fetchedPhotos = await fetchPhotos();
    if (fetchedPhotos) setPhotos(fetchedPhotos);
  };

  useEffect(() => {
    fetch();
  }, []);

  return <PhotosList photos={photos} onVote={increaseVotes} />;
}
