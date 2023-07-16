import { StaticImageData } from "next/image";
export type Food_Item = {
  Title: string;
  Price: number;
  Image: StaticImageData | null;
};

export type ItemsData = {
  Index: number;
  Name: string;
  Quantity: number;
  Price: number;
};

