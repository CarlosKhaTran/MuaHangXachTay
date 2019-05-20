// @flow
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  ImageBackground,
  Easing
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { NavigationScreenProp } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import { Container, Icon } from 'Components/Widgets';
import { colors, measures, defaultStyles } from 'assets';
import SCREENS from 'routers/screens';

type Props = {
  navigation: NavigationScreenProp<{}>
};

type State = {
  rotateAnim: Animated.Value
};

const rows: Array<{
  title: string,
  iconType?: string,
  iconName: string,
  screen: string
}> = [
  {
    title: 'Trang chủ',
    iconName: 'ios-home',
    screen: SCREENS.ADMIN
  },
  {
    title: 'Thông báo',
    iconName: 'bell',
    iconType: 'ent',
    screen: SCREENS.NOTIFICATION
  },
  {
    title: 'Hỗ trợ',
    iconName: 'ios-help-buoy',
    screen: SCREENS.SUPPORT
  },
  {
    title: 'Cài đặt',
    iconName: 'ios-settings',
    screen: SCREENS.SETTING
  },
  {
    title: 'Liên hệ',
    iconName: 'ios-mail',
    screen: SCREENS.CONTACT
  }
];

const rowColors: Array<string> = ['#52AACD', '#2B8BC5', '#2066B0', '#19579E', '#12448E', '#008153'];

export default class Drawer extends React.PureComponent<Props, State> {
  state = {
    rotateAnim: new Animated.Value(0)
  };

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation = () => {
    this.state.rotateAnim.setValue(0);
    Animated.timing(this.state.rotateAnim, {
      toValue: 1,
      duration: 6000,
      easing: Easing.linear
    }).start(() => {
      this.startAnimation();
    });
  };

  navigate = (screenName: string) => {
    const { navigation } = this.props;
    if (screenName === SCREENS.NOTIFICATION) {
      this.onOpenNotification();
    }
    navigation.navigate({
      routeName: screenName,
      key: screenName
    });
  };

  onOpenNotification = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.NOTIFICATION,
      key: SCREENS.NOTIFICATION,
      params: {
        notifications: []
      }
    });
  };

  getColor = (index: number) => rowColors[index];

  render() {
    return (
      <Container>
        <ImageBackground
          imageStyle={styles.airport}
          style={[styles.header, DeviceInfo.hasNotch() && { height: measures.defaultUnit * 18 }]}
          resizeMode="stretch"
          source={require('../../assets/images/header.png')}
        >
          <View style={styles.avartaContainer}>
            <Animated.Image
              source={require('../../assets/images/ic_launcher.png')}
              style={[
                styles.logo,
                {
                  transform: [
                    {
                      rotate: this.state.rotateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg']
                      })
                    }
                  ]
                }
              ]}
            />
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.title}>HTH: MUA HÀNG XÁCH TAY</Text>
            <Text style={styles.intro}>Đăng nhập ngay!</Text>
          </View>
        </ImageBackground>
        <ScrollView>
          {rows.map((item, index) => (
            <TouchableOpacity
              style={styles.row}
              key={index.toString()}
              onPress={() => this.navigate(item.screen)}
            >
              <View style={styles.left}>
                <Icon
                  name={item.iconName}
                  type={item.iconType}
                  color={this.getColor(index)}
                  size={measures.iconSizeMedium}
                />
              </View>
              <View style={defaultStyles.fill}>
                <Text style={styles.rowTitle}>{item.title}</Text>
              </View>
              <View style={styles.right}>
                <Icon
                  name="caretright"
                  type="ant"
                  color={this.getColor(index)}
                  size={measures.defaultUnit * 2}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ActionButton buttonColor={colors.primaryColor}>
          <ActionButton.Item buttonColor={colors.white} title="Đăng nhập">
            <Icon name="md-log-in" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={colors.green}
            title="Liên hệ trực tiếp"
            onPress={() => {}}
          >
            <Icon name="md-call" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: measures.paddingLong,
    backgroundColor: colors.gray
  },
  avarta: {
    marginLeft: measures.marginMedium,
    marginTop: measures.marginMedium
  },
  avartaContainer: {
    height: measures.defaultUnit * 9,
    width: measures.defaultUnit * 9,
    marginLeft: measures.marginMedium,
    borderRadius: measures.defaultUnit * 4.5,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  headerContent: {
    flex: 1,
    marginLeft: measures.marginSmall,
    paddingTop: measures.paddingLong
  },
  title: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeMedium - 1,
    fontWeight: 'bold'
  },
  intro: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeMedium - 2,
    marginTop: measures.marginSmall,
    fontWeight: 'bold',
    color: colors.white
  },
  row: {
    paddingHorizontal: measures.paddingSmall,
    borderTopWidth: 1,
    borderColor: colors.seperator,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: measures.paddingSmall
  },
  left: {
    width: measures.defaultUnit * 6,
    justifyContent: 'center',
    paddingLeft: measures.paddingSmall
  },
  rowTitle: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeSmall + 1,
    fontWeight: '400'
  },
  right: {
    width: measures.defaultUnit * 6,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: measures.paddingSmall
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },
  airport: {
    opacity: 0.6
  }
});
