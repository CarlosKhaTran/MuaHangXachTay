// @flow
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Linking, Platform
} from 'react-native';
import LottieView from 'lottie-react-native';
import { NavigationScreenProp } from 'react-navigation';
import email from 'react-native-email';
import {
  Container, Header, Button, Content
} from 'Components/Widgets';
import { defaultStyles, measures, colors } from 'assets';
import { SCREENS } from 'routers';

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {};

const PHONE = '+84792964277';

export default class Contact extends Component<Props, State> {
  onBack = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.SHOP_MENU,
      key: SCREENS.SHOP_MENU
    });
  };

  pressCall = () => {
    let phoneNumber;
    if (Platform.OS !== 'android') {
      phoneNumber = `tel://${PHONE}`;
    } else {
      phoneNumber = `tel:${PHONE}`;
    }
    Linking.openURL(phoneNumber);
  };

  onPressEmail = () => {
    const to = ['muahangxachtay@gmail.com'];
    email(to, {
      cc: [],
      subject: 'Liên hệ mua hàng'
    });
  };

  lottie: any;

  render() {
    return (
      <Container>
        <Header title="LIÊN HỆ" handleLeftButton={this.onBack} />
        <Content fill style={styles.content}>
          <Text style={styles.appName}>HTH: MUA HÀNG XÁCH TAY</Text>
          <Text style={styles.info}>☎ Số điện thoại: 0793964277</Text>
          <Text style={styles.info}>✉ Email: muahangxachtay@gmail.com</Text>
          <LottieView
            ref={(lottie) => {
              this.lottie = lottie;
            }}
            source={require('assets/images/travel.json')}
            loop
            autoPlay
            style={{ transform: [{ scale: 0.8 }] }}
          />
          <View style={styles.buttonContainer}>
            <View style={defaultStyles.fill}>
              <Button
                iconName="ios-mail"
                block
                title="EMAIL"
                type="secondary"
                onPress={this.onPressEmail}
              />
            </View>
            <View style={defaultStyles.fill}>
              <Button
                block
                iconName="ios-call"
                title="CALL"
                type="primary"
                onPress={this.pressCall}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    borderRadius: measures.borderRadius,
    marginTop: -measures.marginLong,
    zIndex: 99999
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  appName: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeLarge,
    color: colors.sharl,
    fontWeight: '500',
    margin: measures.marginMedium
  },
  info: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeMedium,
    fontWeight: '400',
    color: colors.gray,
    marginLeft: measures.marginMedium
  }
});
