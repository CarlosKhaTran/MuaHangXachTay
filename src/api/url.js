// @flow
import { HOST, HOST_1 } from './config';

export const sendEmailUrl = () => `${HOST}/email/send`;
export const fireNoti = () => `${HOST}/notification`;
export const subscribeToTopic = () => `${HOST}/notification/subscribeToTopic`;
export const getAllNoti = () => `${HOST}/notification?limit=99999999`;
export const login = () => `${HOST_1}/user/login`;

export const registerUser = () => `${HOST_1}/user/register`;
export const loginUser = () => `${HOST_1}/user/login`;
export const getAllProduct = () => `${HOST_1}/product`;
export const logOut = () => `${HOST_1}/user/logout`;
