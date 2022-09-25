import { IPhoto } from "../typings/photo";

interface IPhotoProps {
  photo: IPhoto;
  onVote: (photoId: number) => void;
}

export function Photo(props: IPhotoProps) {
  const { photo, onVote } = props;
  const { id, url, votes } = photo;

  return (
    <div
      className="flex flex-col cursor-pointer text-white transition-all 
      duration-500 hover:brightness-75 mb-8 hover:scale-105"
      onClick={onVote.bind(null, id)}
    >
      <img src={url} className="w-auto h-96 rounded-xl" />
      <div className="font-bold text-white text-lg mt-3">Votes: {votes}</div>
    </div>
  );
}
