import { atom, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { PhotosList } from "../components/photosList";
import { fetchPhotos } from "../services/photos";
import { IPhoto } from "../typings/photo";

const photosAtom = atom<IPhoto[]>([]);
const photosVotesAtom = atom(
  (get) => get(photosAtom),
  (get, set, photoId: number) => {
    const photos = get(photosAtom);

    const updatedPhotos = photos.map((photo) => {
      if (photo.id === photoId) return { ...photo, votes: photo.votes + 1 };

      return photo;
    });

    set(photosAtom, updatedPhotos);
  }
);
const fetchPhotosAtom = atom(
  (get) => get(photosAtom),
  async (get, set) => {
    const fetchedPhotos = await fetchPhotos();
    set(photosAtom, fetchedPhotos || []);
  }
);

export function JotaiDemo() {
  const [photos, setPhotos] = useAtom(photosAtom);
  const increaseVotes = useSetAtom(photosVotesAtom);
  const fetchPhotos = useSetAtom(fetchPhotosAtom);

  useEffect(() => {
    fetchPhotos();
  }, []);

  return <PhotosList photos={photos} onVote={increaseVotes} />;
}
