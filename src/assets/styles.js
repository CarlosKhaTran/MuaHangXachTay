import colors from './colors';
import measures from './measures';

export default {
  text: {
    fontFamily: 'Montserrat',
    color: colors.black,
  },
  number: {
    fontFamily: null,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fill: {
    flex: 1,
  },
  shadow: {
    shadowOpacity: 0.1,
    elevation: 2,
    borderRadius: measures.borderRadius,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
};
