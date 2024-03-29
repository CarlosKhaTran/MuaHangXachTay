import { Platform } from 'react-native';
import colors from './colors';

export default {
  text: {
    fontFamily: Platform.select({
      ios: 'Quicksand',
      android: 'Quicksand-Medium'
    }),
    color: colors.black
  },
  number: {
    fontFamily: null
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  fill: {
    flex: 1
  },
  shadow: {}
};
