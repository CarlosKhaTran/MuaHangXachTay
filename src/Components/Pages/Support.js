// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Icon } from '../Widgets';
import { defaultStyles, colors, measures } from '../../assets';
import { SCREENS } from '../../routers';

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {};

const step = [
  {
    title: 'Tìm kiếm và lựa chọn hàng hoá'
  },
  {
    title: 'Tạo và gửi đơn hàng đến chúng thôi'
  },
  {
    title: 'Đơn hàng sẽ được gọi lại xác nhận trong 1/2 ngày làm việc'
  },
  {
    title: 'Sản phẩm được vận chuyển về Việt Nam'
  },
  {
    title: 'Sản phẩm được giao, thanh toán và hoàn tất'
  }
];

const rowColors: Array<string> = ['#ffa600', '#ff6361', '#bc5090', '#58508d', '#003f5c', '#008153'];

export default class Support extends Component<Props, State> {
  onBack = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.SHOP_MENU,
      key: SCREENS.SHOP_MENU
    });
  };

  render() {
    return (
      <Container>
        <Header
          title="HỖ TRỢ"
          rightIcon={<Icon name="bell" type="ent" color={colors.mango} />}
          handleLeftButton={this.onBack}
        />
        <View
          style={defaultStyles.fill}
          // source={require('assets/images/instruction.jpg')}
          imageStyle={styles.image}
        >
          <View style={styles.background}>
            <View style={styles.header}>
              <Text style={styles.title}>HƯỚNG DẪN</Text>
              <Text style={styles.bigTitle}>QUY TRÌNH ĐẶT HÀNG</Text>
            </View>
            <ScrollView>
              {step.map((item, idx) => (
                <View key={idx.toString()} style={defaultStyles.shadow}>
                  <View style={[styles.row, { backgroundColor: rowColors[idx] }]}>
                    <View style={styles.stepContainer}>
                      <Text style={[styles.number, { color: rowColors[idx] }]}>{idx + 1}</Text>
                    </View>
                    <View style={defaultStyles.fill}>
                      <Text style={styles.rowContent}>{item.title}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  header: {
    paddingHorizontal: measures.paddingMedium,
    paddingTop: measures.paddingMedium
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    opacity: 0.7
  },
  title: {
    ...defaultStyles.text,
    fontWeight: '500',
    color: colors.black,
    fontSize: measures.fontSizeMedium,
    marginBottom: measures.marginSmall
  },
  bigTitle: {
    ...defaultStyles.text,
    fontWeight: '400',
    color: colors.gray,
    marginBottom: measures.marginSmall,
    fontSize: measures.large
  },
  row: {
    height: measures.defaultUnit * 8,
    borderTopRightRadius: measures.defaultUnit * 4,
    borderBottomRightRadius: measures.defaultUnit * 4,
    marginVertical: measures.marginSmall,
    marginRight: measures.marginMedium,
    marginLeft: measures.defaultUnit * 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: measures.defaultUnit
  },
  stepContainer: {
    height: measures.defaultUnit * 6,
    width: measures.defaultUnit * 6,
    backgroundColor: colors.white,
    borderRadius: measures.defaultUnit * 3,
    marginLeft: -measures.defaultUnit * 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  number: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeLarge + 7,
    fontWeight: 'bold'
  },
  rowContent: {
    marginLeft: measures.marginMedium,
    ...defaultStyles.text,
    color: colors.white
  },
  rowBound: { borderLeftWidth: 1, marginLeft: measures.marginMedium }
});
