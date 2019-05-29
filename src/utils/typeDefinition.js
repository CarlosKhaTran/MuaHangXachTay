// @flow
type StyleObj = { [key: string]: any };
export type Style = StyleObj | Array<StyleObj>;
export type Product = {
  id: string,
  name: string,
  image_url: any,
  description: string,
  price: number,
  star: number
};
