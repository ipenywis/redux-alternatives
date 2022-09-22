import { IPhoto } from "../typings/photo";
import { Photo } from "./photo";

interface IPhotosListProps {
  photos: IPhoto[];
  onVote: (photoId: number) => void;
}

export function PhotosList(props: IPhotosListProps) {
  const { photos, onVote } = props;

  return (
    <div className="flex space-x-8 w-full justify-center flex-wrap">
      {photos.map((photo, idx) => (
        <Photo key={idx} photo={photo} onVote={onVote} />
      ))}
    </div>
  );
}
