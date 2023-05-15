import { Extention } from "./getColorByExtension";

export const getExtentionFromFileName = (filename: string) => {
  return filename.split(".").pop() as Extention;
};
