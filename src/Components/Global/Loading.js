import React, { PureComponent } from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';
import { colors, defaultStyles, measures } from '../../assets';

let instance = null;
class LoadingComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    instance = this;
  }

  hide() {
    this.setState({
      show: false,
    });
  }

  show() {
    const { show } = this.state;
    if (!show) {
      this.setState({
        show: true,
      });
    }
  }

  animation: any

  render() {
    const { show } = this.state;
    if (!show) {
      return null;
    }
    return (
      <View style={styles.container}>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={styles.lottie}
          source={require('../../assets/loading.json')}
          autoPlay
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.overlay,
    zIndex: 2,
  },
  lottie: {
    transform: [{ scale: 0.8 }],
  },
  waitingText: {
    ...defaultStyles.text,
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    fontSize: measures.fontSizeLarge * 1.2,
    color: colors.lookup,
  },
});

const Loading = {
  Component: LoadingComponent,
  show() {
    if (instance !== null) {
      instance.show();
    }
  },
  hide() {
    if (instance !== null) {
      instance.hide();
    }
  },
};

export default Loading;
