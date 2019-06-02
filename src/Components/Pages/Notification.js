// @flow
import React, { Component } from 'react';
import {
  View, FlatList, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { NavigationScreenProp } from 'react-navigation';
import {
  Container, Header, ExtraHeader, Icon
} from 'Components/Widgets';
import { defaultStyles, measures, colors } from 'assets';
import { SCREENS } from 'routers';
import { actions } from 'state';
import { Bell } from 'Components/Layouts';

type Props = {
  navigation: NavigationScreenProp<{}>,
  notiList: Array<Noti>,
  seenList: { [string]: boolean },
  deleteList: { [string]: boolean },
  seenNoti: (id: string) => void,
  deleteNoti: (id: string) => void
};
type State = {};

type Noti = {
  product: string,
  id: string,
  number: string,
  type: 'NEW_PRODUCT' | 'BOOKING_SUCESS' | 'BOOKING_FALSE',
  seen: boolean,
  url: ?string,
  link: ?string
};

export class Notification extends Component<Props, State> {
  onBack = () => {
    const { navigation } = this.props;
    navigation.navigate(SCREENS.SHOP_MENU);
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

  onOpen = (item: Noti) => {
    const { navigation, seenNoti } = this.props;
    const {
      product, number, url, link
    } = item;
    seenNoti(item.id);
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
          onPress: () => this.props.deleteNoti(item.id)
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

  handleRightButton = () => {}

  render() {
    const { notiList, deleteList, seenList } = this.props;
    const data = notiList
      .map(item => ({
        ...item,
        seen: seenList[item.id] || false
      }))
      .filter(item => !deleteList[item.id]);
    return (
      <Container>
        <Header title="THÔNG BÁO" handleLeftButton={this.onBack} rightIcon={<Bell />} handleRightButton={this.handleRightButton} />
        <View style={defaultStyles.fill}>
          <ExtraHeader />
          <FlatList
            contentContainerStyle={styles.content}
            data={data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({ notiState }) => ({
  notiList: notiState.notiList,
  seenList: notiState.seenList,
  deleteList: notiState.deleteList
});

const mapDispatchToProps = (dispatch: Function) => ({
  seenNoti: (id: string) => dispatch(actions.seenNoti(id)),
  deleteNoti: (id: string) => dispatch(actions.deleteNoti(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

const styles = StyleSheet.create({
  content: {
    marginHorizontal: measures.marginMedium,
    marginBottom: measures.marginMedium,
    backgroundColor: colors.white,
    borderRadius: measures.borderRadius,
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
