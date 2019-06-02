// @flow
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { hasNotch } from 'utils/common';
import { defaultStyles, measures, colors } from 'assets';

type Props = {
  children: React$Node,
  scrollable: boolean,
  fill: boolean,
  style: any
};
export default class Content extends React.PureComponent<Props> {
  render() {
    const {
      children, scrollable, fill, style
    } = this.props;
    return scrollable ? (
      <ScrollView contentContainerStyle={[styles.content, { flex: undefined }]}>
        {children}
      </ScrollView>
    ) : (
      <View style={[styles.content, { flex: fill ? 1 : undefined }, style]}>{children}</View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingTop: measures.paddingMedium,
    paddingBottom: measures.paddingMedium,
    marginHorizontal: measures.marginMedium,
    borderRadius: measures.borderRadius,
    marginBottom: hasNotch ? measures.marginLong : measures.marginMedium,
    backgroundColor: colors.contentBackground,
    ...defaultStyles.shadow
  }
});
