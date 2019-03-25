// @flow
import React from 'react';
import _ from 'lodash';
import {
  View, StyleSheet, Text, TouchableOpacity
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
};

export default ({
  title, value, editEnabled, first, onPress, placeHolder, multiline, iconName
}: Props) => (
  <TouchableOpacity
    disabled={!editEnabled}
    onPress={onPress}
    style={[styles.row, first && { borderTopWidth: 0 }, multiline && styles.rowMultiline]}
  >
    <View style={defaultStyles.fill}>
      <Text style={styles.rowTitle}>{title}</Text>
      {_.isEmpty(value) ? (
        <Text style={styles.rowPlaceHolder}>{placeHolder}</Text>
      ) : (
        <Text ellipsizeMode="tail" style={styles.rowDetail}>{value}</Text>
      )}
    </View>
    {editEnabled && <Icon name={iconName || 'fountain-pen-tip'} type="mdc" color={colors.softRed} style={styles.icon} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    paddingRight: measures.paddingSmall,
    height: measures.defaultUnit * 7,
    width: '100%',
    paddingLeft: measures.paddingSmall,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
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
  },
  rowTitle: {
    ...defaultStyles.text,
    color: colors.primaryColor,
    fontSize: measures.fontSizeMedium - 1,
    marginLeft: measures.marginSmall,
    marginTop: measures.marginSmall,
  },
  rowPlaceHolder: {
    ...defaultStyles.text,
    color: colors.gray,
    fontSize: measures.fontSizeMedium,
    marginLeft: measures.marginSmall,
    marginTop: measures.marginSmall,
  },
  icon: {
    alignSelf: 'center',
  },
});
