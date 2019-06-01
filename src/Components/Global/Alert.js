// @flow

import React, { Component } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { colors } from 'assets';

let instance = null;

type Props = {};

type State = {
  showAlert: boolean,
  title: string,
  message: string
};

class AlertPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    instance = this;
    instance.state = {
      showAlert: false,
      title: '',
      message: ''
    };
  }

  show = (title: string, message: string) => {
    this.setState({
      showAlert: true,
      title,
      message
    });
  };

  hide = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    const { showAlert, title, message } = this.state;
    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside
        closeOnHardwareBackPress={false}
        showConfirmButton
        confirmText="Okay"
        confirmButtonColor={colors.red}
        onCancelPressed={() => {
          this.hide();
        }}
        onConfirmPressed={() => {
          this.hide();
        }}
      />
    );
  }
}

const InAppNotify = {
  Component: AlertPage,
  show(title: string, message: string) {
    if (instance) {
      instance.show(title, message);
    }
  },
  hide() {
    if (instance) {
      instance.hide();
    }
  }
};

export default InAppNotify;
