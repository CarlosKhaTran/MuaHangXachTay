// @flow
import { createFluidNavigator } from 'react-navigation-fluid-transitions';
import { createAppContainer } from 'react-navigation';
import * as pages from '../Components/Pages';
import SCREENS from './screens';

export { default as SCREENS } from './screens';

export default createAppContainer(createFluidNavigator(
  {
    [SCREENS.LOADING]: {
      screen: pages.Loading,
    },
    [SCREENS.INTRO]: {
      screen: pages.Intro,
    },
    [SCREENS.SHOPPING_CART]: {
      screen: pages.ShoppingCart,
    },
    [SCREENS.NOTIFICATION]: {
      screen: pages.Notification,
    },
    [SCREENS.ADMIN_LOGIN]: {
      screen: pages.AdminLogin,
    },
    [SCREENS.ADMIN]: {
      screen: pages.Admin,
    },
    [SCREENS.PRODUCT]: {
      screen: pages.Product,
    }
  },
  {
    headerMode: 'none',
    navigationOptions: { gesturesEnabled: false },
  }
));
