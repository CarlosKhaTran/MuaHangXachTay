// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  InteractionManager,
  Image,
  TouchableOpacity,
  BackHandler,
  AsyncStorage,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Transition } from 'react-navigation-fluid-transitions';
import { NavigationScreenProp } from 'react-navigation';
import {
  Container, Header, ExtraHeader, Content, Row, Button, Icon
} from '../Widgets';
import { EditLayout } from '../Layouts';
import { defaultStyles, measures, colors } from '../../assets';
import { SCREENS } from '../../routers';
import { sendEmail } from '../../api';
import { Notify, Loading } from '../Global';
// import console = require('console');

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
  image: ?{
    uri: string,
    type: string,
    fileName: string
  },
  loginAttempt: number
};

const editConfig: any = {
  name: {
    name: 'name',
    typeName: 'input',
    defaultValue: ''
  },
  note: {
    name: 'note',
    typeName: 'input',
    defaultValue: ''
  },
  address: {
    name: 'address',
    typeName: 'input',
    defaultValue: ''
  },
  phone: {
    name: 'phone',
    typeName: 'input',
    defaultValue: '',
    keyboardType: 'numeric'
  },
  product: {
    name: 'product',
    typeName: 'input',
    defaultValue: ''
  },
  number: {
    name: 'number',
    typeName: 'input',
    defaultValue: '',
    keyboardType: 'numeric',
    adjustNumber: true
  },
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
  },
  cost: {
    name: 'cost',
    typeName: 'input',
    defaultValue: '',
    keyboardType: 'numeric'
  }
};

export default class ShoppingCart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.didFocusSubscription = props.navigation.addListener('didFocus', () => BackHandler.addEventListener('hardwareBackPress', this.handleBackPress));
  }

  state = {
    name: '',
    phone: '',
    product: '',
    number: '',
    date: '',
    cost: '',
    address: '',
    note: '',
    editEnabled: false,
    updateConfig: {},
    image: null,
    loginAttempt: 0
  };

  async componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener('didFocus', () => {
      const product = this.props.navigation.getParam('product');
      const price = this.props.navigation.getParam('price');
      this.setState({
        product: product || '',
        cost: price || '',
      });
    });
    this.willBlurSubscription = this.props.navigation.addListener('willBlur', () => BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress));
    const name = await AsyncStorage.getItem('name');
    const phone = await AsyncStorage.getItem('phone');
    const address = await AsyncStorage.getItem('address');
    this.setState({
      name: name || '',
      phone: phone || '',
      address: address || '',
    });
  }

  componentWillUnmount() {
    if (this.didFocusSubscription) this.didFocusSubscription.remove();
    if (this.willBlurSubscription) this.willBlurSubscription.remove();
  }

  handleBackPress = () => false

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

  onProcess = async () => {
    const {
      image, name, address, product, number, date, cost, note, phone
    } = this.state;
    if (!name || !product || !number || !phone) {
      Notify.show('error', 'Gửi không thành công', 'Cần điền đủ thông tin!');
      return;
    }
    try {
      Loading.show();
      const rs = await sendEmail({
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
      [infoName]: value
    }));
  };

  onOpenNotification = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.NOTIFICATION,
      key: SCREENS.NOTIFICATION
    });
  };

  onSelectImage = async () => {
    const image: { path: string, mime: string, filename: string } = await ImagePicker.openPicker({
      multiple: false
    });
    console.log('xxx', image);
    this.setState({
      image: {
        uri: image.path,
        type: image.mime,
        fileName: image.filename,
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

  didFocusSubscription: any

  willBlurSubscription: any

  render() {
    const {
      name,
      phone,
      product,
      number,
      cost,
      date,
      updateConfig,
      editEnabled,
      address,
      image,
      note
    } = this.state;
    return (
      <Container>
        <Header
          handleSecretAction={this.handleSecretAction}
          title="ĐƠN HÀNG"
          rightIcon={<Icon name="bell" type="ent" color={colors.mango} />}
          handleRightButton={this.onOpenNotification}
        />
        <View style={defaultStyles.fill}>
          <ExtraHeader />
          <ScrollView>
            <Transition appear="left">
              <Content>
                <Text style={styles.title}>THÔNG TIN CÁ NHÂN</Text>
                <Row
                  onPress={() => this.onEnableEdit('name')}
                  first
                  title="Họ tên (*)"
                  placeHolder="Nguyen Van A"
                  value={name}
                  editEnabled
                />
                <Row
                  onPress={() => this.onEnableEdit('phone')}
                  first
                  title="Số Điện Thoại (*)"
                  placeHolder="0901000000"
                  value={phone}
                  editEnabled
                />
                <Row
                  onPress={() => this.onEnableEdit('address')}
                  first
                  title="Địa Chỉ (Không bắt buộc)"
                  placeHolder="Số nhà/ Đường/ Huyện (Quận), ..."
                  value={address}
                  editEnabled
                />
              </Content>
            </Transition>
            <Transition appear="right">
              <Content>
                <Text style={[styles.title, { marginTop: measures.marginMedium }]}>ĐƠN HÀNG</Text>
                <Row
                  onPress={() => this.onEnableEdit('product')}
                  first
                  title="Hàng cần mua (*)"
                  placeHolder=""
                  value={product}
                  editEnabled
                />
                <Row
                  onPress={() => this.onEnableEdit('number')}
                  first
                  title="Số lượng (*)"
                  placeHolder=""
                  value={number}
                  editEnabled
                />
              </Content>
            </Transition>
            <Transition appear="left">
              <Content>
                <Text style={[styles.title, { marginTop: measures.marginMedium }]}>
                  THÔNG TIN BỔ SUNG (Không bắt buộc)
                </Text>
                <Row
                  onPress={() => this.onEnableEdit('cost')}
                  first
                  title="Giá mong muốn"
                  placeHolder=""
                  value={cost}
                  editEnabled
                />
                <Row
                  onPress={() => this.onEnableEdit('date')}
                  first
                  title="Thời gian giao hàng"
                  placeHolder=""
                  value={date}
                  editEnabled
                />
                <Row
                  onPress={() => this.onEnableEdit('note')}
                  first
                  title="Ghi chú"
                  placeHolder=""
                  value={note}
                  editEnabled
                />
              </Content>
            </Transition>
            <Transition appear="right">
              <Content>
                <TouchableOpacity onPress={this.onSelectImage}>
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
            </Transition>
            <Button block title="Đặt Hàng" type="primary" onPress={this.onProcess} />
          </ScrollView>
        </View>
        {editEnabled && (
          <EditLayout
            config={updateConfig}
            onChangeValue={this.onChangeValue}
            onHide={this.onEnableEdit}
          />
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeMedium,
    color: colors.black,
    fontWeight: '500',
    marginLeft: measures.marginSmall
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
  }
});
