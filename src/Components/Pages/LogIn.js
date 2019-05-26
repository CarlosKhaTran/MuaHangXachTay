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

type Props = {
  navigation: NavigationScreenProp<{}>
};

type State = {
  email: string,
  password: string
};
export default class Login extends React.Component<Props, State> {
  state = {
    email: '',
    password: ''
  };

  onChangeValue = (value: string, name: string) => {
    this.setState({
      [name]: value
    });
  };

  onBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    const { email, password } = this.state;
    return (
      <Container haveKeyboard>
        {/* // $FlowIgnore: suppressing this error */}
        <KeyboardAwareScrollView contentContainerStyle={defaultStyles.fill}>
          <View style={styles.headerContainer}>
            <Slider />
          </View>
          <View style={styles.formContainer}>
            <Input
              name="email"
              prependIconName="ios-mail"
              prependIconColor={colors.primaryColor}
              placeholderText="Địa chỉ Email"
              block
              autoCapitalize="none"
              containerStyle={styles.input}
              value={email}
              onChangeValue={this.onChangeValue}
            />
            <Input
              name="password"
              placeholderText="Mật khẩu"
              prependIconName="ios-key"
              prependIconColor={colors.primaryColor}
              block
              passwordInput
              value={password}
              onChangeValue={this.onChangeValue}
            />
            <TouchableOpacity style={{ alignSelf: 'center' }}>
              <Text style={styles.forgetPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <View style={defaultStyles.fill}>
              <Button block title="ĐĂNG KÝ" type="secondary" />
            </View>
            <View style={defaultStyles.fill}>
              <Button block title="ĐĂNG NHẬP" type="primary" />
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

const styles = StyleSheet.create({
  headerContainer: {
    height: measures.defaultUnit * 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    ...defaultStyles.shadow
  },
  imageStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    opacity: 0.7
  },
  appName: {
    ...defaultStyles.text,
    marginTop: 5 * measures.marginLong,
    color: colors.lightPrimaryColor,
    fontSize: measures.defaultUnit * 4,
    fontWeight: '800'
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
  forgetPassword: {
    ...defaultStyles.text,
    marginTop: measures.marginMedium,
    color: colors.primaryColor,
    fontStyle: 'italic'
  },
  backButton: {
    position: 'absolute',
    top: measures.marginLong,
    left: measures.marginMedium,
    height: measures.defaultUnit * 4.5,
    width: measures.defaultUnit * 4.5,
    borderRadius: measures.defaultUnit * 2.25,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
  }
});
