// @flow
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { defaultStyles, measures, colors } from '../../assets';

type Props = {
  children: React$Node,
  scrollable: boolean,
}
export default class Content extends React.PureComponent<Props> {
  render() {
    const { children, scrollable } = this.props;
    return scrollable ? (
      <ScrollView contentContainerStyle={[styles.content, { flex: undefined }]}>
        {children}
      </ScrollView>
    ) : (
      <View style={styles.content}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingTop: measures.paddingMedium,
    paddingBottom: measures.paddingMedium,
    marginHorizontal: measures.marginMedium,
    marginBottom: measures.marginMedium,
    backgroundColor: colors.white,
    ...defaultStyles.shadow,
  },
});
