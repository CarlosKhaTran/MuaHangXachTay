// @flow
import DeviceInfo from 'react-native-device-info';
import { Linking } from 'react-native';
import qs from 'querystring';

export function checkLogin(token: string, createdAt: string) {
  return (
    token !== null
    && token !== undefined
    && token.length > 0
    && Date.now() - new Date(createdAt).getTime() < 2400 * 3600 * 1000
  );
}

export function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePhone(phonenUmber: string) {
  const re = /(09|07|08[2|6|8|9])+([0-9]{8})\b/;
  return re.test(phonenUmber);
}

export const hasNotch: boolean = DeviceInfo.hasNotch();

export async function sendEmail(to: string, subject: string, body: string, options: Object = {}) {
  const { cc, bcc } = options;

  let url = `mailto:${to}`;

  // Create email link query
  const query = qs.stringify({
    subject,
    body,
    cc,
    bcc
  });

  if (query.length) {
    url += `?${query}`;
  }

  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error('Provided URL can not be handled');
  }

  return Linking.openURL(url);
}
