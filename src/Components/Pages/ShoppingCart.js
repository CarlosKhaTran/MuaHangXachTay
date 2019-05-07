
// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Platform,
  InteractionManager,
  AsyncStorage,
  CameraRoll,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import { NavigationScreenProp } from 'react-navigation';
import {
  Container, Header, ExtraHeader, Content, Row, Button, Icon
} from '../Widgets';
import { EditLayout } from '../Layouts';
import { defaultStyles, measures, colors } from '../../assets';
import { SCREENS } from '../../routers';
import { sendEmail, getAllNoti } from '../../api';
import { Notify, Loading } from '../Global';
// import console = require('console');

const requireCheck = ['name', 'number', 'phone', 'product'];

type Noti = {
  id: string,
  product: string,
  number: string,
  seen: boolean,
  type: 'NEW_PRODUCT' | 'BOOKING_SUCESS' | 'BOOKING_FALSE',
  url?: string,
  link?: string
};
type Props = {
  navigation: NavigationScreenProp<{}>
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
    type: string,
    fileName: string
  },
  loginAttempt: number,
  notifications: Array<Noti>
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

export default class ShoppingCart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.didFocusSubscription = props.navigation.addListener('didFocus', () => BackHandler.addEventListener('hardwareBackPress', this.handleBackPress));
  }

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
    notifications: []
  };

  async componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener('didFocus', () => {
      const { product, cost } = this.state;
      const productReceived = this.props.navigation.getParam('product');
      const priceReceived = this.props.navigation.getParam('price');
      this.setState({
        product: productReceived || product,
        cost: priceReceived || cost
      });
      this.getNoti();
    });
    this.willBlurSubscription = this.props.navigation.addListener('willBlur', () => BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress));
    const nameReceived = await AsyncStorage.getItem('name');
    const phoneReceived = await AsyncStorage.getItem('phone');
    const addressReceived = await AsyncStorage.getItem('address');
    this.setState({
      name: nameReceived || '',
      phone: phoneReceived || '',
      address: addressReceived || ''
    });
  }

  componentWillUnmount() {
    if (this.didFocusSubscription) this.didFocusSubscription.remove();
    if (this.willBlurSubscription) this.willBlurSubscription.remove();
  }

  getNoti = async () => {
    const allNoti: Array<Noti> = await getAllNoti();
    const notifications = allNoti.map((item: Noti) => ({
      ...item,
      type: 'NEW_PRODUCT'
    }));
    const deleteStore = (await AsyncStorage.getItem('deleteStore')) || '{}';
    const seenStore = (await AsyncStorage.getItem('seenStore')) || '{}';
    const notiCount = allNoti.filter(
      item => !JSON.parse(seenStore)[item.id] && !JSON.parse(deleteStore)[item.id]
    ).length;
    this.setState({
      notifications,
      notiCount
    });
  };

  handleBackPress = () => false;

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

  onSelectImage = async (camera: boolean) => {
    const image: { path: string, mime: string, filename: string } = camera
      ? await ImagePicker.openCamera({
        multiple: false
      })
      : await ImagePicker.openPicker({
        multiple: false
      });
    if (camera) {
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

  handleSecretAction = () => {
    const { loginAttempt } = this.state;
    const { navigation } = this.props;
    if (loginAttempt === 10) {
      this.setState({
        loginAttempt: 0
      });
      navigation.navigate({
        routeName: SCREENS.ADMIN_LOGIN,
        key: SCREENS.ADMIN_LOGIN
      });
    } else {
      this.setState({
        loginAttempt: loginAttempt + 1
      });
    }
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
  }

  didFocusSubscription: any;

  willBlurSubscription: any;

  renderBell = () => {
    const { notiCount } = this.state;
    switch (notiCount) {
      case 0:
        return (
          <View>
            <Icon name="bell" type="ent" color={colors.gray} />
          </View>
        );
      default:
        return (
          <View>
            <Icon name="bell" type="ent" color={colors.mango} />
            <View style={{
              position: 'absolute',
              top: -measures.defaultUnit + 3,
              left: measures.defaultUnit * 2,
              width: measures.defaultUnit * 2,
              height: measures.defaultUnit * 2,
              borderRadius: measures.defaultUnit,
              backgroundColor: colors.lightGray,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <Text style={{
                ...defaultStyles.text,
                fontWeight: 'bold',
                fontSize: measures.fontSizeSmall,
                color: colors.rose,
              }}
              >
                {notiCount}
              </Text>
            </View>
          </View>
        );
    }
  };

  renderMenu = () => (
    <View>
      <Icon name="hamburger" type="mdc" color={colors.white} />
    </View>
  )

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
      <Container>
        <Header
          leftIcon={this.renderMenu()}
          handleLeftButton={this.openDrawer}
          handleSecretAction={this.handleSecretAction}
          title="ĐƠN HÀNG"
          rightIcon={this.renderBell()}
          handleRightButton={this.onOpenNotification}
        />
        <View style={defaultStyles.fill}>
          <ExtraHeader />
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
                  source={image || require('../../assets/images/default_image.jpg')}
                  style={styles.image}
                />
              </View>
            </Content>
            <Button block title="Đặt Hàng" type="primary" onPress={this.onProcess} />
          </KeyboardAwareScrollView>
        </View>
        {editEnabled && (
          <EditLayout
            config={updateConfig}
            onChangeValue={this.onChangeValue}
            onHide={this.onEnableEdit}
          />
        )}
        {/* <TouchableOpacity style={styles.shoppingButton} /> */}
      </Container>
    );
  }
}

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
    ...defaultStyles.shadow,
  },
});
