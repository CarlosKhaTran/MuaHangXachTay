// @flow

import type { Product } from 'utils/typeDefinition';
import React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import {
  View, StyleSheet, FlatList, Text, Image, TouchableOpacity
} from 'react-native';
import { measures, defaultStyles, colors } from 'assets';
import { actions } from 'state';
import { SCREENS } from 'routers';

type Props = {
  navigation: NavigationScreenProp<{}>,
  getProductList: () => void,
  productList: Array<Product>,
};

type State = {
};

export class Products extends React.Component<Props, State> {
  state = {
  };

  componentDidMount() {
    const { getProductList } = this.props;
    getProductList();
  }

  onPressItem = (item: Product) => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.PRODUCT,
      key: SCREENS.PRODUCT,
      params: {
        product: item.name,
        number: item.price,
        url: item.image_url,
        link: ''
      }
    });
  }

  renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.rowContainer} onPress={() => this.onPressItem(item)}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.name}>Giá:</Text>
          <Text style={[styles.name, { color: colors.primaryColor }]}>
            {`${item.price.toLocaleString()} VND`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { productList } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={productList}
          renderItem={this.renderItem}
          keyExtractor={(item: Product, index: number) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { productList } = state.productState;
  return {
    productList
  };
};

const mapDispatchToProps = dispatch => ({
  getProductList: () => dispatch(actions.getProductList()),
});
const ProductList = connect(mapStateToProps, mapDispatchToProps)(Products);

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    ...defaultStyles.shadow,
    borderRadius: measures.borderRadius,
    backgroundColor: colors.white,
    marginHorizontal: measures.marginMedium,
    marginVertical: measures.marginSmall,
    borderWidth: 0.5,
    borderColor: colors.primaryColor,
    flexDirection: 'row'
  },
  image: {
    borderRadius: measures.borderRadius,
    width: measures.defaultUnit * 12,
    height: measures.defaultUnit * 12,
    resizeMode: 'contain'
  },
  infoContainer: {
    flex: 1,
    padding: measures.paddingSmall
  },
  name: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeLarge - 2,
    fontWeight: '500'
  },
  description: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeMedium,
    fontWeight: '200',
    marginTop: measures.marginSmall
  },
  priceContainer: {
    marginTop: measures.marginSmall,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
