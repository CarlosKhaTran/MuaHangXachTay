// @flow
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Container, Header, Icon } from 'Components/Widgets';
import { defaultStyles, measures, colors } from 'assets';
import SCREENS from 'routers/screens';
import Menu from './Menu';
import ShoppingCart from './ShoppingCart';

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {
  notiCount: number,
  index: number,
  routes: Array<{ title: string, key: string }>
};

export default class ShopMenu extends Component<Props, State> {
  state: State = {
    notiCount: 0,
    index: 0,
    routes: [{ key: 'first', title: 'MENU' }, { key: 'second', title: 'YÊU CẦU' }]
  };

  Menu = <Menu />;

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

  renderBell = () => {
    const { notiCount } = this.state;
    switch (notiCount) {
      case 0:
        return (
          <View>
            <Icon name="bell" type="ent" color={colors.gray} />
          </View>
        );
      default:
        return (
          <View>
            <Icon name="bell" type="ent" color={colors.mango} />
            <View style={styles.bellIcon}>
              <Text style={styles.bagdeText}>{notiCount}</Text>
            </View>
          </View>
        );
    }
  };

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
      style={{ backgroundColor: colors.transparent, height: 40 }}
    />
  );

  renderTabView = () => SceneMap({
    first: () => this.Menu,
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
          rightIcon={this.renderBell()}
          handleRightButton={this.onOpenNotification}
        />
        <View style={styles.body} />
        <TabView
          navigationState={{
            index,
            routes
          }}
          lazy
          /* $FlowFixMe */
          renderScene={this.renderTabView()}
          renderTabBar={this.renderTabBar}
          onIndexChange={idx => this.setState({ index: idx })}
          initialLayout={{ width: measures.width }}
          style={styles.body}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    marginTop: -20
  },
  bellIcon: {
    position: 'absolute',
    top: -measures.defaultUnit + 3,
    left: measures.defaultUnit * 2,
    width: measures.defaultUnit * 2,
    height: measures.defaultUnit * 2,
    borderRadius: measures.defaultUnit,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bagdeText: {
    ...defaultStyles.text,
    fontWeight: 'bold',
    fontSize: measures.fontSizeSmall,
    color: colors.rose
  }
});
