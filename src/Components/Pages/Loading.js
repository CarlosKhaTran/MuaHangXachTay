// @flow
import type { Notification, NotificationOpen } from 'react-native-firebase';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { NavigationScreenProp } from 'react-navigation';
import LottieView from 'lottie-react-native';
import { Container } from 'Components/Widgets';
import { measures, colors } from 'assets';
import { SCREENS } from 'routers';
import { actions } from 'state';
import { subscribeToTopic } from 'api';

type Props = {
  navigation: NavigationScreenProp<{}>,
  initApp: (cb: (haveNewNoti: boolean) => Promise<any>) => void
  // isReady: boolean,
};
type State = {};

export class LoadingPage extends Component<Props, State> {
  state = {};

  componentDidMount() {
    this.requestFirebase();
    this.onLoadDone();
  }

  componentWillUnmount() {
    this.lottie.reset();
  }

  requestFirebase = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions\
      const token = await firebase.messaging().getToken();
      subscribeToTopic(token);
      this.configFirebase();
    } else {
      try {
        await firebase.messaging().requestPermission();
        const token = await firebase.messaging().getToken();
        subscribeToTopic(token);
        firebase.messaging().subscribeToTopic('notification');
        this.configFirebase();
      } catch (error) {
        // User has rejected permissions
      }
    }
  };

  configFirebase = () => {
    const channel = new firebase.notifications.Android.Channel(
      'channelId',
      'Channel Name',
      firebase.notifications.Android.Importance.Max
    ).setDescription('A natural description of the channel');
    firebase.notifications().android.createChannel(channel);
    firebase.notifications().onNotification((notification: Notification) => {
      if (Platform.OS === 'ios') {
        const localNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .ios.setBadge(notification.ios.badge);
        firebase.notifications().displayNotification(localNotification);
      } else {
        const localNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .android.setChannelId('channelId') // e.g. the id you chose above
          .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
          .android.setAutoCancel(true)
          .android.setPriority(firebase.notifications.Android.Priority.High);
        firebase.notifications().displayNotification(localNotification);
      }
    });
    firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      const { navigation } = this.props;
      const { _data } = notificationOpen.notification;
      const {
        product, number, url, link
      } = _data;
      navigation.navigate({
        routeName: SCREENS.PRODUCT,
        key: SCREENS.PRODUCT,
        params: {
          product,
          number,
          url,
          link
        }
      });
    });
  };

  decideWhereToGo = async (haveNewNoti: boolean) => {
    const { navigation } = this.props;
    let routeName;
    const notFirstTime = await AsyncStorage.getItem('notFirstTime');
    if (!notFirstTime) {
      routeName = SCREENS.INTRO;
    } else {
      routeName = haveNewNoti ? SCREENS.NOTIFICATION : SCREENS.SHOP_MENU;
    }
    navigation.navigate({
      routeName,
      key: routeName
    });
    AsyncStorage.setItem('notFirstTime', 'true');
  };

  onLoadDone = async () => {
    const { initApp } = this.props;
    initApp(this.decideWhereToGo);
  };

  navigate = (screenName: string) => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: screenName,
      key: screenName
    });
  };

  lottie: any;

  render() {
    return (
      <Container showBackground={false} style={styles.container}>
        <View style={{ height: '100%', width: '100%' }}>
          <LottieView
            ref={(lottie) => {
              this.lottie = lottie;
            }}
            source={require('../../assets/images/shoppingCart.json')}
            loop
            autoPlay
            style={{ transform: [{ scale: 0.8 }] }}
          />
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  initApp: (cb: (haveNewNoti: boolean) => any) => dispatch(actions.initApp(cb))
});

export default connect(
  null,
  mapDispatchToProps
)(LoadingPage);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: colors.lightPrimaryColor
  },
  animatedView: {
    height: 100,
    width: 100
  },
  image: {
    width: '100%',
    height: '100%'
  },
  welcome: {
    fontSize: measures.fontSizeLarge,
    marginBottom: 10 * measures.marginLong,
    fontWeight: '500',
    alignSelf: 'center'
  }
});
