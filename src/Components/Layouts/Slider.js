// @flow
import React, { Component } from 'react';
import {
  View, TouchableOpacity, Image, StyleSheet
} from 'react-native';
import ImageSlider from 'react-native-image-slider';
import { colors, measures } from 'assets';

type Props = {
  images?: Array<any>,
};
type State = {};

export default class ComercialPanel extends Component<Props, State> {
  static defaultProps = {
    images: [
      require('assets/images/apple-products.jpg'),
      require('assets/images/medicine.jpg'),
      require('assets/images/perfume.jpg'),
    ]
  };

  render() {
    const { images } = this.props;
    return (
      <View style={{ height: '100%' }}>
        <ImageSlider
          loopBothSides
          autoPlayWithInterval={4000}
          images={images || []}
          customSlide={({ index, item, style }) => (
            // It's important to put style here because it's got offset inside
            <View key={index} style={[style, styles.customSlide]}>
              <Image source={item} style={styles.customImage} />
            </View>
          )}
          customButtons={(position, move) => (
            <View style={styles.buttons}>
              {(images || []).map((image, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  underlayColor="#ccc"
                  onPress={() => move(index)}
                  style={[styles.button, position === index && styles.buttonSelected]}
                />
              ))}
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -measures.marginMedium,
    marginBottom: measures.marginSmall,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    margin: measures.marginSmall,
    width: measures.defaultUnit * 1.5,
    height: measures.defaultUnit * 1.5,
    opacity: 0.9,
    borderRadius: measures.defaultUnit * 0.75,
    borderWidth: 1,
    borderColor: colors.white
  },
  buttonSelected: {
    backgroundColor: colors.white
  },
  customSlide: {
    backgroundColor: colors.defaultBackgroundColor
  },
  customImage: {
    width: '100%',
    height: '100%'
  }
});
