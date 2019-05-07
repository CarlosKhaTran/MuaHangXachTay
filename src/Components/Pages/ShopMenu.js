// @flow
import React, { Component } from 'react';
import {
  View, BackHandler, AsyncStorage, Text, StyleSheet
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Container, Header, Icon } from '../Widgets';
import { defaultStyles, measures, colors } from '../../assets';
import { SCREENS } from '../../routers';
import { getAllNoti } from '../../api';
// import console = require('console');

type Noti = {
  id: string,
  product: string,
  number: string,
  seen: boolean,
  type: 'NEW_PRODUCT' | 'BOOKING_SUCESS' | 'BOOKING_FALSE',
  url?: string,
  link?: string
};
type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {
  notiCount: number,
  index: number,
  routes: Array<{title: string, key: string }>,
  notifications: Array<Noti>
};

const FirstRoute = () => <View />;
const SecondRoute = () => <View />;

export default class ShoppingCart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.didFocusSubscription = props.navigation.addListener('didFocus', () => BackHandler.addEventListener('hardwareBackPress', this.handleBackPress));
  }

  state: State = {
    notiCount: 0,
    notifications: [],
    index: 0,
    routes: [{ key: 'first', title: 'MENU' }, { key: 'second', title: 'YÊU CẦU' }]
  };

  componentWillUnmount() {
    if (this.didFocusSubscription) this.didFocusSubscription.remove();
    if (this.willBlurSubscription) this.willBlurSubscription.remove();
  }

  getNoti = async () => {
    const allNoti: Array<Noti> = await getAllNoti();
    const notifications = allNoti.map((item: Noti) => ({
      ...item,
      type: 'NEW_PRODUCT'
    }));
    const deleteStore = (await AsyncStorage.getItem('deleteStore')) || '{}';
    const seenStore = (await AsyncStorage.getItem('seenStore')) || '{}';
    const notiCount = allNoti.filter(
      item => !JSON.parse(seenStore)[item.id] && !JSON.parse(deleteStore)[item.id]
    ).length;
    this.setState({
      notifications,
      notiCount
    });
  };

  handleBackPress = () => false;

  onChangeValue = (infoName: string, value: string) => {
    this.setState(state => ({
      ...state,
      [infoName]: value,
      [`${infoName}Error`]: false
    }));
  };

  onOpenNotification = () => {
    const { navigation } = this.props;
    const { notifications } = this.state;
    navigation.navigate({
      routeName: SCREENS.NOTIFICATION,
      key: SCREENS.NOTIFICATION,
      params: {
        notifications
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
            <View
              style={{
                position: 'absolute',
                top: -measures.defaultUnit + 3,
                left: measures.defaultUnit * 2,
                width: measures.defaultUnit * 2,
                height: measures.defaultUnit * 2,
                borderRadius: measures.defaultUnit,
                backgroundColor: colors.lightGray,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  ...defaultStyles.text,
                  fontWeight: 'bold',
                  fontSize: measures.fontSizeSmall,
                  color: colors.rose
                }}
              >
                {notiCount}
              </Text>
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

  render() {
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
          navigationState={this.state}
          // $FlowIgnore: suppressing this error
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute
          })}
          renderTabBar={this.renderTabBar}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: measures.width }}
          style={styles.body}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    marginTop: -20,
  },
});
