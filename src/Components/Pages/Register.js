// @flow
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Platform
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Container, Header, Content, Button, Icon, Input
} from '../Widgets';
import { defaultStyles, measures, colors } from '../../assets';
import { SCREENS } from '../../routers';
import { registerUser } from '../../api';

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {
  email: string,
  username: string,
  password: string
};

export default class Register extends Component<Props, State> {
  state = {
    email: '',
    username: '',
    password: ''
  };

  onBack = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.SHOP_MENU,
      key: SCREENS.SHOP_MENU
    });
  };

  onGoToSupport = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.SETTING,
      key: SCREENS.SETTING
    });
  };

  onChangeValue = (value: string, name: 'email' | 'username' | 'password') => {
    this.setState({
      [name]: value
    });
  };

  dropdown: { alertWithType: Function };

  render() {
    const { email, username, password } = this.state;
    return (
      <Container haveKeyboard>
        <Header
          title="ĐĂNG KÝ"
          rightIcon={<Icon name="bell" type="ent" color={colors.mango} />}
          handleLeftButton={this.onBack}
        />
        <Content fill>
          {/* $FlowFixMe */}
          <KeyboardAwareScrollView contentContainerStyle={styles.contentWrapper}>
            <View style={defaultStyles.center}>
              <Image source={require('../../assets/images/ic_launcher.png')} style={styles.logo} />
              <Text style={styles.title}>HTH: MUA HÀNG XÁCH TAY</Text>
            </View>
            <Text style={styles.text}>VUI LÒNG NHẬP THÔNG TIN</Text>
            <Input
              name="email"
              placeholderText="Địa chỉ Email"
              block
              autoCapitalize="none"
              containerStyle={styles.input}
              value={email}
              autoFocus
              onChangeValue={this.onChangeValue}
            />
            <Input
              name="username"
              placeholderText="Tên Đăng Nhập"
              block
              autoCapitalize="none"
              containerStyle={styles.input}
              value={username}
              autoFocus
              onChangeValue={this.onChangeValue}
            />
            <Input
              name="password"
              placeholderText="Mật khẩu"
              block
              passwordInput
              value={password}
              onChangeValue={this.onChangeValue}
            />
            <TouchableOpacity
              onPress={() => {
                this.onGoToSupport();
              }}
            >
              <Text style={styles.noticeTitle}>
                Bấm vào nút đăng ký đồng nghĩa với việc bạn đồng ý với điều khoản sử dụng của dịch
                vụ
              </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </Content>
        <Button title="ĐĂNG KÝ" type="primary" block onPress={() => {
                console.log(username , password, "OK")
                registerUser(username,password)
              }}/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: measures.paddingMedium,
    justifyContent: 'center',
    flex: 1
  },
  input: {
    marginBottom: measures.marginLong
  },
  text: {
    fontFamily: Platform.select({
      ios: 'Montserrat',
      android: 'Montserrat-Bold'
    }),
    marginTop: 20,
    fontSize: measures.fontSizeLarge,
    fontWeight: 'bold',
    color: colors.lemon,
    alignSelf: 'center',
    marginBottom: measures.marginLong
  },
  title: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeLarge - 1,
    fontWeight: 'bold',
    marginTop: 10
  },
  noticeTitle: {
    ...defaultStyles.text,
    color: colors.primaryColor,
    fontSize: measures.fontSizeSmall + 1,
    marginLeft: measures.marginSmall,
    marginTop: measures.marginSmall,
    textDecorationLine: 'underline'
  }
});
