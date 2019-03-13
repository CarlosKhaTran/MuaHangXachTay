// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import type { Style } from '../../utils/typeDefinition';
import { colors, measures } from '../../assets';

type Props = {
  children?: ?Array<React$Node>,
  pad: ?boolean,
  style?: ?Style,
  haveKeyboard: boolean,
};
export default class Container extends Component<Props> {
  static defaultProps = {
    children: null,
    style: {},
  }

  onDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  containerStyle = () => {
    const { pad } = this.props;
    return pad ? { padding: measures.paddingMedium } : {};
  }

  render() {
    const { children, style, haveKeyboard } = this.props;
    return haveKeyboard ? (
      <TouchableWithoutFeedback style={styles.keyboardDismissView} onPress={this.onDismissKeyboard}>
        <View style={{ flex: 1 }}>
          <View
            style={[styles.container, this.containerStyle(), style]}
          >
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <View
        style={[styles.container, this.containerStyle(), style]}
      >
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyboardDismissView: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.defaultBackgroundColor,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'stretch',
  },
});
