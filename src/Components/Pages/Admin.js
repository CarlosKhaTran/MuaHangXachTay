// @flow
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  InteractionManager,
  Image,
  TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Transition } from 'react-navigation-fluid-transitions';
import { NavigationScreenProp } from 'react-navigation';
import {
  Container, Header, ExtraHeader, Content, Row, Button, Icon
} from '../Widgets';
import { Notify, Loading } from '../Global';
import {
  EditLayout
} from '../Layouts';
import { defaultStyles, measures, colors } from '../../assets';
import { SCREENS } from '../../routers';
import { fireNoti } from '../../api';

type Props = {
  navigation: NavigationScreenProp<{}>,
};
type State = {
  itemName: string,
  price: string,
  editEnabled: boolean,
  updateConfig: Object,
  link: string,
  image: ?{
    uri: string,
  },
};

const editConfig: any = {
  itemName: {
    name: 'itemName',
    typeName: 'input',
    defaultValue: '',
  },
  link: {
    name: 'link',
    typeName: 'input',
    defaultValue: '',
  },
  price: {
    name: 'price',
    typeName: 'input',
    defaultValue: '',
    keyboardType: 'numeric',
  },
};

export default class Admin extends Component<Props, State> {
  state = {
    itemName: '',
    price: '',
    link: '',
    image: null,
    editEnabled: false,
    updateConfig: {},
  }

  onEnableEdit = (infoName: string) => {
    const { editEnabled } = this.state;
    const defaultValue = this.state[infoName];
    InteractionManager.runAfterInteractions(() => this.setState({
      editEnabled: !editEnabled,
      updateConfig: {
        ...editConfig[infoName],
        defaultValue,
      },
    }));
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
        link,
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
  }

  onChangeValue = (infoName: string, value: string) => {
    this.setState(state => ({
      ...state,
      [infoName]: value,
    }));
  };

  onOpenNotification = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.NOTIFICATION,
      key: SCREENS.NOTIFICATION,
    });
  }

  onSelectImage = async () => {
    const image: { path: string, mime: string, filename: string } = await ImagePicker.openPicker({
      multiple: false
    });
    this.setState({
      image: {
        uri: image.path,
        type: image.mime,
        name: image.filename,
      }
    });
  }

  onBack = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.SHOPPING_CART,
      key: SCREENS.SHOPPING_CART,
    });
  }

  render() {
    const {
      itemName,
      price,
      updateConfig,
      editEnabled,
      image,
      link,
    } = this.state;
    return (
      <Container>
        <Header
          title="ĐƠN HÀNG"
          rightIcon={<Icon name="bell" type="ent" color={colors.mango} />}
          handleRightButton={this.onOpenNotification}
          handleLeftButton={this.onBack}
        />
        <View style={defaultStyles.fill}>
          <ExtraHeader />
          <ScrollView>
            <Transition appear="left">
              <Content>
                <Text style={[styles.title, { marginTop: measures.marginMedium }]}>ĐƠN HÀNG</Text>
                <Row
                  onPress={() => this.onEnableEdit('itemName')}
                  first
                  title="Hàng cần bán"
                  placeHolder=""
                  value={itemName}
                  editEnabled
                />
                <Row
                  onPress={() => this.onEnableEdit('price')}
                  first
                  title="Giá"
                  placeHolder=""
                  value={price}
                  editEnabled
                />
                <Row
                  onPress={() => this.onEnableEdit('link')}
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
                <TouchableOpacity onPress={this.onSelectImage}>
                  <Text style={[styles.title, { marginTop: measures.marginMedium }]}>
                    {'HÌNH ẢNH '}
                    <Icon name="ios-camera" color={colors.blue} />
                  </Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                  <Image source={image || require('../../assets/images/default_image.jpg')} style={styles.image} />
                </View>
              </Content>
            </Transition>
          </ScrollView>
          <Button block title="GỬI THÔNG TIN" type="primary" onPress={this.onProcess} />
        </View>
        {editEnabled
          && (
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
    marginLeft: measures.marginSmall,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: measures.borderRadius,
  },
  imageContainer: {
    marginVertical: measures.marginSmall,
    width: measures.width - 4 * measures.marginMedium,
    height: (measures.width - 4 * measures.marginMedium) * 2 / 3,
    ...defaultStyles.shadow,
    alignSelf: 'center',
  }
});
