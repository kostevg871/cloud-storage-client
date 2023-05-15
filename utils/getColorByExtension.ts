const extColor: { [key: string]: any } = {
  pdf: "purple",
  xls: "green",
  doc: "blue",
  docx: "blue",
  txt: "blue",
  png: "orange",
  jpg: "orange",
  jpeg: "orange",
  zip: "red",
} as const;

export type Extention = keyof typeof extColor;
export type Color = (typeof extColor)[Extention];

export const getColorByExtension = (ext: string): Color => {
  return extColor[ext];
};
