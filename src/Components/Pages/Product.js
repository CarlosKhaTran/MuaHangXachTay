// @flow
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, Linking
} from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import { NavigationScreenProp } from 'react-navigation';
import {
  Container, Header, ExtraHeader, Content, Row, Button, Icon
} from '../Widgets';
import { defaultStyles, measures, colors } from '../../assets';
import { SCREENS } from '../../routers';
import { Notify } from '../Global';

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {};

export default class Product extends Component<Props, State> {
  product = this.props.navigation.getParam('product');

  price = this.props.navigation.getParam('number');

  uri = this.props.navigation.getParam('url');

  link = this.props.navigation.getParam('link');

  onProcess = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.SHOPPING_CART,
      key: SCREENS.SHOPPING_CART,
      params: {
        product: this.product,
        price: this.price,
        uri: this.uri,
        link: this.link
      }
    });
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

  onBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  openLink = () => {
    const { link } = this;
    if (link === undefined || link === null || link.length === 0) {
      return;
    }
    try {
      Linking.openURL(link);
    } catch (error) {
      Notify.show('error', 'Có lỗi', 'Liên kết không khả dụng!');
    }
  };

  render() {
    return (
      <Container>
        <Header title="ĐƠN HÀNG" handleLeftButton={this.onBack} />
        <View style={defaultStyles.fill}>
          <ExtraHeader />
          <ScrollView>
            <Transition appear="left">
              <Content>
                <Text style={[styles.title, { marginTop: measures.marginMedium }]}>ĐƠN HÀNG</Text>
                <Row
                  first
                  title="Hàng cần bán"
                  placeHolder=""
                  value={this.product}
                  editEnabled={false}
                />
                <Row first title="Giá" placeHolder="" value={this.price} editEnabled={false} />
                <Row
                  first
                  title="Link giới thiệu"
                  placeHolder=""
                  onPress={this.openLink}
                  value={this.link}
                  iconName="link-variant"
                  editEnabled
                />
              </Content>
            </Transition>
            <Transition appear="right">
              <Content>
                <View>
                  <Text style={[styles.title, { marginTop: measures.marginMedium }]}>
                    {'HÌNH ẢNH '}
                    <Icon name="ios-camera" color={colors.blue} />
                  </Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={
                      this.uri
                        ? { uri: this.uri }
                        : require('../../assets/images/default_image.jpg')
                    }
                    style={styles.image}
                  />
                </View>
              </Content>
            </Transition>
            <Button block title="Đặt Hàng" type="primary" onPress={this.onProcess} />
          </ScrollView>
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
