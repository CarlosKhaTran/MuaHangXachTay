/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppState, DeviceEventEmitter } from 'react-native';
import { Notify } from './Components/Global';
import Initial from './routers';

type Props = {};
type State = {};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    DeviceEventEmitter.addListener('deviceResume', this.onAppResume);
    DeviceEventEmitter.addListener('devicePause', this.onAppPause);
    AppState.addEventListener('change', this.onAppStateChange);
  }

  componentDidMount() { }

  onAppStateChange = (currentAppState: typeof AppState) => {
    console.log('_onAppStateChange', currentAppState);
  };

  onAppResume = () => {
    console.log('onAppResume');
  };

  onAppPause = () => {
    console.log('onAppPause');
  };

  render() {
    return (
      [<Initial key="main" />, <Notify.Component key="notify" />]
    );
  }
}
