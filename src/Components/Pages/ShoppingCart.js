// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Container, Header, ExtraHeader } from 'Components/Widgets';
import { defaultStyles } from 'assets';
import { ShoppingForm } from 'Components/Layouts';
// import console = require('console');

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {};

export default class ShoppingCart extends Component<Props, State> {
  product = this.props.navigation.getParam('product');

  price = this.props.navigation.getParam('price');

  uri = this.props.navigation.getParam('uri');

  link = this.props.navigation.getParam('link');

  onBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <Container>
        <Header handleLeftButton={this.onBack} title="ĐƠN HÀNG" />
        <View style={defaultStyles.fill}>
          <ExtraHeader />
          <ShoppingForm
            passedProduct={{
              uri: this.uri,
              link: this.link,
              price: this.price,
              product: this.product
            }}
          />
        </View>
      </Container>
    );
  }
}
