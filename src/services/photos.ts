import axios from "axios";
import { IPhoto } from "../typings/photo";

export async function fetchPhotos(): Promise<IPhoto[] | null> {
  try {
    const response = await axios.get("http://localhost:8000/photos");
    return response.data;
  } catch (err) {
    console.log("Error fetching photos: ", err);
    return null;
  }
}
