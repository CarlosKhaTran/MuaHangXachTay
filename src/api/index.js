// @flow
import axios from 'axios';
import { TIMEOUT } from './config';
import * as urls from './url';

axios.defaults.timeout = TIMEOUT;

export const sendEmail = async ({
  image,
  name,
  address,
  product,
  number,
  date,
  cost,
  phone,
  note,
}: {
  image: Object,
  name: string,
  address: string,
  product: string,
  number: string,
  date: string,
  cost: string,
  phone: string,
  note: string,
}) => {
  try {
    const url = urls.sendEmailUrl();
    const data: any = new FormData();
    if (image) {
      data.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.uri,
      });
    }
    data.append('receiver', 'testmuahangxachtay@gmail.com');
    data.append('content', JSON.stringify({
      name,
      address,
      product,
      number,
      date,
      cost,
      phone,
      note,
    }));
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw (error);
  }
};

export const fireNoti = async ({
  image,
  product,
  number,
  link,
}: {
  image: Object,
  product: string,
  number: string,
  link: string,
}) => {
  try {
    const url = urls.fireNoti();
    const data: any = new FormData();
    if (image) {
      data.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.uri,
      });
    }
    data.append('content', JSON.stringify({
      product,
      number,
      link,
    }));
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw (error);
  }
};

export async function subscribeToTopic(token: string) {
  try {
    const url = urls.subscribeToTopic();
    const response = await axios.post(url, {
      token,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}