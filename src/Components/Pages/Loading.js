// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, StackActions, NavigationActions } from 'react-navigation';
import LottieView from 'lottie-react-native';
import { Container } from 'Components/Widgets';
import { measures, colors } from 'assets';
import { SCREENS } from 'routers';
import { actions } from 'state';

type Props = {
  navigation: NavigationScreenProp<{}>,
  initApp: () => void
  // isReady: boolean,
};
type State = {};

export class LoadingPage extends Component<Props, State> {
  state = {};

  async componentDidMount() {
    const { navigation, initApp } = this.props;
    const notFirstTime = await AsyncStorage.getItem('notFirstTime');
    initApp();
    setTimeout(() => {
      if (notFirstTime) {
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
      } else {
        navigation.navigate({
          routeName: SCREENS.INTRO,
          key: SCREENS.INTRO
        });
      }
    }, 2000);
    AsyncStorage.setItem('notFirstTime', 'true');
  }

  componentWillUnmount() {
    this.lottie.reset();
  }

  onLoadDone = () => {};

  navigate = (screenName: string) => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: screenName,
      key: screenName
    });
  };

  lottie: any;

  render() {
    return (
      <Container showBackground={false} style={styles.container}>
        <View style={{ height: '100%', width: '100%' }}>
          <LottieView
            ref={(lottie) => {
              this.lottie = lottie;
            }}
            source={require('../../assets/images/shoppingCart.json')}
            loop
            autoPlay
            style={{ transform: [{ scale: 0.8 }] }}
          />
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  initApp: () => dispatch(actions.initApp())
});

export default connect(
  null,
  mapDispatchToProps
)(LoadingPage);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: colors.loadingBackground
  },
  animatedView: {
    height: 100,
    width: 100
  },
  image: {
    width: '100%',
    height: '100%'
  },
  welcome: {
    fontSize: measures.fontSizeLarge,
    marginBottom: 10 * measures.marginLong,
    fontWeight: '500',
    alignSelf: 'center'
  }
});
