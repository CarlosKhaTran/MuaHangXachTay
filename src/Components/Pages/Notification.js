// @flow
import React, { Component } from 'react';
import {
  View, FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import { Transition } from 'react-navigation-fluid-transitions';
import { NavigationScreenProp } from 'react-navigation';
import {
  Container, Header, ExtraHeader, Icon
} from '../Widgets';
import { defaultStyles, measures, colors } from '../../assets';

type Props = {
  navigation: NavigationScreenProp<{}>,
};
type State = {

};

type Noti = {
  title: string,
  description: string,
  type: 'NEW_PRODUCT' | 'BOOKING_SUCESS' | 'BOOKING_FALSE',
  seen: boolean,
}

const data: Array<Noti> = [{
  title: 'Giày chạy bộ',
  description: 'Giày Addidas ultra bosst 5.0 màu đen size 42',
  type: 'NEW_PRODUCT',
  seen: false
}, {
  title: 'Iphone Xs max',
  description: 'Điện thoại iphone xs max 256 Gb, 2 sim vật lý quốc tế',
  type: 'NEW_PRODUCT',
  seen: true
}, {
  title: 'Iphone Ipad',
  description: 'Ipad pro 9.7 inch like new (99%)',
  type: 'NEW_PRODUCT',
  seen: false
}, {
  title: 'Đặt hàng thành công',
  description: 'Đặt hàng sản phẩm XXXXX thành công',
  type: 'BOOKING_SUCESS',
  seen: true
}, {
  title: 'Đặt hàng thất bại',
  description: 'Đặt hàng sản phẩm yyyyy thất bại',
  type: 'BOOKING_FALSE',
  seen: true
}, {
  title: 'Iphone Ipad',
  description: 'Ipad pro 9.7 inch like new (99%)',
  type: 'NEW_PRODUCT',
  seen: false
}, {
  title: 'Đặt hàng thành công',
  description: 'Đặt hàng sản phẩm XXXXX thành công',
  type: 'BOOKING_SUCESS',
  seen: true
}, {
  title: 'Đặt hàng thất bại',
  description: 'Đặt hàng sản phẩm yyyyy thất bại',
  type: 'BOOKING_FALSE',
  seen: true
}];

export default class Notification extends Component<Props, State> {
  state = {
  }

  length = data.length

  onBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  getColor = (color: 'NEW_PRODUCT' | 'BOOKING_SUCESS' | 'BOOKING_FALSE') => {
    switch (color) {
      case 'NEW_PRODUCT':
        return colors.mango;
      case 'BOOKING_SUCESS':
        return colors.green;
      default:
        return colors.rose;
    }
  }

  getIcon = (color: 'NEW_PRODUCT' | 'BOOKING_SUCESS' | 'BOOKING_FALSE') => {
    switch (color) {
      case 'NEW_PRODUCT':
        return <Icon size="small" name="shopping-bag" color={colors.white} type="fa" />;
      case 'BOOKING_SUCESS':
        return <Icon size="small" name="ios-done-all" color={colors.white} />;
      default:
        return <Icon size="small" name="warning" color={colors.white} type="fa" />;
    }
  }

  renderItem = ({ item, index }: { item: Noti, index: number }) => (
    <View style={[styles.rowContainer, index === 0 && { borderTopWidth: 0 }]}>
      <View style={styles.left}>
        <View style={[styles.middleLeft, { backgroundColor: this.getColor(item.type) }]}>
          {this.getIcon(item.type)}
        </View>
      </View>
      <View style={styles.middle}>
        <Text style={styles.notiTitle}>
          {item.title}
          {!item.seen && <Text style={styles.new}> (New)</Text>}
        </Text>
        <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
          {item.description}
        </Text>
      </View>
      <TouchableOpacity style={styles.right}>
        <Icon size="small" name="chevron-right" color={colors.gray} type="mdc" />
      </TouchableOpacity>
    </View>
  )


  render() {
    return (
      <Container>
        <Header
          title="THÔNG BÁO"
          handleLeftButton={this.onBack}
        />
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

const styles = StyleSheet.create({
  content: {
    paddingBottom: measures.paddingMedium,
    marginHorizontal: measures.marginMedium,
    marginBottom: measures.marginMedium,
    backgroundColor: colors.white,
    ...defaultStyles.shadow,
  },
  rowContainer: {
    height: measures.defaultUnit * 8,
    flexDirection: 'row',
    borderColor: colors.seperator,
    borderTopWidth: 0.5,
    paddingLeft: measures.paddingSmall,
  },
  left: {
    width: measures.defaultUnit * 6,
    height: measures.defaultUnit * 6,
    ...defaultStyles.shadow,
    borderRadius: measures.defaultUnit * 3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
  },
  middleLeft: {
    width: measures.defaultUnit * 5,
    height: measures.defaultUnit * 5,
    backgroundColor: colors.green,
    borderRadius: measures.defaultUnit * 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flex: 1,
    marginLeft: measures.marginSmall,
    paddingVertical: measures.paddingSmall,
  },
  right: {
    width: measures.defaultUnit * 4,
    height: measures.defaultUnit * 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notiTitle: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeMedium,
    color: colors.black,
    fontWeight: '500',
    marginBottom: measures.marginSmall,
  },
  new: {
    color: colors.softRed,
    fontSize: measures.fontSizeMedium - 2,
  },
  description: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeSmall,
    color: colors.black,
    fontWeight: '400',

  },
});
