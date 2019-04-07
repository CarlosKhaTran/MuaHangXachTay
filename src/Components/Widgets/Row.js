/* eslint-disable no-nested-ternary */
// @flow
import React from 'react';
import _ from 'lodash';
import {
  View, StyleSheet, Text, TouchableOpacity,
  TextInput
} from 'react-native';
import Icon from './Icon';
import { measures, colors, defaultStyles } from '../../assets';

type Props = {
  title: string,
  value: string,
  editEnabled: boolean,
  first: boolean,
  onPress: Function,
  placeHolder: string,
  multiline: boolean,
  iconName: ?string,
  adjustable: ?boolean,
  keyboardType: string,
  onAdjust: ?Function,
  type: string,
  error: boolean,
  name: string,
  onChangeValue: Function,
};
const renderAdjustButton = (onAdjust: Function, name: string) => (
  <View style={styles.adjustButtonContainer}>
    <TouchableOpacity style={[defaultStyles.fill, { alignItem: 'center' }]} onPress={() => onAdjust(name, true)}>
      <Icon type="ant" name="caretup" size={15} color={colors.gray} />
    </TouchableOpacity>
    <TouchableOpacity style={[defaultStyles.fill, { justifyContent: 'flex-end' }]} onPress={() => onAdjust(name, false)}>
      <Icon type="ant" name="caretdown" size={15} color={colors.gray} />
    </TouchableOpacity>
  </View>
);
export default ({
  title, value, editEnabled, first,
  onPress, placeHolder, multiline, iconName, adjustable, type, onAdjust,
  onChangeValue,
  keyboardType,
  error,
  name,
}: Props) => (
  <TouchableOpacity
    disabled={!editEnabled || !onPress}
    onPress={onPress}
    style={[styles.row, first && { borderTopWidth: 0 }, multiline && styles.rowMultiline]}
  >
    <View style={defaultStyles.fill}>
      <Text style={[styles.rowTitle, error && { color: colors.red }]}>{title}</Text>
      {(() => {
        switch (type) {
          case 'select':
            return _.isEmpty(value) ? (
              <Text
                style={[styles.rowPlaceHolder, { marginVertical: measures.marginSmall }]}
              >
                {placeHolder}
              </Text>
            ) : (
              <Text ellipsizeMode="tail" style={styles.rowDetail}>{value}</Text>
            );
          default:
            return editEnabled ? (
              <TextInput
                placeholder={placeHolder}
                style={styles.textInput}
                onChangeText={(str: string) => onChangeValue(name, str)}
                value={value}
                keyboardType={keyboardType}
              />
            )
              : (<Text style={styles.textInput}>{value}</Text>);
        }
      })()
    }
    </View>
    {!adjustable ? (editEnabled ? <Icon name={iconName || 'fountain-pen-tip'} type="mdc" color={colors.softRed} style={styles.icon} /> : null) : renderAdjustButton(onAdjust, name)}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    paddingRight: measures.paddingSmall,
    paddingVertical: measures.paddingSmall,
    width: '100%',
    paddingLeft: measures.paddingSmall,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.seperator,
    flexDirection: 'row',
  },
  rowMultiline: {
    height: measures.defaultUnit * 17,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rowDetail: {
    ...defaultStyles.text,
    color: colors.black,
    fontSize: measures.fontSizeMedium,
    marginLeft: measures.marginSmall,
    marginTop: measures.marginSmall,
    marginBottom: measures.marginSmall,
  },
  rowTitle: {
    ...defaultStyles.text,
    color: colors.primaryColor,
    fontSize: measures.fontSizeMedium - 1,
    marginLeft: measures.marginSmall,
    marginTop: measures.marginSmall,
  },
  textInput: {
    ...defaultStyles.text,
    color: colors.black,
    fontSize: measures.fontSizeMedium,
    marginLeft: measures.marginSmall,
    marginTop: measures.marginSmall,
    paddingVertical: 0,
  },
  icon: {
    alignSelf: 'center',
  },
  adjustButtonContainer: {
    width: 30,
    marginTop: measures.marginMedium,
  },
});
