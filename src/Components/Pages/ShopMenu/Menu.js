// @flow
import React from 'react';
import {
  View, StyleSheet, FlatList, Text, Image
} from 'react-native';
import type { Product } from 'utils/fakeData';
import { menuData } from 'utils/fakeData';
import { measures, defaultStyles, colors } from 'assets';

type Props = {};
type State = {};

const data: Array<Product> = menuData;

export default class Menu extends React.Component<Props, State> {
  renderItem = ({ item }: { item: Product }) => (
    <View style={styles.rowContainer}>
      <Image source={item.image} style={styles.image} />
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
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item: Product, index: number) => index.toString()}
        />
      </View>
    );
  }
}

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
