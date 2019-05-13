// @flow
import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, ScrollView, Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Icon, Button } from '../Widgets';
import { colors, measures, defaultStyles } from '../../assets';
import SCREENS from '../../routers/screens';

type Props = {};

const rows: Array<{
  title: string,
  iconType?: string,
  iconName: string,
  screen: string,
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
      title: 'Điều khoản dịch vụ',
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

export default class Drawer extends React.PureComponent<Props> {

  navigate = (screenName: string) => {
    const { navigation } = this.props;
    if (screenName ==  SCREENS.NOTIFICATION) {
      this.onOpenNotification()
    }
    navigation.navigate({
      routeName: screenName,
      key: screenName,
    });
  };

  onOpenNotification = () => {
    const { navigation } = this.props;
    const { notifications } = this.state;
    navigation.navigate({
      routeName: SCREENS.NOTIFICATION,
      key: SCREENS.NOTIFICATION,
      params: {
        notifications
      }
    });
  };

  render() {
    return (
      <Container>
        <LinearGradient
          colors={colors.gradient}
          style={styles.header}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
        >
          <Image source={require('../../assets/images/airport.png')} style={styles.airport} />
          <View style={styles.avartaContainer}>
            <Image source={require('../../assets/images/ic_launcher.png')} style={styles.logo} />
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.title}>HTH: MUA HÀNG XÁCH TAY</Text>
            <Text style={styles.intro}>Đăng nhập ngay!</Text>
          </View>
        </LinearGradient>
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
                  color={colors.gray}
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
                  color={colors.gray}
                  size={measures.defaultUnit * 2}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Button type="secondary" title="Đăng nhập" />
        <Button type="primary" title="Đăng ký" onPress={() => {this.navigate(SCREENS.REGISTER)}}/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: measures.defaultUnit * 15,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: measures.paddingMedium,
    paddingVertical: measures.paddingLong
  },
  avarta: {
    marginTop: measures.marginMedium
  },
  avartaContainer: {
    height: measures.defaultUnit * 9,
    width: measures.defaultUnit * 9,
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
  airport: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: '100%',
    opacity: 0.4,
    width: 150,
    resizeMode: 'contain'
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});
