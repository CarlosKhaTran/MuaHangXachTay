// @flow
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  Container, Header, Icon, ExtraHeader
} from 'Components/Widgets';
import { defaultStyles, measures, colors } from 'assets';
import { Bell } from 'Components/Layouts';
import SCREENS from 'routers/screens';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';

type Props = {
  navigation: NavigationScreenProp<{}>,
  notiCount: number
};
type State = {
  index: number,
  routes: Array<{ title: string, key: string }>
};

export default class ShopMenu extends Component<Props, State> {
  state: State = {
    index: 0,
    routes: [{ key: 'first', title: 'MENU' }, { key: 'second', title: 'YÊU CẦU' }]
  };

  MenuPage = <ProductList />;

  onOpenNotification = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.NOTIFICATION,
      key: SCREENS.NOTIFICATION,
      params: {
        notifications: []
      }
    });
  };

  openDrawer = () => {
    const { navigation } = this.props;
    navigation.toggleDrawer();
  };

  didFocusSubscription: any;

  willBlurSubscription: any;

  renderMenu = () => (
    <View>
      <Icon name="hamburger" type="mdc" color={colors.white} />
    </View>
  );

  renderTabBar = (props: Object) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      labelStyle={{ fontWeight: 'bold' }}
      style={{
        backgroundColor: colors.lightPrimaryColor,
        height: measures.defaultUnit * (!DeviceInfo.hasNotch() ? 6 : 8)
      }}
    />
  );

  renderTabView = () => SceneMap({
    first: () => this.MenuPage,
    second: () => <ShoppingCart navigation={this.props.navigation} />
  });

  render() {
    const { index, routes } = this.state;
    return (
      <Container>
        <Header
          leftIcon={this.renderMenu()}
          handleLeftButton={this.openDrawer}
          title="Hand To Hand"
          rightIcon={<Bell />}
          handleRightButton={this.onOpenNotification}
        />
        <View style={defaultStyles.fill}>
          <ExtraHeader />

          <TabView
            navigationState={{
              index,
              routes
            }}
            lazy
            tabBarPosition="bottom"
            /* $FlowFixMe */
            renderScene={this.renderTabView()}
            renderTabBar={this.renderTabBar}
            onIndexChange={idx => this.setState({ index: idx })}
            initialLayout={{ width: measures.width }}
            style={styles.body}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    marginTop: -20
  },
});
