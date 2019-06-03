// @flow
import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Container, Button, Input, Icon
} from 'Components/Widgets';
import { measures, colors, defaultStyles } from 'assets';
import { Slider } from 'Components/Layouts';
import { Alert, Notify } from 'Components/Global';
import { connect } from 'react-redux';
import { actions } from 'state';
import { SCREENS } from 'routers';

type Props = {
  navigation: NavigationScreenProp<{}>,
  logIn: (username: string, password: string, cb: (isSuccess: boolean) => void) => void,
  registerUser: (username: string, password: string, cb: (isSuccess: boolean) => void) => void
};

type State = {
  username: string,
  password: string,
  confirmPassword: string,
  isSignUp: boolean,
  isAgree: boolean
};

const initState: State = {
  username: '',
  password: '',
  confirmPassword: '',
  isSignUp: false,
  isAgree: false
};
export class Login extends React.Component<Props, State> {
  state = initState;

  onChangeValue = (value: string, name: string) => {
    this.setState({
      [name]: value
    });
  };

  switchMode = () => this.setState(state => ({
    isSignUp: !state.isSignUp,
    isAgree: false
  }));

  onBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  callBack = (success: boolean) => {
    const { username, isSignUp } = this.state;
    if (success) {
      Notify.show(
        'success',
        `Xin chào ${username}`,
        `Bạn đã ${isSignUp ? 'đăng ký' : 'đăng nhập'} thành công!`
      );
      this.onBack();
    } else {
      Alert.show('Xin lỗi', 'Có lỗi xảy ra, vui lòng kiểm tra lại thông tin!');
    }
  };

  onLogin = () => {
    const { username, password } = this.state;
    const { logIn, navigation } = this.props;
    if (!username || !password) {
      Alert.show('Không thể đăng nhập', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (username === 'admin' && password === 'muahangxachtay') {
      navigation.navigate({
        routeName: SCREENS.ADMIN,
        key: SCREENS.ADMIN
      });
      return;
    }
    logIn(username, password, this.callBack);
  };

  onSignUp = () => {
    const {
      username, password, confirmPassword, isAgree
    } = this.state;
    const { registerUser } = this.props;
    if (!username || !password || !confirmPassword) {
      Alert.show('Không thể đăng ký', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (password !== confirmPassword) {
      Alert.show('Không thể đăng ký', 'Mật khẩu xác nhận không trùng khớp');
      return;
    }
    if (!isAgree) {
      Alert.show('Không thể đăng ký', 'Vui lòng đồng ý điều kiện và điều khoản!');
      return;
    }
    registerUser(username, password, this.callBack);
  };

  toggleAgree = () => this.setState(state => ({
    isAgree: !state.isAgree
  }));

  render() {
    const {
      username, password, isSignUp, confirmPassword, isAgree
    } = this.state;
    return (
      <Container haveKeyboard>
        {/* // $FlowIgnore: suppressing this error */}
        <KeyboardAwareScrollView contentContainerStyle={defaultStyles.fill}>
          <View style={styles.headerContainer}>
            <Slider />
          </View>
          <View style={styles.formContainer}>
            <Input
              name="username"
              prependIconName="ios-mail"
              prependIconColor={colors.primaryColor}
              placeholderText="Tên đăng nhập"
              block
              autoCapitalize="none"
              containerStyle={styles.input}
              value={username}
              onChangeValue={this.onChangeValue}
            />
            <Input
              name="password"
              placeholderText="Mật khẩu"
              prependIconName="ios-key"
              prependIconColor={colors.carrot}
              block
              passwordInput
              containerStyle={styles.input}
              value={password}
              onChangeValue={this.onChangeValue}
            />
            {isSignUp && (
              <React.Fragment>
                <Input
                  name="confirmPassword"
                  placeholderText="Xác nhận mật khẩu"
                  prependIconName="ios-key"
                  prependIconColor={colors.orange}
                  block
                  passwordInput
                  value={confirmPassword}
                  onChangeValue={this.onChangeValue}
                />
                <TouchableOpacity style={styles.checkBoxButton} onPress={this.toggleAgree}>
                  <Icon
                    name={isAgree ? 'ios-checkbox-outline' : 'ios-square-outline'}
                    size={measures.iconSizeSmall}
                    color={colors.primaryColor}
                    style={styles.icon}
                  />
                  <Text style={styles.checkBoxText}> Đồng ý với điều kiện và điều khoản</Text>
                </TouchableOpacity>
              </React.Fragment>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <View style={defaultStyles.fill}>
              <Button
                block
                title="ĐĂNG KÝ"
                type={!isSignUp ? 'secondary' : 'primary'}
                onPress={isSignUp ? this.onSignUp : this.switchMode}
              />
            </View>
            <View style={defaultStyles.fill}>
              <Button
                block
                title="ĐĂNG NHẬP"
                type={isSignUp ? 'secondary' : 'primary'}
                onPress={!isSignUp ? this.onLogin : this.switchMode}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity style={styles.backButton} onPress={this.onBack}>
          <Icon name="ios-arrow-back" size={30} color={colors.primaryColor} />
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  logIn: (username: string, password: string, cb: (isSuccess: boolean) => void) => {
    dispatch(actions.logIn(username, password, cb));
  },
  registerUser: (username: string, password: string, cb: (isSuccess: boolean) => void) => {
    dispatch(actions.registerUser(username, password, cb));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
  headerContainer: {
    height: measures.defaultUnit * 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    ...defaultStyles.shadow
  },
  formContainer: {
    marginTop: measures.marginSmall,
    borderRadius: measures.borderRadius,
    marginHorizontal: measures.marginSmall,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: measures.paddingMedium,
    ...defaultStyles.shadow
  },
  input: {
    marginBottom: measures.marginMedium
  },
  checkBoxText: {
    ...defaultStyles.text,
    alignItems: 'center',
    marginTop: measures.marginMedium,
    color: colors.primaryColor,
    fontStyle: 'italic'
  },
  backButton: {
    position: 'absolute',
    top: measures.marginLong * 1.5,
    left: measures.marginMedium,
    height: measures.defaultUnit * 4.5,
    width: measures.defaultUnit * 4.5,
    borderRadius: measures.defaultUnit * 2.25,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  checkBoxButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginTop: measures.marginMedium
  }
});
