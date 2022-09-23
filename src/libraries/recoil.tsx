import { useEffect } from "react";
import { atom, selector, useRecoilState } from "recoil";
import { PhotosList } from "../components/photosList";
import { fetchPhotos } from "../services/photos";
import { IPhoto } from "../typings/photo";

interface IPhotosState {
  photos: IPhoto[];
}

const photosState = atom({
  key: "PhotosState",
  default: [] as IPhoto[],
});

//TODO: Maybe add filters

export function RecoilDemo() {
  const [photos, setPhotos] = useRecoilState(photosState);

  const increaseVotes = (photoId: number) =>
    setPhotos((photos) => {
      const updatedPhotos = photos.map((photo) => {
        if (photo.id === photoId) return { ...photo, votes: photo.votes + 1 };

        return photo;
      });

      return updatedPhotos;
    });

  const fetch = async () => {
    const fetchedPhotos = await fetchPhotos();
    console.log("Photos: ", fetchedPhotos);
    if (fetchedPhotos) setPhotos(fetchedPhotos);
  };

  useEffect(() => {
    fetch();
  }, []);

  return <PhotosList photos={photos} onVote={increaseVotes} />;
}
