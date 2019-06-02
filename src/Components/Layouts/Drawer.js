// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Linking,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { NavigationScreenProp } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import { Container, Icon } from 'Components/Widgets';
import { colors, measures, defaultStyles } from 'assets';
import SCREENS from 'routers/screens';
import { checkLogin } from 'utils/common';
import { actions } from 'state';
import { Notify, Alert } from 'Components/Global';

const PHONE_NUMBER = '0793964277';
type Props = {
  navigation: NavigationScreenProp<{}>,
  isLogIn: boolean,
  fullname: string,
  username: string,
  logOut: (cb: (isSuccess: boolean) => void) => void
};

type State = {};

const rows: Array<{
  title: string,
  iconType?: string,
  iconName: string,
  screen: string
}> = [
  {
    title: 'Trang chủ',
    iconName: 'ios-home',
    screen: SCREENS.SHOP_MENU
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
    title: 'Điều khoản sử dụng',
    iconName: 'ios-settings',
    screen: SCREENS.SETTING
  },
  {
    title: 'Liên hệ',
    iconName: 'ios-mail',
    screen: SCREENS.CONTACT
  }
];

const rowColors: Array<string> = ['#fcd670', '#f9bf3b', '#f5ab35', '#f39c12', '#e67e22', '#f27935'];

export class Drawer extends React.PureComponent<Props, State> {
  navigate = (screenName: string) => {
    const { navigation } = this.props;
    if (screenName === SCREENS.SHOP_MENU) {
      navigation.closeDrawer();
      return;
    }
    if (screenName === SCREENS.NOTIFICATION) {
      this.onOpenNotification();
      return;
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

  onPressCall = () => {
    let phoneNumber;
    if (Platform.OS !== 'android') {
      phoneNumber = `tel://${PHONE_NUMBER}`;
    } else {
      phoneNumber = `tel:${PHONE_NUMBER}`;
    }
    Linking.openURL(phoneNumber);
  };

  callBack = (isSuccess: boolean) => {
    const { navigation } = this.props;
    if (isSuccess) {
      Notify.show('info', 'Tạm biệt', 'Bạn đã đăng xuất khỏi cửa hàng!');
      navigation.closeDrawer();
      return;
    }
    Alert.show('Opps!', 'Có vấn đề xảy ra. không thể đăng xuất');
  };

  signOut = () => {
    const { logOut } = this.props;
    logOut(this.callBack);
  };

  renderAvarta = () => {
    const { isLogIn, fullname, username } = this.props;
    if (isLogIn) {
      const firstLetter = (fullname || username)[0].toUpperCase();
      return (
        <View style={[styles.avartaContainer, { justifyContent: 'center' }]}>
          <Text style={styles.firstLetter}>{firstLetter}</Text>
        </View>
      );
    }
    return (
      <View style={styles.avartaContainer}>
        <Image source={require('assets/images/ic_launcher.png')} style={[styles.logo]} />
      </View>
    );
  };

  render() {
    const { isLogIn, fullname, username } = this.props;
    return (
      <Container>
        <ImageBackground
          imageStyle={styles.airport}
          style={[styles.header, DeviceInfo.hasNotch() && { height: measures.defaultUnit * 18 }]}
          resizeMode="stretch"
          source={require('assets/images/header.png')}
        >
          {this.renderAvarta()}
          <View style={styles.headerContent}>
            <Text style={styles.title}>HTH: MUA HÀNG XÁCH TAY</Text>
            <Text style={styles.intro}>
              {isLogIn ? `Xin chào: ${fullname || username}` : 'Đăng nhập ngay!'}
            </Text>
            {isLogIn && (
              <TouchableOpacity
                style={styles.editButtonProfile}
                onPress={() => this.navigate(SCREENS.PROFILE)}
              >
                <Icon
                  name="fountain-pen-tip"
                  type="mdc"
                  color={colors.sharl}
                  size={measures.defaultUnit * 2}
                />
                <Text style={styles.editProfile}>Chỉnh sửa hồ sơ</Text>
              </TouchableOpacity>
            )}
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
        <ActionButton shadowStyle={styles.shadowStyle} buttonColor={colors.primaryColor}>
          <ActionButton.Item
            buttonColor={isLogIn ? colors.white : colors.blue}
            hideLabelShadow
            shadowStyle={styles.shadowStyle}
            title={isLogIn ? 'Đăng xuất' : 'Đăng nhập'}
            onPress={isLogIn ? this.signOut : () => this.navigate(SCREENS.LOG_IN)}
          >
            <Icon
              name="md-log-in"
              style={styles.actionButtonIcon}
              color={isLogIn ? colors.primaryColor : colors.white}
            />
          </ActionButton.Item>
          <ActionButton.Item
            shadowStyle={styles.shadowStyle}
            hideLabelShadow
            buttonColor={colors.tree}
            title="Liên hệ trực tiếp"
            onPress={this.onPressCall}
          >
            <Icon name="md-call" style={styles.actionButtonIcon} color={colors.white} />
          </ActionButton.Item>
        </ActionButton>
      </Container>
    );
  }
}

const mapStateToProps = ({ userState }) => {
  const {
    token, createdAt, username, fullname
  } = userState;
  const isLogIn = checkLogin(token, createdAt);
  return {
    isLogIn,
    username: username || '',
    fullname: fullname || ''
  };
};

const mapDispatchToProps = dispatch => ({
  logOut: (cb: (isSuccess: boolean) => void) => dispatch(actions.logOut(cb))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);

const styles = StyleSheet.create({
  shadowStyle: {
    shadowOpacity: 0
  },
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
    backgroundColor: colors.spray,
    borderRadius: measures.defaultUnit * 4.5,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  headerContent: {
    flex: 1,
    marginLeft: measures.marginSmall,
    marginTop: measures.marginMedium
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
  },
  firstLetter: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeHuge,
    fontWeight: '600',
    color: colors.white
  },
  editButtonProfile: {
    marginTop: measures.marginSmall,
    height: measures.defaultUnit * 3,
    backgroundColor: colors.smoke,
    marginRight: measures.defaultUnit * 6,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: measures.defaultUnit * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  editProfile: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeSmall,
    color: colors.sharl
  }
});
