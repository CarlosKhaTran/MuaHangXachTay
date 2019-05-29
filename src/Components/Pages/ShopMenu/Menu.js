// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  View, StyleSheet, FlatList, Text, Image
} from 'react-native';
import type { Product } from 'utils/typeDefinition';
import { measures, defaultStyles, colors } from 'assets';
import { getAllProduct } from 'api';

type Props = {};

type State = {
  productData: Array<Product>
};

export class Menu extends React.Component<Props, State> {
  state = {
    productData: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const res: { products: Array<Product> } = await getAllProduct();
    this.setState({
      productData: res.products
    });
  };

  renderItem = ({ item }: { item: Product }) => (
    <View style={styles.rowContainer}>
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
    </View>
  );

  render() {
    const { productData } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={productData}
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

export default connect(mapStateToProps)(Menu);

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
