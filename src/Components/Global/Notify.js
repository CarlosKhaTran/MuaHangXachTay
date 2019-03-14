import React, { Component } from 'react';
import DropdownAlert from 'react-native-dropdownalert';

let instance = null;
class InAppNotifyComp extends Component {
  constructor(props) {
    super(props);
    instance = this;
    instance.state = {
      closeInterval: 4000,
    };
  }

  show(type, title, message, closeInterval = 4000) {
    this.setState({ closeInterval }, () => this.dropdown.alertWithType(type, title, message));
  }

  render() {
    return (
      <DropdownAlert
        errorColor="rgba(233,28,28,0.95)"
        successColor="rgba(79,188,129,0.95)"
        messageStyle={{ color: '#fff', fontSize: 12, fontFamily: 'Montserrat-Regular' }}
        defaultTextContainer={{ padding: 2 }}
        imageStyle={{ width: 40, height: 40, resizeMode: 'contain' }}
        errorImageSrc={require('../../assets/images/error.png')}
        ref={(ref) => { this.dropdown = ref; }}
        useNativeDriver
        closeInterval={this.state.closeInterval}
      />
    );
  }
}

const InAppNotify = {
  Component: InAppNotifyComp,
  show(type, title, message, closeInterval) {
    if (instance) {
      instance.show(type, title, message, closeInterval);
    }
  },
};

export default InAppNotify;
