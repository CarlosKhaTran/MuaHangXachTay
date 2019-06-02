// @flow
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, FlatList
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import {
  Container, Header, ExtraHeader, Content
} from '../Widgets';
import { defaultStyles, measures } from '../../assets';
import { SCREENS } from '../../routers';

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {};

const rules = [
  {
    title: 'Điều 1: Quy tắc sử dụng',
    content:
      'Các hoạt động giao dịch trên ứng dụng phải dựa trên nguyên tắc ôn hòa, lịch sự văn hóa. Ứng xử giữa người mua và người bán phải phù hợp với thuần phong mỹ tục của người dân Việt Nam. Khi có bất kì tranh chấp nào xảy ra giữa những người dùng ứng dụng với nhau chúng tôi sẽ giải quyết dựa trên quy tắc đạo đức. Với mọi hành vi gây xúc phạm đến danh dự, nhân phẩm của người dùng đều không được chấp nhận trên ứng dụng MuaHangXachTay.'
  },
  {
    title: 'Điều 2: Quy định chung cho người dùng',
    content:
      'Người dùng tại MuaHangXachTay phải từ 18 tuổi trở lên. Nếu bạn chưa đủ 18 tuổi, bạn cần có sự giám sát của người bảo hộ hợp pháp khi tham gia mọi hoạt động giao dịch trên ứng dụng MuaHangXachTay. Người giám sát sẽ chịu hoàn toàn trách nhiệm trước pháp luật đối với các hành vi vi phạm của bạn.'
  },
  {
    title: 'Điều 3: Sản phẩm và hành vi nghiêm cấm',
    content:
      'Mọi hoạt động giao dịch trên ứng dụng MuaHangXachTay phải dựa trên quy định của pháp luật. Nghiêm cấm đăng bán các sản phẩm nằm trong phạm vi cấm buôn bán của Pháp Luật Việt Nam.  Nghiêm cấm mọi hành vi lừa đảo trên ứng dụng MuaHangXachTay. Nghiêm cấm các hoạt động đăng tin quảng cáo cho các doanh nghiệp khác.'
  },
  {
    title: 'Điều 4: Thương hiệu và bản quyền',
    content:
      'Tất cả nội dung thông tin, hành ảnh, thông tin phần mềm, các bản thiết kế, đồ họa, đều thuộc quyền quản lí của MuaHangXachTay. Nghiêm cấm mọi hành vi sử dụng hình ảnh, thông tin, cơ sở dữ liệu của MuaHangXachTay. Mọi hành vi vi phạm sẽ chịu trách nhiệm theo quy định của Pháp Luật Việt Nam.'
  }
];
export default class Setting extends Component<Props, State> {
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
        <Header title="ĐIỀU KHOẢN SỬ DỤNG" handleLeftButton={this.onBack} />
        <View style={defaultStyles.fill}>
          <ExtraHeader />
          <Content fill>
            <FlatList
              data={rules}
              renderItem={({ item }) => (
                <View style={defaultStyles.center}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.rowTitle}>{item.content}</Text>
                </View>
              )}
              keyExtractor={item => item.title}
            />
          </Content>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  title: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeLarge - 1,
    fontWeight: 'bold',
    marginTop: 10
  },
  rowTitle: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeMedium + 1,
    fontWeight: '100',
    marginLeft: 20,
    marginRight: 20
  }
});
