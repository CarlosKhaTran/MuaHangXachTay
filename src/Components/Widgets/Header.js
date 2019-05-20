// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Animated,
  Keyboard,
  Image,
  Platform
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Transition } from 'react-navigation-fluid-transitions';
import { SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Icon from './Icon';
import { measures, colors, defaultStyles } from '../../assets';

type Props = {
  handleLeftButton?: ?Function,
  handleRightButton?: ?Function,
  handleSecretAction?: ?Function,
  title?: ?string,
  leftIcon?: ?React$Node,
  rightIcon?: ?React$Node,
  onfocusSearch: ?Function,
  onBlurSearch: ?Function,
  onChangeSearchText: Function,
  isTransparent: boolean,
  anim?: boolean
};
type State = {
  keyboardOpen: boolean,
  buttonAnimation: Animated.Value
};

export default class Header extends Component<Props, State> {
  static defaultProps = {
    handleLeftButton: undefined,
    handleRightButton: undefined,
    title: 'MISSING TITLE',
    leftIcon: undefined,
    anim: false,
    rightIcon: undefined,
    handleSecretAction: () => {}
  };

  state = {
    keyboardOpen: false,
    buttonAnimation: new Animated.Value(0)
  };

  componentDidMount() {
    // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onBlurSearch);
  }

  onBlurSearch = () => {
    const { onBlurSearch } = this.props;
    if (onBlurSearch) {
      onBlurSearch();
    }
    this.setState({ keyboardOpen: false });
    Keyboard.dismiss();
  };

  keyboardDidHideListener: any;

  renderSearchbar = () => {
    const { buttonAnimation, keyboardOpen } = this.state;
    const { onfocusSearch, onChangeSearchText, onBlurSearch } = this.props;
    Animated.timing(buttonAnimation, {
      toValue: keyboardOpen ? measures.defaultUnit * 7 : 0,
      duration: 300
    }).start();
    return (
      <View style={styles.searchBarContainer}>
        <View style={styles.searchTextInput}>
          <Icon name="ios-search" style={styles.icon} size="small" color={colors.gray} />
          <TextInput
            style={styles.textInput}
            onFocus={() => {
              this.setState({ keyboardOpen: !keyboardOpen });
              if (onfocusSearch) {
                onfocusSearch();
              }
            }}
            onChangeText={onChangeSearchText}
            placeholder="Search"
          />
        </View>
        <Animated.View style={[styles.cancelbutton, { width: buttonAnimation }]}>
          <TouchableOpacity
            style={{ justifyContent: 'center', flex: 1 }}
            onPress={() => {
              if (onBlurSearch) {
                onBlurSearch();
              }
              this.setState({ keyboardOpen: !keyboardOpen });
              Keyboard.dismiss();
            }}
          >
            <Text numberOfLines={1} style={styles.cancelText}>
              Huỷ
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  render() {
    const {
      handleLeftButton,
      title,
      leftIcon,
      handleRightButton,
      rightIcon,
      isTransparent,
      handleSecretAction,
      anim
    } = this.props;
    const titleText = (
      <View style={styles.middle}>
        <Text style={styles.title} onPress={handleSecretAction}>
          {title}
        </Text>
      </View>
    );
    return (
      <View
        style={[
          styles.container,
          DeviceInfo.hasNotch() && {
            height: measures.defaultUnit * 18,
          }
        ]}
      >
        <SafeAreaView />
        <LinearGradient
          colors={!isTransparent ? colors.gradient : ['#fff', '#fff']}
          style={styles.gradient}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
        >
          <Image source={require('../../assets/images/plane.png')} style={styles.airPlane} />
        </LinearGradient>
        <View style={{ height: measures.defaultUnit * 10 }}>
          <View style={styles.content}>
            <View style={styles.left}>
              {handleLeftButton && (
                <TouchableOpacity style={styles.leftButton} onPress={handleLeftButton}>
                  {leftIcon === undefined ? (
                    <Icon
                      name="ios-arrow-back"
                      size={30}
                      color={isTransparent ? colors.gray : 'white'}
                    />
                  ) : (
                    leftIcon
                  )}
                </TouchableOpacity>
              )}
            </View>
            {anim ? <Transition appear="top">{titleText}</Transition> : titleText}
            <View style={styles.right}>
              {handleRightButton && (
                <TouchableOpacity style={styles.leftButton} onPress={handleRightButton}>
                  {rightIcon}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: measures.defaultUnit * 15,
    backgroundColor: colors.primaryColor,
    zIndex: 0
  },
  searchBarContainer: {
    flex: 1,
    padding: measures.paddingSmall,
    flexDirection: 'row'
  },
  searchTextInput: {
    backgroundColor: colors.white,
    borderRadius: measures.borderRadius,
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: measures.paddingSmall,
    marginLeft: measures.marginSmall
  },
  textInput: {
    flex: 1,
    marginLeft: measures.marginSmall
  },
  content: {
    flex: 1,
    // paddingTop: measures.paddingSmall + 4,
    flexDirection: 'row'
  },
  left: {
    width: measures.defaultUnit * 6,
    justifyContent: 'center',
    paddingLeft: measures.paddingMedium
  },
  right: {
    width: measures.defaultUnit * 6,
    justifyContent: 'center'
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradient: {
    height: '100%',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 0
  },
  title: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeLarge + 4,
    fontWeight: '600',
    fontFamily: Platform.select({
      ios: 'Montserrat',
      android: 'Montserrat-SemiBold'
    }),
    color: colors.white
  },
  cancelText: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeMedium,
    color: colors.white,
    alignSelf: 'center'
  },
  icon: {
    alignSelf: 'center'
  },
  cancelbutton: {
    height: measures.defaultUnit * 5,
    paddingLeft: measures.paddingSmall
  },
  airPlane: {
    height: '100%',
    width: '100%',
    marginLeft: -50,
    opacity: 0.2,
    resizeMode: 'contain'
  }
});
