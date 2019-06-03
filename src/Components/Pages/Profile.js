// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  ImageBackground, StyleSheet, View, Text, TouchableOpacity, Switch
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import {
  Container, Icon, Row, Button
} from 'Components/Widgets';
import { measures, colors, defaultStyles } from 'assets';
import { actions } from 'state';
import { validateEmail, validatePhone } from 'utils/common';
import { Alert, Notify } from 'Components/Global';

type Props = {
  navigation: NavigationScreenProp<{}>,
  username: string,
  fullname: string,
  phoneNumber: string,
  email: string,
  address: string,
  getUserProfile: () => void,
  updateUserProfile: (
    fullname: string,
    email: string,
    address: string,
    phoneNumber: string,
    cb: (isSuccess: boolean) => void
  ) => void
};

type State = {
  editEnabled: boolean,
  fullname: string,
  email: string,
  address: string,
  phoneNumber: string
};

export class Profile extends React.PureComponent<Props, State> {
  state = {
    editEnabled: false,
    fullname: '',
    email: '',
    address: '',
    phoneNumber: ''
  };

  componentDidMount = () => {
    const { getUserProfile } = this.props;
    getUserProfile();
  };

  onBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onChangeValue = (infoName: string, value: string) => {
    this.setState(state => ({
      ...state,
      [infoName]: value,
      [`${infoName}Error`]: false
    }));
  };

  oneEnableEdit = () => {
    this.setState(state => ({
      editEnabled: !state.editEnabled
    }));
    this.onReset();
  };

  getValue = (name: string) => {
    const { editEnabled } = this.state;
    return editEnabled ? this.state[name] : this.props[name];
  };

  onReset = () => {
    const {
      fullname, email, phoneNumber, address
    } = this.props;
    this.setState({
      fullname,
      phoneNumber,
      email,
      address
    });
  };

  onUpdate = () => {
    const {
      fullname, email, phoneNumber, address
    } = this.state;
    const { updateUserProfile } = this.props;
    if (!validateEmail(email)) {
      Alert.show('Opps', 'Email của bạn không đúng định dạng');
      return;
    }
    if (!validatePhone(phoneNumber)) {
      Alert.show('Opps', 'Số điện thoại của bạn không đúng');
      return;
    }
    updateUserProfile(fullname, email, address, phoneNumber, this.callBack);
  };

  callBack = (isSuccess: boolean) => {
    if (isSuccess) {
      Notify.show('success', 'Thành công', 'Đã cập nhật thông tin của bạn');
      this.oneEnableEdit();
      return;
    }
    Alert.show('Xin lỗi', 'Không thể cập nhật. Vui lòng thử lại');
  }

  render() {
    const { editEnabled } = this.state;
    const { username, fullname } = this.props;
    return (
      <Container>
        {/* // $FlowIgnore: suppressing this error */}
        <KeyboardAwareScrollView contentContainerStyle={defaultStyles.fill}>
          <ImageBackground
            style={styles.imagebackground}
            source={require('assets/images/background.jpg')}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.avartaContainer}>
              <Text style={styles.firstLetter}>{(username || fullname)[0].toUpperCase()}</Text>
            </View>
            <Text style={styles.username}>{`@Username: ${username}`}</Text>
          </ImageBackground>
          <View style={styles.content}>
            <View style={styles.switchContainer}>
              <Text style={[styles.edit, editEnabled && { color: colors.green }]}>Chỉnh sửa</Text>
              <Switch value={editEnabled} onValueChange={this.oneEnableEdit} />
            </View>
            <Row
              first
              title="Họ tên"
              name="fullname"
              editEnabled={editEnabled}
              error={false}
              onChangeValue={this.onChangeValue}
              placeHolder="Nguyen Van A"
              value={this.getValue('fullname')}
            />
            <Row
              first
              name="phoneNumber"
              error={false}
              onChangeValue={this.onChangeValue}
              title="Số Điện Thoại"
              placeHolder="0901000000"
              keyboardType="numeric"
              value={this.getValue('phoneNumber')}
              editEnabled={editEnabled}
            />
            <Row
              first
              name="email"
              error={false}
              onChangeValue={this.onChangeValue}
              title="Email"
              placeHolder="example@gmail.com"
              value={this.getValue('email')}
              editEnabled={editEnabled}
            />
            <Row
              first
              title="Địa Chỉ (Không bắt buộc)"
              name="address"
              onChangeValue={this.onChangeValue}
              placeHolder="Số nhà/ Đường/ Huyện (Quận), ..."
              value={this.getValue('address')}
              editEnabled={editEnabled}
            />
            {editEnabled && (
              <View style={styles.buttonContainer}>
                <View style={defaultStyles.fill}>
                  <Button block title="ĐẶT LẠI" type="secondary" onPress={this.onReset} />
                </View>
                <View style={defaultStyles.fill}>
                  <Button block title="CẬP NHẬT" type="primary" onPress={this.onUpdate} />
                </View>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity style={styles.backButton} onPress={this.onBack}>
          <Icon name="ios-arrow-back" size={30} color={colors.primaryColor} />
          <Text style={styles.backText}> Back</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapStateToProps = ({ userState }) => {
  const { username, fullname } = userState;
  return {
    ...userState,
    username: username || '',
    fullname: fullname || ''
  };
};

const mapDispatchToProps = dispatch => ({
  getUserProfile: () => dispatch(actions.getUserProfile()),
  updateUserProfile: (
    fullname: string,
    email: string,
    address: string,
    phoneNumber: string,
    cb: (isSuccess: boolean) => void
  ) => dispatch(actions.updateUserProfile(fullname, phoneNumber, address, email, cb))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

const styles = StyleSheet.create({
  imagebackground: {
    flex: 1 / 2.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    opacity: 0.5
  },
  content: {
    flex: 1,
    backgroundColor: colors.white
  },
  avartaContainer: {
    height: measures.defaultUnit * 15,
    width: measures.defaultUnit * 15,
    marginLeft: measures.marginMedium,
    backgroundColor: colors.spray,
    borderRadius: measures.defaultUnit * 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  firstLetter: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeHuge + 10,
    fontWeight: '600',
    color: colors.white
  },
  username: {
    ...defaultStyles.text,
    marginTop: measures.marginMedium,
    fontSize: measures.fontSizeLarge,
    fontWeight: '400',
    color: colors.sharl
  },
  backButton: {
    position: 'absolute',
    top: measures.marginLong * 1.5,
    left: measures.marginMedium,
    height: measures.defaultUnit * 4.5,
    width: measures.defaultUnit * 10,
    flexDirection: 'row',
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backText: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeSmall,
    color: colors.lightPrimaryColor,
    fontWeight: '400'
  },
  edit: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeLarge,
    color: colors.gray,
    fontWeight: 'bold',
    marginRight: measures.marginSmall
  },
  switchContainer: {
    paddingVertical: measures.marginSmall,
    paddingHorizontal: measures.marginMedium,
    backgroundColor: colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: colors.white
  }
});
