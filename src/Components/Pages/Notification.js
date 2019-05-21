// @flow
import React, { Component } from 'react';
import {
  View, FlatList, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp } from 'react-navigation';
import {
  Container, Header, ExtraHeader, Icon
} from '../Widgets';
import { defaultStyles, measures, colors } from '../../assets';
import { SCREENS } from '../../routers';

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {
  notifications: Array<Noti>,
  deleteStore: { [string]: boolean },
  seenStore: { [string]: boolean }
};

type Noti = {
  product: string,
  id: string,
  number: string,
  type: 'NEW_PRODUCT' | 'BOOKING_SUCESS' | 'BOOKING_FALSE',
  seen: boolean,
  url: ?string,
  link: ?string
};

export default class Notification extends Component<Props, State> {
  state = {
    notifications: [],
    deleteStore: {},
    seenStore: {}
  };

  async componentDidMount() {
    const deleteStore = (await AsyncStorage.getItem('deleteStore')) || '{}';
    const seenStore = (await AsyncStorage.getItem('seenStore')) || '{}';
    this.setState(
      {
        deleteStore: JSON.parse(deleteStore),
        seenStore: JSON.parse(seenStore)
      },
      this.prepareData
    );
  }

  prepareData = async () => {
    const { navigation } = this.props;
    const allNoti = navigation.getParam('notifications');
    this.setState({
      notifications: allNoti
    });
  };

  onBack = () => {
    const { navigation } = this.props;
    navigation.navigate(SCREENS.SHOP_MENU)
  };

  getColor = (color: 'NEW_PRODUCT' | 'BOOKING_SUCESS' | 'BOOKING_FALSE') => {
    switch (color) {
      case 'NEW_PRODUCT':
        return colors.mango;
      case 'BOOKING_SUCESS':
        return colors.green;
      default:
        return colors.rose;
    }
  };

  onDelete = (item: Noti) => {
    const { deleteStore } = this.state;
    this.setState({
      deleteStore: {
        ...deleteStore,
        [item.id]: true
      }
    });
    AsyncStorage.setItem(
      'deleteStore',
      JSON.stringify({
        ...deleteStore,
        [item.id]: true
      })
    );
  };

  onOpen = (item: Noti) => {
    const { seenStore } = this.state;
    const { navigation } = this.props;
    const {
      product, number, url, link
    } = item;
    if (!item.seen) {
      this.setState({
        seenStore: {
          ...seenStore,
          [item.id]: true
        }
      });
      AsyncStorage.setItem(
        'seenStore',
        JSON.stringify({
          ...seenStore,
          [item.id]: true
        })
      );
    }
    navigation.navigate({
      routeName: SCREENS.PRODUCT,
      key: SCREENS.PRODUCT,
      params: {
        product,
        number,
        url,
        link
      }
    });
  };

  getIcon = (color: 'NEW_PRODUCT' | 'BOOKING_SUCESS' | 'BOOKING_FALSE') => {
    switch (color) {
      case 'NEW_PRODUCT':
        return <Icon size="small" name="shopping-bag" color={colors.white} type="fa" />;
      case 'BOOKING_SUCESS':
        return <Icon size="small" name="ios-done-all" color={colors.white} />;
      default:
        return <Icon size="small" name="warning" color={colors.white} type="fa" />;
    }
  };

  renderItem = ({ item, index }: { item: Noti, index: number }) => (
    <Swipeout
      backgroundColor={colors.transparent}
      autoClose
      right={[
        {
          text: 'Delete',
          backgroundColor: colors.transparent,
          color: colors.red,
          onPress: () => this.onDelete(item)
        }
      ]}
    >
      <TouchableOpacity
        style={[styles.rowContainer, index === 0 && { borderTopWidth: 0 }]}
        onPress={() => this.onOpen(item)}
      >
        <View style={styles.left}>
          <View style={[styles.middleLeft, { backgroundColor: this.getColor(item.type) }]}>
            {this.getIcon(item.type)}
          </View>
        </View>
        <View style={styles.middle}>
          <Text style={styles.notiTitle}>
            {item.product}
            {!item.seen && <Text style={styles.new}> (New)</Text>}
          </Text>
          <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
            {`${item.product} - ${item.number}`}
          </Text>
        </View>
        <View style={styles.right}>
          <Icon size="small" name="chevron-right" color={colors.gray} type="mdc" />
        </View>
      </TouchableOpacity>
    </Swipeout>
  );

  render() {
    const { notifications, deleteStore, seenStore } = this.state;
    const data = notifications
      .map(item => ({
        ...item,
        seen: seenStore[item.id] || false
      }))
      .filter(item => !deleteStore[item.id]);
    return (
      <Container>
        <Header title="THÔNG BÁO" handleLeftButton={this.onBack} />
        <View style={defaultStyles.fill}>
          <ExtraHeader />
          <FlatList
            contentContainerStyle={styles.content}
            data={data}
            renderItem={this.renderItem}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: measures.marginMedium,
    marginBottom: measures.marginMedium,
    backgroundColor: colors.white,
    ...defaultStyles.shadow
  },
  rowContainer: {
    height: measures.defaultUnit * 8,
    flexDirection: 'row',
    borderColor: colors.seperator,
    borderTopWidth: 0.5,
    paddingLeft: measures.paddingSmall
  },
  left: {
    width: measures.defaultUnit * 6,
    height: measures.defaultUnit * 6,
    ...defaultStyles.shadow,
    borderRadius: measures.defaultUnit * 3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white
  },
  middleLeft: {
    width: measures.defaultUnit * 5,
    height: measures.defaultUnit * 5,
    backgroundColor: colors.green,
    borderRadius: measures.defaultUnit * 2.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  middle: {
    flex: 1,
    marginLeft: measures.marginSmall,
    paddingVertical: measures.paddingSmall
  },
  right: {
    width: measures.defaultUnit * 4,
    height: measures.defaultUnit * 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notiTitle: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeMedium,
    color: colors.black,
    fontWeight: '500',
    marginBottom: measures.marginSmall
  },
  new: {
    color: colors.softRed,
    fontSize: measures.fontSizeMedium - 2
  },
  description: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeSmall,
    color: colors.black,
    fontWeight: '400'
  }
});
