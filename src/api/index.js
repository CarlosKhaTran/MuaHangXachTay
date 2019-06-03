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
  note
}: {
  image: Object,
  name: string,
  address: string,
  product: string,
  number: string,
  date: string,
  cost: string,
  phone: string,
  note: string
}) => {
  try {
    const url = urls.sendEmailUrl();
    const data: any = new FormData();
    if (image && image.type) {
      data.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.uri
      });
    }
    data.append('receiver', 'testmuahangxachtay@gmail.com');
    data.append(
      'content',
      JSON.stringify({
        name,
        address,
        product,
        number,
        date,
        cost,
        phone,
        note
      })
    );
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fireNoti = async ({
  image,
  product,
  number,
  link
}: {
  image: ?Object,
  product: string,
  number: string,
  link: string
}) => {
  try {
    const url = urls.fireNoti();
    const data: any = new FormData();
    if (image) {
      data.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.uri
      });
    }
    data.append(
      'content',
      JSON.stringify({
        product,
        number,
        link
      })
    );
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.log('sss', error);
    throw error;
  }
};

export async function subscribeToTopic(token: string) {
  try {
    const url = urls.subscribeToTopic();
    const response = await axios.post(url, {
      token
    });
    return response.data;
  } catch (error) {
    return undefined;
  }
}

export async function getAllNoti(): Promise<any> {
  try {
    const url = urls.getAllNoti();
    const response = await axios.get(url);
    const { data } = response.data;
    return data;
  } catch (error) {
    return [];
  }
}

export async function registerUser(username: string, password: string) {
  try {
    const url = urls.registerUser();
    const response = await axios.post(url, {
      user: {
        username,
        password
      }
    });
    return response.data.user;
  } catch (error) {
    throw error;
  }
}

export async function logOut() {
  try {
    const url = urls.logOut();
    const response = await axios.post(url);
    return response.data.user;
  } catch (error) {
    throw error;
  }
}

export async function getUserProfile() {
  try {
    const url = urls.getUserProfile();
    const response = await axios.get(url);
    return response.data.user_profile;
  } catch (error) {
    throw error;
  }
}

export async function updateUserProfile(
  fullname: string,
  address: string,
  email: string,
  phoneNumber: string
) {
  try {
    const url = urls.updateUserProfile();
    const res = await axios.put(url, {
      user_profile: {
        fullname,
        address,
        email,
        phone_number: phoneNumber
      }
    });
    return res.data.user_profile;
  } catch (error) {
    throw error;
  }
}

export async function login(username: string, password: string) {
  try {
    const url = urls.login();
    const response = await axios.post(url, {
      user: {
        username,
        password
      }
    });
    return response.data.user;
  } catch (error) {
    throw error;
  }
}

export async function getAllProduct(): Promise<any> {
  try {
    const url = urls.getAllProduct();
    const response = await axios.get(url);
    const { data } = response.data;
    return data.products;
  } catch (error) {
    throw error;
  }
}
