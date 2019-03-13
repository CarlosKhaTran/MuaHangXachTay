// @flow
import React, { Component } from 'react';
import {
  View, TouchableOpacity, StyleSheet, TextInput, Text
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { colors, defaultStyles, measures } from '../../assets';
import { Icon, Button } from '../Widgets';

type Props = {
  onHide: Function,
  onChangeValue: (infoName: string, value: string) => void,
  config: {
    name: string,
    typeName: 'input' | 'select' | 'date' | 'inputMultiline',
    placeHolder?: string,
    defaultValue: string,
    keyboardType?: string,
    options?: Array<{ key: string, value: string }>,
  },
};
type State = {
  updateValue: string,
};

export default class EditLayout extends Component<Props, State> {
  state = (() => {
    const { config } = this.props;
    return {
      updateValue: config.defaultValue,
    };
  })()

  onChangeValue = (value: string) => {
    this.setState({
      updateValue: value,
    });
  };

  onSelect = (key: string) => {
    const { config, onChangeValue, onHide } = this.props;
    onChangeValue(config.name, key);
    onHide();
  };

  onConfirm = () => {
    const { config, onChangeValue, onHide } = this.props;
    const { updateValue } = this.state;
    onChangeValue(config.name, updateValue);
    onHide();
  }

  renderContent = (): React$Node => {
    const { updateValue } = this.state;
    const { config, onHide } = this.props;
    switch (config.typeName) {
      case 'input':
        return (
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                autoFocus
                value={updateValue}
                placeholder={config.placeHolder}
                placeholderTextColor={colors.gray}
                style={styles.input}
                onChangeText={this.onChangeValue}
                keyboardType={config.keyboardType}
              />
              <Icon name="cancel" type="md" size={15} onPress={() => this.onChangeValue('')} />
            </View>
            <View style={styles.footer}>
              <View style={defaultStyles.fill}>
                <Button
                  type="secondary"
                  top={measures.defaultUnit}
                  block
                  onPress={onHide}
                  title="Cancel"
                  height={36}
                />
              </View>
              <View style={defaultStyles.fill}>
                <Button onPress={this.onConfirm} type="primary" top={measures.defaultUnit} block title="Done" height={36} />
              </View>
            </View>
          </View>
        );
      case 'inputMultiline':
        return (
          <View style={[styles.inputContainer, { height: measures.defaultUnit * 20 }]}>
            <View style={styles.inputWrapper}>
              <TextInput
                autoFocus
                multiline
                value={updateValue}
                placeholder={config.placeHolder}
                placeholderTextColor={colors.gray}
                style={styles.input}
                onChangeText={this.onChangeValue}
                keyboardType={config.keyboardType}
              />
              <Icon name="cancel" type="md" size={15} onPress={() => this.onChangeValue('')} />
            </View>
            <View style={[styles.footer, { flex: 0.7 }]}>
              <View style={defaultStyles.fill}>
                <Button
                  type="secondary"
                  top={measures.defaultUnit}
                  block
                  onPress={onHide}
                  title="Cancel"
                  height={36}
                />
              </View>
              <View style={defaultStyles.fill}>
                <Button onPress={this.onConfirm} type="primary" top={measures.defaultUnit} block title="Done" height={36} />
              </View>
            </View>
          </View>
        );
      case 'date':
        return (
          <DateTimePicker
            isVisible
            date={new Date(updateValue)}
            onConfirm={this.onConfirm}
            onCancel={onHide}
            onDateChange={this.onChangeValue}
          />
        );
      case 'select':
        return (
          <View style={styles.picker}>
            <View style={styles.pickerHeader}>
              <Icon name="select-arrows" type="ent" size={15} />
              <Text style={styles.title}>Hãy lựa chọn giá trị</Text>
            </View>
            <View>
              {config.options
                && config.options.map((option: { key: string, value: string }) => (
                  <TouchableOpacity
                    key={option.key}
                    style={styles.row}
                    onPress={() => this.onSelect(option.key)}
                  >
                    <Text style={styles.option}>{option.value}</Text>
                    <Icon
                      name={
                        option.key === config.defaultValue
                          ? 'ios-radio-button-on'
                          : 'ios-radio-button-off'
                      }
                      color={colors.blue}
                      size={20}
                    />
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        );
      default:
        return <View />;
    }
  };

  render() {
    const { onHide } = this.props;
    return (
      <View style={[styles.container]}>
        <TouchableOpacity onPress={onHide} style={defaultStyles.fill} />
        {this.renderContent()}
        <KeyboardSpacer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
  },
  inputContainer: {
    height: measures.defaultUnit * 14,
    backgroundColor: 'white',
    padding: measures.paddingSmall,
  },
  inputWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: colors.lightPrimaryColor,
    borderBottomWidth: 0.5,
  },
  input: {
    ...defaultStyles.text,
    fontSize: measures.fontSizeMedium + 2,
    color: colors.black,
    flex: 1,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
  },
  picker: {
    backgroundColor: colors.white,
  },
  pickerHeader: {
    paddingHorizontal: measures.paddingMedium,
    flexDirection: 'row',
    paddingVertical: measures.paddingSmall,
    backgroundColor: colors.silver,
  },
  title: {
    ...defaultStyles.text,
    marginLeft: measures.marginSmall,
    fontSize: measures.fontSizeMedium,
    color: colors.black,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: measures.paddingMedium,
    paddingVertical: measures.paddingSmall,
    borderBottomColor: colors.seperator,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  option: {
    ...defaultStyles.text,
    marginLeft: measures.marginSmall,
    fontSize: measures.fontSizelarge,
    color: colors.black,
    fontWeight: '300',
  },
});
