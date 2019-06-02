// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, measures } from '../../assets';
import type { Style } from '../../utils/typeDefinition';

export default ({ style }: { style: Style } = { style: {} }) => (
  <LinearGradient
    colors={colors.gradient}
    style={[styles.container, style]}
    end={{ x: 0, y: 0 }}
    start={{ x: 1, y: 0 }}
  />
);

const styles = StyleSheet.create({
  container: {
    height: measures.defaultUnit * 6,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 0
  }
});
