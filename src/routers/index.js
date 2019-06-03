// @flow
import { createFluidNavigator } from 'react-navigation-fluid-transitions';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import * as pages from '../Components/Pages';
import * as layouts from '../Components/Layouts';
import SCREENS from './screens';
import { measures } from '../assets';

export { default as SCREENS } from './screens';

const stack = createFluidNavigator(
  {
    [SCREENS.LOADING]: {
      screen: pages.Loading
    },
    [SCREENS.ADMIN]: {
      screen: pages.Admin
    },
    [SCREENS.SHOPPING_CART]: {
      screen: pages.ShoppingCart
    },
    [SCREENS.INTRO]: {
      screen: pages.Intro
    },
    [SCREENS.NOTIFICATION]: {
      screen: pages.Notification
    },
    [SCREENS.ADMIN_LOGIN]: {
      screen: pages.AdminLogin
    },
    [SCREENS.PRODUCT]: {
      screen: pages.Product
    },
    [SCREENS.SHOP_MENU]: {
      screen: pages.ShopMenu
    },
    [SCREENS.SUPPORT]: {
      screen: pages.Support
    },
    [SCREENS.CONTACT]: {
      screen: pages.Contact
    },
    [SCREENS.SETTING]: {
      screen: pages.Setting
    },
    [SCREENS.REGISTER]: {
      screen: pages.Register
    },
    [SCREENS.LOG_IN]: {
      screen: pages.LogIn
    },
    [SCREENS.PROFILE]: {
      screen: pages.Profile
    }
  },
  {
    headerMode: 'none',
    navigationOptions: { gesturesEnabled: false }
  }
);

const drawerConfig = {
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerPosition: 'left',
  drawerToggleRoute: 'DrawerToggle',
  drawerLockMode: 'locked-closed',
  drawerWidth: measures.width * 0.8,
  contentComponent: layouts.Drawer
};

export default createAppContainer(
  createDrawerNavigator(
    {
      MainScreen: {
        screen: stack
      }
    },
    drawerConfig
  )
);
