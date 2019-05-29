// @flow
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Platform
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Container, Header, ExtraHeader, Content, Input, Button
} from '../Widgets';
// import { Notify } from '../Global';
import { defaultStyles, measures, colors } from '../../assets';
// import { SCREENS } from '../../routers';
// import { loginUser } from '../../api';

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {
  username: string,
  password: string
};

export default class AdminLogIn extends Component<Props, State> {
  state = {
    username: '',
    password: ''
  };

  onBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onLogin = async () => {
    // const { username, password } = this.state;
    // const { navigation } = this.props;
    // const rs = loginUser(username, password);
    // if (rs) {
    //   this.navigate(SCREENS.SHOP_MENU);
    // } else {
    //   Notify.show('error', 'Vui lòng thử lại', 'Lỗi đăng ký');
    // }
  };

  navigate = (screenName: string) => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: screenName,
      key: screenName
    });
  };

  onChangeValue = (value: string, name: 'username' | 'password') => {
    this.setState({
      [name]: value
    });
  };

  dropdown: { alertWithType: Function };

  render() {
    const { username, password } = this.state;
    return (
      <Container haveKeyboard>
        <Header title="ADMIN ĐĂNG NHẬP" handleLeftButton={this.onBack} />
        <View style={defaultStyles.fill}>
          <ExtraHeader />
          <Content fill>
            {/* // $FlowIgnore: suppressing this error */}
            <KeyboardAwareScrollView contentContainerStyle={styles.contentWrapper}>
              <Text style={styles.text}>VUI LÒNG NHẬP THÔNG TIN</Text>
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
            </KeyboardAwareScrollView>
          </Content>
          <Button title="ĐĂNG NHẬP" type="primary" block onPress={this.onLogin} />
        </View>
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
    fontSize: measures.fontSizeLarge,
    fontWeight: 'bold',
    color: colors.lemon,
    alignSelf: 'center',
    marginBottom: measures.marginLong * 2
  }
});
