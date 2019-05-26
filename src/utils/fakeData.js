// @flow

export type Product = {
  id: string,
  name: string,
  image_url: any,
  description: string,
  price: number,
  star: number
};

export const menuData: Array<Product> = [
  {
    name: 'Iphone X',
    description: 'Iphone X 256GB chính hãng Apple - 2017',
    price: 25000000,
    star: 4,
    image: require('assets/images/products/iphoneX.png')
  },
  {
    name: 'Ipad',
    description: 'Ipad pro 256GB - wifi chính hãng Apple 2018',
    price: 30000000,
    star: 5,
    image: require('assets/images/products/ipad.png')
  },
  {
    name: 'Macbook pro',
    description: 'Macbook pro ram 16Gb, 256Gb (2016) - chính hãng Apple 2018',
    price: 60000000,
    star: 4,
    image: require('assets/images/products/macbook.jpg')
  },
  {
    name: 'Iphone Xs',
    description: 'Iphone Xs 256GB chính hãng Apple - 2017',
    price: 30000000,
    star: 3,
    image: require('assets/images/products/iphoneXs.png')
  },
  {
    name: 'Nước thần kì Izumio',
    description:
      'ước Thần Kỳ IZUMIO Nhật Bản - Nước giàu hydro khánh viêm, chống dị ứng, thúc đẩy chuyển hoá năng lượng',
    price: 4000000,
    star: 2,
    image: require('assets/images/products/izumio.jpg')
  },
  {
    name: 'Điện thoại nắp gập LG',
    description: 'Điện thoại nắp gập LG nhỏ gọn, tiện dụng',
    price: 4000000,
    star: 4,
    image: require('assets/images/products/lgPhone.jpg')
  },
  {
    name: 'Tinh dầu thơm xe hơi',
    description: 'Tinh dầu thơm xe hơi khiến chiếc oto sang trọng, đẳng cấp và quyến rũ',
    price: 4000000,
    star: 4,
    image: require('assets/images/products/lucky.jpg')
  }
];
