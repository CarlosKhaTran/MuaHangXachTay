// @flow
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'Components/Widgets';
import { colors, measures, defaultStyles } from 'assets';

/* $FlowFixMe */
const Bell = React.memo(({ notiCount }: { notiCount: number }) => {
  switch (notiCount) {
    case 0:
      return (
        <View>
          <Icon name="bell" type="ent" color={colors.gray} />
        </View>
      );
    default:
      return (
        <View>
          <Icon name="bell" type="ent" color={colors.mango} />
          <View style={styles.bellIcon}>
            <Text style={styles.bagdeText}>{notiCount}</Text>
          </View>
        </View>
      );
  }
});

const mapDispatchToProps = ({ notiState }) => {
  const { notiList, seenList, deleteList } = notiState;
  return {
    notiCount: notiList.filter(item => !seenList[item.id] && !deleteList[item.id]).length
  };
};

export default connect(mapDispatchToProps)(Bell);
const styles = StyleSheet.create({
  bellIcon: {
    position: 'absolute',
    top: -measures.defaultUnit + 3,
    left: measures.defaultUnit * 2,
    width: measures.defaultUnit * 2,
    height: measures.defaultUnit * 2,
    borderRadius: measures.defaultUnit,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bagdeText: {
    ...defaultStyles.text,
    fontWeight: 'bold',
    fontSize: measures.fontSizeSmall,
    color: colors.rose
  }
});
