// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  CameraRoll
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Transition } from 'react-navigation-fluid-transitions';
import { NavigationScreenProp } from 'react-navigation';
import {
  Container, Header, ExtraHeader, Content, Row, Button, Icon
} from '../Widgets';
import { Notify, Loading } from '../Global';
import { defaultStyles, measures, colors } from '../../assets';
import { SCREENS } from '../../routers';
import { fireNoti } from '../../api';

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {
  itemName: string,
  price: string,
  link: string,
  image: ?{
    uri: string
  }
};

export default class Admin extends Component<Props, State> {
  state = {
    itemName: '',
    price: '',
    link: '',
    image: null
  };

  onProcess = async () => {
    const {
      itemName, price, image, link
    } = this.state;
    if (!itemName || !price) {
      Notify.show('error', 'Gửi không thành công', 'Cần điền đủ thông tin tên sản phẩm và giá!');
      return;
    }
    try {
      Loading.show();
      const rs = await fireNoti({
        image,
        product: itemName,
        number: price,
        link
      });
      if (rs) {
        Notify.show('success', 'Chúc mừng', 'Gửi thành công');
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

  onSelectImage = async (camera: boolean) => {
    const image: {
      path: string,
      mime: string,
      filename: string
    } = !camera
      ? await ImagePicker.openPicker({
        multiple: false
      })
      : await ImagePicker.openCamera({
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
        name: image.filename
      }
    });
  };

  onBack = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.SHOP_MENU,
      key: SCREENS.SHOP_MENU
    });
  };

  render() {
    const {
      itemName, price, image, link
    } = this.state;
    return (
      <Container>
        <Header
          title="ĐƠN HÀNG"
          rightIcon={<Icon name="bell" type="ent" color={colors.mango} />}
          handleLeftButton={this.onBack}
        />
        <View style={defaultStyles.fill}>
          <ExtraHeader />
          <ScrollView>
            <Transition appear="left">
              <Content>
                <Text style={[styles.title, { marginTop: measures.marginMedium }]}>ĐƠN HÀNG</Text>
                <Row
                  name="itemName"
                  onChangeValue={this.onChangeValue}
                  first
                  title="Hàng cần bán"
                  placeHolder=""
                  value={itemName}
                  editEnabled
                />
                <Row
                  name="price"
                  onChangeValue={this.onChangeValue}
                  first
                  title="Giá"
                  placeHolder=""
                  value={price}
                  editEnabled
                />
                <Row
                  name="link"
                  onChangeValue={this.onChangeValue}
                  first
                  title="Link giới thiệu"
                  placeHolder=""
                  value={link}
                  editEnabled
                />
              </Content>
            </Transition>
            <Transition appear="right">
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
            </Transition>
          </ScrollView>
          <Button block title="GỬI THÔNG TIN" type="primary" onPress={this.onProcess} />
        </View>
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
