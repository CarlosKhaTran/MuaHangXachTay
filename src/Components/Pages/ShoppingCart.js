// @flow
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  InteractionManager
} from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import { NavigationScreenProp } from 'react-navigation';
import {
  Container, Header, ExtraHeader, Content, Row, Button, Icon
} from '../Widgets';
import {
  EditLayout
} from '../Layouts';
import { defaultStyles, measures, colors } from '../../assets';
import { SCREENS } from '../../routers';

type Props = {
  navigation: NavigationScreenProp<{}>,
};
type State = {
  fullName: string,
  phoneNumber: string,
  address: string,
  itemName: string,
  quantity: string,
  date: string,
  expectedPrice: string,
  editEnabled: boolean,
  updateConfig: Object
};

const editConfig: any = {
  fullName: {
    name: 'fullName',
    typeName: 'input',
    defaultValue: '',
  },
  address: {
    name: 'address',
    typeName: 'input',
    defaultValue: '',
  },
  phoneNumber: {
    name: 'phoneNumber',
    typeName: 'input',
    defaultValue: '',
    keyboardType: 'numeric',
  },
  itemName: {
    name: 'itemName',
    typeName: 'input',
    defaultValue: '',
  },
  quantity: {
    name: 'quantity',
    typeName: 'input',
    defaultValue: '',
    keyboardType: 'numeric',
  },
  date: {
    name: 'date',
    typeName: 'select',
    options: [{
      key: '1 tuần',
      value: '1 tuần',
    }, {
      key: '2 tuần',
      value: '2 tuần',
    }, {
      key: '3 tuần',
      value: '3 tuần',
    }, {
      key: '1 tháng',
      value: '1 tháng',
    }]
  },
  expectedPrice: {
    name: 'expectedPrice',
    typeName: 'input',
    defaultValue: '',
    keyboardType: 'numeric',
  },
};

export default class Home extends Component<Props, State> {
  state = {
    fullName: '',
    phoneNumber: '',
    itemName: '',
    quantity: '',
    date: '1/1/2019',
    expectedPrice: '',
    address: '',
    editEnabled: false,
    updateConfig: {}
  }

  onEnableEdit = (infoName: string) => {
    const { editEnabled } = this.state;
    const defaultValue = this.state[infoName];
    InteractionManager.runAfterInteractions(() => this.setState({
      editEnabled: !editEnabled,
      updateConfig: {
        ...editConfig[infoName],
        defaultValue,
      },
    }));
  };

  onProcess = () => { }

  onChangeValue = (infoName: string, value: string) => {
    this.setState(state => ({
      ...state,
      [infoName]: value,
    }));
  };

  onOpenNotification = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.NOTIFICATION,
      key: SCREENS.NOTIFICATION,
    });
  }

  render() {
    const {
      fullName,
      phoneNumber,
      itemName,
      quantity,
      expectedPrice,
      date,
      updateConfig,
      editEnabled,
      address
    } = this.state;
    return (
      <Container>
        <Header
          title="ĐƠN HÀNG"
          leftIcon={<Icon name="bell" type="ent" color={colors.white} />}
          handleLeftButton={this.onOpenNotification}
        />
        <View style={defaultStyles.fill}>
          <ExtraHeader />
          <ScrollView>
            <Transition appear="left">
              <Content>
                <Text style={styles.title}>THÔNG TIN CÁ NHÂN</Text>
                <Row
                  onPress={() => this.onEnableEdit('fullName')}
                  first
                  title="Họ tên"
                  placeHolder="Nguyen Van A"
                  value={fullName}
                  editEnabled
                />
                <Row
                  onPress={() => this.onEnableEdit('fullName')}
                  first
                  title="Số Điện Thoại"
                  placeHolder="0901000000"
                  value={phoneNumber}
                  editEnabled
                />
                <Row
                  onPress={() => this.onEnableEdit('address')}
                  first
                  title="Địa Chỉ"
                  placeHolder="Số nhà/ Đường/ Huyện (Quận), ..."
                  value={address}
                  editEnabled
                />
              </Content>
            </Transition>
            <Transition appear="right">
              <Content>
                <Text style={[styles.title, { marginTop: measures.marginMedium }]}>ĐƠN HÀNG</Text>
                <Row
                  onPress={() => this.onEnableEdit('itemName')}
                  first
                  title="Hàng cần mua"
                  placeHolder=""
                  value={itemName}
                  editEnabled
                />
                <Row
                  onPress={() => this.onEnableEdit('quantity')}
                  first
                  title="Số lượng"
                  placeHolder=""
                  value={quantity}
                  editEnabled
                />
              </Content>
            </Transition>
            <Transition appear="left">
              <Content>
                <Text style={[styles.title, { marginTop: measures.marginMedium }]}>
                  THÔNG TIN BỔ SUNG (Không bắt buộc)
                </Text>
                <Row
                  onPress={() => this.onEnableEdit('expectedPrice')}
                  first
                  title="Giá mong muốn"
                  placeHolder=""
                  value={expectedPrice}
                  editEnabled
                />
                <Row
                  onPress={() => this.onEnableEdit('date')}
                  first
                  title="Thời gian giao hàng"
                  placeHolder=""
                  value={date}
                  editEnabled
                />
              </Content>
            </Transition>
            <Button block title="Đặt Hàng" type="primary" onPress={this.onProcess} />
          </ScrollView>
        </View>
        {editEnabled
          && (
            <EditLayout
              config={updateConfig}
              onChangeValue={this.onChangeValue}
              onHide={this.onEnableEdit}
            />
          )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeMedium,
    color: colors.black,
    fontWeight: '500',
    marginLeft: measures.marginSmall,
  }
});
