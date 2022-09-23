// @filename: models.ts
import { Models } from "@rematch/core";
import { photos } from "./rematch";

export interface IRootModel extends Models<IRootModel> {
  photos: typeof photos;
}

export const models: IRootModel = { photos };
