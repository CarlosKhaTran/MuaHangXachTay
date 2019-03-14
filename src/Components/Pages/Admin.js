// @flow
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  InteractionManager,
  Image,
  TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
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
  itemName: string,
  price: string,
  editEnabled: boolean,
  updateConfig: Object,
  image: ?{
    uri: string,
  },
};

const editConfig: any = {
  itemName: {
    name: 'itemName',
    typeName: 'input',
    defaultValue: '',
  },
  price: {
    name: 'price',
    typeName: 'input',
    defaultValue: '',
    keyboardType: 'numeric',
  },
};

export default class Admin extends Component<Props, State> {
  state = {
    itemName: '',
    price: '',
    image: null,
    editEnabled: false,
    updateConfig: {},
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

  onSelectImage = async () => {
    const image: { path: string } = await ImagePicker.openPicker({
      multiple: false
    });
    this.setState({
      image: {
        uri: image.path,
      }
    });
  }

  render() {
    const {
      itemName,
      price,
      updateConfig,
      editEnabled,
      image,
    } = this.state;
    return (
      <Container>
        <Header
          title="ĐƠN HÀNG"
          rightIcon={<Icon name="bell" type="ent" color={colors.mango} />}
          handleRightButton={this.onOpenNotification}
        />
        <View style={defaultStyles.fill}>
          <ExtraHeader />
          <ScrollView>
            <Transition appear="left">
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
                  onPress={() => this.onEnableEdit('price')}
                  first
                  title="Giá"
                  placeHolder=""
                  value={price}
                  editEnabled
                />
              </Content>
            </Transition>
            <Transition appear="right">
              <Content>
                <TouchableOpacity onPress={this.onSelectImage}>
                  <Text style={[styles.title, { marginTop: measures.marginMedium }]}>
                    {'HÌNH ẢNH '}
                    <Icon name="ios-camera" color={colors.blue} />
                  </Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                  <Image source={image || require('../../assets/images/default_image.jpg')} style={styles.image} />
                </View>
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
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: measures.borderRadius,
  },
  imageContainer: {
    marginVertical: measures.marginSmall,
    width: measures.width - 4 * measures.marginMedium,
    height: (measures.width - 4 * measures.marginMedium) * 2 / 3,
    ...defaultStyles.shadow,
    alignSelf: 'center',
  }
});
