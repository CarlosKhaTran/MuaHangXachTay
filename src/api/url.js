// @flow
import { HOST } from './config';

export const sendEmailUrl = () => `${HOST}/email/send`;
export const fireNoti = () => `${HOST}/notification`;
export const subscribeToTopic = () => `${HOST}/notification/subscribeToTopic`;
export const getAllNoti = () => `${HOST}/notification?limit=99999999`;
