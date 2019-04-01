// @flow

import React, { Component } from 'react';
import {
  AppState, DeviceEventEmitter, Platform, AsyncStorage
} from 'react-native';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import { Notify, Loading } from './Components/Global';
import Initial, { SCREENS } from './routers';
import { subscribeToTopic } from './api';

type Props = {};
type State = {};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    DeviceEventEmitter.addListener('deviceResume', this.onAppResume);
    DeviceEventEmitter.addListener('devicePause', this.onAppPause);
    AppState.addEventListener('change', this.onAppStateChange);
  }

  async componentDidMount() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions\
      const token = await firebase.messaging().getToken();
      subscribeToTopic(token);
      this.configFirebase();
    } else {
      // user doesn't have permission
      try {
        await firebase.messaging().requestPermission();
        const token = await firebase.messaging().getToken();
        subscribeToTopic(token);
        firebase.messaging().subscribeToTopic('notification');
        this.configFirebase();
        // User has authorised
      } catch (error) {
        // User has rejected permissions
      }
    }
  }

  configFirebase = () => {
    const channel = new firebase.notifications.Android.Channel(
      'channelId',
      'Channel Name',
      firebase.notifications.Android.Importance.Max
    ).setDescription('A natural description of the channel');
    firebase.notifications().android.createChannel(channel);
    firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      const { _data } = notificationOpen.notification;
      const {
        product, number, url, link
      } = _data;
      if (this.navigator) {
        this.navigator.dispatch(
          NavigationActions.navigate({
            routeName: SCREENS.PRODUCT,
            key: SCREENS.PRODUCT,
            params: {
              product,
              number,
              url,
              link,
            }
          })
        );
      }
    });
    firebase.notifications().onNotification((notification: Notification) => {
      if (Platform.OS === 'ios') {
        const localNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .ios.setBadge(notification.ios.badge);

        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
      } else {
        const localNotification = new firebase.notifications.Notification({
          sound: 'default',
          show_in_foreground: true,
        })
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .android.setChannelId('channelId') // e.g. the id you chose above
          .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
          .android.setAutoCancel(true)
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
      }
      const {
        product, number, url, link
      } = notification.data;
      AsyncStorage.getItem('notifications').then((rs: any) => {
        const oldNotification = rs || '[]';
        const newNotifications = [
          {
            type: 'NEW_PRODUCT',
            title: 'Sản phẩm mới',
            description: `Tên: ${product} - Giá ${number.toLocaleString()} VND`,
            seen: false,
            data: {
              product, number, url, link
            },
            url,
          },
          ...JSON.parse(oldNotification),
        ];
        AsyncStorage.setItem('notifications', JSON.stringify(newNotifications));
      });
    });
    // this.notificationDisplayedListener = firebase
    //   .messaging
  };

  onAppStateChange = (currentAppState: typeof AppState) => {
    console.log('_onAppStateChange', currentAppState);
  };

  onAppResume = () => {
    console.log('onAppResume');
  };

  onAppPause = () => {
    console.log('onAppPause');
  };

  notificationListener: any;

  notificationDisplayedListener: any;

  navigator: any;

  render() {
    return [
      <Initial
        key="main"
        ref={(navigator) => {
          this.navigator = navigator;
        }}
      />,
      <Notify.Component key="notify" />,
      <Loading.Component key="Loading" />
    ];
  }
}
