// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  InteractionManager,
  CameraRoll
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import { NavigationScreenProp } from 'react-navigation';
import {
  Content, Row, Icon
} from 'Components/Widgets';
import { EditLayout } from 'Components/Layouts';
import { defaultStyles, measures, colors } from 'assets';
import { sendEmail } from 'api';
import { Notify, Loading } from 'Components/Global';
// import console = require('console');

const requireCheck = ['name', 'number', 'phone', 'product'];

type Props = {
  navigation: NavigationScreenProp<{}>,
  phone: string,
  name: string,
  address: string,
  product: string,
  price: string,
  uri: string
};
type State = {
  name: string,
  phone: string,
  address: string,
  product: string,
  number: string,
  date: string,
  cost: string,
  editEnabled: boolean,
  updateConfig: Object,
  note: string,
  nameError: boolean,
  phoneError: boolean,
  productError: boolean,
  notiCount: number,
  numberError: boolean,
  image: ?{
    uri: string,
    type?: string,
    fileName?: string
  },
  loginAttempt: number,
};
const editConfig: any = {
  date: {
    name: 'date',
    typeName: 'select',
    options: [
      {
        key: '1 tuần',
        value: '1 tuần'
      },
      {
        key: '2 tuần',
        value: '2 tuần'
      },
      {
        key: '3 tuần',
        value: '3 tuần'
      },
      {
        key: '1 tháng',
        value: '1 tháng'
      }
    ]
  }
};

export class ShoppingForm extends Component<Props, State> {
  state: State = {
    name: '',
    phone: '',
    product: '',
    number: '',
    date: '',
    cost: '',
    address: '',
    note: '',
    nameError: false,
    phoneError: false,
    productError: false,
    notiCount: 0,
    numberError: false,
    editEnabled: false,
    updateConfig: {},
    image: null,
    loginAttempt: 0,
  };

  componentDidMount() {
    const {
      phone, name, address, product, price, uri,
    } = this.props;
    this.setState({
      phone,
      name,
      address,
      product,
      cost: price,
      image: uri ? { uri } : null
    });
  }

  onEnableEdit = (infoName: string) => {
    const { editEnabled } = this.state;
    const defaultValue = this.state[infoName];
    InteractionManager.runAfterInteractions(() => this.setState({
      editEnabled: !editEnabled,
      updateConfig: {
        ...editConfig[infoName],
        defaultValue
      }
    }));
  };

  onAdjust = (name: string, isAscend: boolean) => {
    const value = this.state[name];
    if (_.isNaN(value) || _.isEmpty(value)) {
      return;
    }
    const newValue = isAscend ? _.parseInt(value) + 1 : _.parseInt(value) - 1;
    this.setState({
      [name]: newValue < 0 ? '0' : newValue.toString()
    });
  };

  onProcess = async () => {
    const {
      image, name, address, product, number, date, cost, note, phone
    } = this.state;
    const newState = {};
    requireCheck.forEach((item: string) => {
      if (this.state[item] === '') {
        newState[`${item}Error`] = true;
      }
    });
    if (!_.isEmpty(newState)) {
      this.setState(newState);
    }
    if (!name || !product || !number || !phone) {
      Notify.show('error', 'Gửi không thành công', 'Cần điền đủ thông tin!');
      return;
    }
    try {
      Loading.show();
      const rs = await sendEmail({
        // $FlowIgnore: suppressing this error
        image,
        name,
        address,
        product,
        number,
        date,
        cost,
        note,
        phone
      });
      if (rs) {
        Notify.show('success', 'Chúc mừng', 'Gửi thành công');
        AsyncStorage.setItem('phone', phone);
        AsyncStorage.setItem('name', name);
        AsyncStorage.setItem('address', address);
      } else {
        Notify.show('error', 'Gửi không thành công', 'Có lỗi hệ thống');
      }
      Loading.hide();
    } catch (error) {
      Loading.hide();
      Notify.show('error', 'Gửi không thành công', 'Có lỗi hệ thống');
    }
  };

  onChangeValue = (infoName: string, value: string) => {
    this.setState(state => ({
      ...state,
      [infoName]: value,
      [`${infoName}Error`]: false
    }));
  };

  onSelectImage = async (camera: boolean) => {
    const image: { path: string, mime: string, filename: string } = camera
      ? await ImagePicker.openCamera({
        multiple: false
      })
      : await ImagePicker.openPicker({
        multiple: false
      });
    if (camera) {
      /* $FlowFixMe */
      CameraRoll.saveToCameraRoll(image.path, 'photo');
    }
    this.setState({
      image: {
        uri: image.path,
        type: image.mime,
        fileName: image.filename
      }
    });
  };

  openAlert = () => {
    Alert.alert(
      'Chọn ảnh',
      '',
      [
        { text: 'Thư viện', onPress: () => this.onSelectImage(false) },
        { text: 'Máy ảnh', onPress: () => this.onSelectImage(true) }
      ],
      { cancelable: true }
    );
  };

  openDrawer = () => {
    const { navigation } = this.props;
    navigation.toggleDrawer();
  };

  didFocusSubscription: any;

  willBlurSubscription: any;

