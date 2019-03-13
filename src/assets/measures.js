// @flow
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const measures: { [key: string]: number } = {
  defaultUnit: 8,
  marginLong: 24,
  marginMedium: 16,
  marginSmall: 8,
  marginTiny: 4,
  borderRadius: 8,
  fontSizeHuge: 30,
  fontSizeLarge: 16,
  fontSizeMedium: 14,
  fontSizeSmall: 12,
  fontSizeTiny: 12,
  paddingLong: 24,
  paddingMedium: 16,
  paddingSmall: 8,
  paddingTiny: 4,
  zero: 0,
  iconSizeSmall: 25,
  iconSizeMedium: 30,
  iconSizeLarge: 40,
  durationMedium: 300,
  durationShort: 200,
  durationLong: 400,
  headerHeight: 40,
  barHeight: 48,
  textAreaHeight: 100,
  width,
  height,
  borderWidth: 2,
  cameraBoxSize: 200,
  balanceHeaderHeight: 96,
};
export default measures;
