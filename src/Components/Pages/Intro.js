import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  BackHandler
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import SCREENS from '../../routers/screens';
import { measures, colors, defaultStyles } from '../../assets';
import { Icon } from '../Widgets';

type Props = {
  navigation: Object,
  data?: Array<{ image: any, intro: string, infoDetail: string }>
};

type State = {
  isCompleted: boolean
};

export default class Intro extends Component<Props, State> {
  static defaultProps: Props = {
    data: [
      {
        image: require('../../assets/images/fastService.png'),
        intro: 'Dịch vụ nhanh chóng',
        infoDetail: 'Mua hàng một cách nhanh chóng và thuận tiện nhất'
      },
      {
        image: require('../../assets/images/deal.png'),
        intro: 'Uy tín hàng đầu',
        infoDetail: 'Sự tin cậy luôn được chúng tôi đặt lên hàng đầu'
      },
      {
        image: require('../../assets/images/giftbox.png'),
        intro: 'Tiện ích bất ngờ',
        infoDetail: 'Chúng tôi sẽ mang đến cho bạn những tiện ích khuyến mãi bất ngờ và đầy hấp dẫn'
      }
    ]
  };

  state: State = {
    isCompleted: false
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => false;

  onMove = (move: Function, position: number): void => {
    const { data } = this.props;
    if (position === data.length - 1) {
      this.onSkip();
      return;
    }
    this.setState({
      isCompleted: position + 1 === data.length - 1
    });
    move(position + 1);
  };

  onSkip = () => {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: SCREENS.SHOP_MENU,
          key: SCREENS.SHOP_MENU
        })
      ]
    });
    navigation.dispatch(resetAction);
  };

  render() {
    const { isCompleted } = this.state;
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.slider}>
          <ImageSlider
            scrollEnabled
            style={styles.customSlider}
            images={data}
            customSlide={({ index, item, style }) => (
              <View key={index} style={[style, styles.customSlider]}>
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.customImage} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.introText}>{item.intro}</Text>
                  <Text style={styles.introDetailText}>{item.infoDetail}</Text>
                </View>
              </View>
            )}
            customButtons={(position, move) => (
              <View style={styles.buttons}>
                <View style={styles.skipContainer}>
                  <TouchableOpacity onPress={this.onSkip} style={styles.skipButton}>
                    <Text style={styles.skipText}>Skip</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.groupDots}>
                  {data.map((image, index) => (
                    <TouchableHighlight
                      key={index.toString()}
                      underlayColor="#ccc"
                      style={[styles.button, position === index && styles.buttonSelected]}
                    >
                      <View />
                    </TouchableHighlight>
                  ))}
                </View>
                <View style={styles.nextContainer}>
                  <TouchableOpacity onPress={() => this.onMove(move, position)}>
                    <Icon
                      name={!isCompleted ? 'rightcircle' : 'checkcircle'}
                      type="ant"
                      size="large"
                      color={!isCompleted ? undefined : colors.softRed}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.loadingBackground
  },
  slider: {
    flex: 1,
    marginTop: measures.height / 5
  },
  buttons: {
    marginTop: 0,
    marginBottom: measures.marginLong,
    marginHorizontal: measures.marginLong,
    height: measures.defaultUnit * 7,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    width: measures.defaultUnit,
    height: measures.defaultUnit,
    borderRadius: measures.borderRadius,
    marginHorizontal: 4,
    backgroundColor: '#909090',
    opacity: 0.9
  },
  buttonSelected: {
    opacity: 1,
    backgroundColor: colors.gray
  },
  customSlider: {
    backgroundColor: colors.loadingBackground
  },
  imageContainer: {
    marginHorizontal: measures.defaultUnit * 8
  },
  customImage: {
    width: '100%',
    resizeMode: 'contain',
    height: 300,
    backgroundColor: colors.lightGray,
    borderRadius: measures.borderRadius
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32
  },
  introText: {
    marginTop: 23,
    fontSize: 22,
    color: colors.black,
    fontWeight: '600',
    ...defaultStyles.text
  },
  introDetailText: {
    marginTop: 7.5,
    ...defaultStyles.text,
    fontSize: measures.fontSizeMedium,
    fontWeight: 'normal',
    color: colors.black,
    textAlign: 'center',
    flex: 1
  },
  skipText: {
    fontSize: measures.fontSizeMedium - 1,
    color: '#000000',
    opacity: 0.7
  },
  groupDots: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  skipContainer: {
    flex: 1
  },
  nextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center'
  },
  skipButton: {
    flex: 1,
    justifyContent: 'center',
    width: 50
  }
});