  render() {
    const {
      name,
      phone,
      product,
      number,
      cost,
      date,
      nameError,
      phoneError,
      numberError,
      productError,
      updateConfig,
      editEnabled,
      address,
      image,
      note
    } = this.state;
    return (
      <View style={[defaultStyles.fill, { paddingTop: measures.paddingMedium }]}>
        {/* // $FlowIgnore: suppressing this error */}
        <KeyboardAwareScrollView>
          <Content>
            <Text style={styles.title}>THÔNG TIN CÁ NHÂN</Text>
            <Row
              first
              title="Họ tên (*)"
              name="name"
              error={nameError}
              onChangeValue={this.onChangeValue}
              placeHolder="Nguyen Van A"
              value={name}
              editEnabled
            />
            <Row
              first
              name="phone"
              error={phoneError}
              onChangeValue={this.onChangeValue}
              title="Số Điện Thoại (*)"
              placeHolder="0901000000"
              keyboardType="numeric"
              value={phone}
              editEnabled
            />
            <Row
              first
              title="Địa Chỉ (Không bắt buộc)"
              name="address"
              onChangeValue={this.onChangeValue}
              placeHolder="Số nhà/ Đường/ Huyện (Quận), ..."
              value={address}
              editEnabled
            />
          </Content>
          <Content>
            <Text style={[styles.title, { marginTop: measures.marginMedium }]}>ĐƠN HÀNG</Text>
            <Row
              first
              title="Hàng cần mua (*)"
              placeHolder=""
              error={productError}
              name="product"
              onChangeValue={this.onChangeValue}
              value={product}
              editEnabled
            />
            <Row
              first
              title="Số lượng (*)"
              placeHolder=""
              keyboardType="numeric"
              error={numberError}
              onAdjust={this.onAdjust}
              adjustable
              name="number"
              onChangeValue={this.onChangeValue}
              value={number}
              editEnabled
            />
          </Content>
          <Content>
            <Text style={[styles.title, { marginTop: measures.marginMedium }]}>
              THÔNG TIN BỔ SUNG (Không bắt buộc)
            </Text>
            <Row
              first
              title="Giá mong muốn"
              placeHolder=""
              number
              value={cost}
              keyboardType="numeric"
              name="cost"
              onChangeValue={this.onChangeValue}
              editEnabled
            />
            <Row
              onPress={() => this.onEnableEdit('date')}
              first
              title="Thời gian giao hàng"
              placeHolder=""
              value={date}
              editEnabled
              type="select"
            />
            <Row
              first
              title="Ghi chú"
              placeHolder=""
              value={note}
              name="note"
              onChangeValue={this.onChangeValue}
              editEnabled
            />
          </Content>
          <Content>
            <TouchableOpacity onPress={this.openAlert}>
              <Text style={[styles.title, { marginTop: measures.marginMedium }]}>
                {'HÌNH ẢNH '}
                <Icon name="ios-camera" color={colors.blue} />
              </Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              <Image
                source={image || require('assets/images/default_image.jpg')}
                style={styles.image}
              />
            </View>
          </Content>
        </KeyboardAwareScrollView>
        {editEnabled && (
          <EditLayout
            config={updateConfig}
            onChangeValue={this.onChangeValue}
            onHide={this.onEnableEdit}
          />
        )}
        <TouchableOpacity style={styles.orderButton} onPress={this.onProcess}>
          <Icon name="shoppingcart" type="ant" size={measures.iconSizeMedium} color={colors.white} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ userState }, { passedProduct }) => {
  const { fullname, address, phoneNumber } = userState;
  const { product, price, uri } = passedProduct;
  return {
    name: fullname || '',
    address: address || '',
    phone: phoneNumber || '',
    product: product || '',
    price: price ? price.toString() : '',
    uri: uri || ''
  };
};

export default connect(
  mapStateToProps,
)(ShoppingForm);

const styles = StyleSheet.create({
  title: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeLarge + 1,
    color: colors.black,
    fontFamily: Platform.select({
      ios: 'Montserrat',
      android: 'Montserrat-SemiBold'
    }),
    marginLeft: measures.marginMedium
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: measures.borderRadius
  },
  imageContainer: {
    marginVertical: measures.marginSmall,
    width: measures.width - 4 * measures.marginMedium,
    height: ((measures.width - 4 * measures.marginMedium) * 2) / 3,
    ...defaultStyles.shadow,
    alignSelf: 'center'
  },
  shoppingButton: {
    height: measures.defaultUnit * 8,
    width: measures.defaultUnit * 8,
    borderRadius: measures.defaultUnit * 4,
    backgroundColor: colors.rose,
    position: 'absolute',
    bottom: measures.marginMedium,
    right: measures.marginMedium,
    ...defaultStyles.shadow
  },
  orderButton: {
    width: measures.defaultUnit * 6,
    height: measures.defaultUnit * 6,
    borderRadius: measures.defaultUnit * 3,
    backgroundColor: colors.lightPrimaryColor,
    bottom: measures.marginMedium,
    right: measures.marginMedium + measures.defaultUnit,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingTop: measures.paddingSmall / 2,
    shadowOpacity: 0.3,
    elevation: 1,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
});
