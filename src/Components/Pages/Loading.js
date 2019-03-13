// @flow
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import LottieView from 'lottie-react-native';
import { Container } from '../Widgets';
import { measures, colors } from '../../assets';
import { SCREENS } from '../../routers';

type Props = {
  navigation: NavigationScreenProp<{}>,
  // isReady: boolean,
};
type State = {
};

export default class LoadingPage extends Component<Props, State> {
  state = {
  }

  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(() => {
      navigation.navigate({
        routeName: SCREENS.INTRO,
        key: SCREENS.INTRO,
      });
    }, 3000);
  }

  componentWillUnmount() {
    this.lottie.reset();
  }

  onLoadDone = () => {

  };

  navigate = (screenName: string) => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: screenName,
      key: screenName,
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
            style={{}}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: colors.loadingBackground,
  },
  animatedView: {
    height: 100,
    width: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  welcome: {
    fontSize: measures.fontSizeLarge,
    marginBottom: 10 * measures.marginLong,
    fontWeight: '500',
    alignSelf: 'center',
  },
});
