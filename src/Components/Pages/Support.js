// @flow
import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
    Platform,
    Alert
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import {
    Container, Header, ExtraHeader, Content, Row, Button, Icon
} from '../Widgets';
import { defaultStyles, measures, colors } from '../../assets';
import { SCREENS } from '../../routers';

type Props = {
    navigation: NavigationScreenProp<{}>
};
type State = {};


export default class Support extends Component<Props, State> {


    onBack = () => {
        const { navigation } = this.props;
        navigation.navigate({
            routeName: SCREENS.SHOP_MENU,
            key: SCREENS.SHOP_MENU,
        });
    }

    render() {
        return (
            <Container>
                <Header
                    title="ĐIỀU KHOẢN DỊCH VỤ"
                    rightIcon={<Icon name="bell" type="ent" color={colors.mango} />}
                    handleLeftButton={this.onBack}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        ...defaultStyles.text,
        fontSize: measures.fontSizeMedium,
        color: colors.black,
        fontWeight: '500',
        marginLeft: measures.marginSmall,
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    button: {
        width: 100,
        height: 50
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 20
    },
    title: {
        ...defaultStyles.text,
        fontSize: measures.fontSizeLarge - 1,
        fontWeight: 'bold',
        marginTop: 10
    },
    row: {
        paddingHorizontal: measures.paddingSmall,
        borderTopWidth: 1,
        borderColor: colors.seperator,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: measures.paddingSmall
    },
    left: {
        width: measures.defaultUnit * 6,
        justifyContent: 'center',
        paddingLeft: measures.paddingSmall
    },
    rowTitle: {
        ...defaultStyles.text,
        fontSize: measures.fontSizeMedium + 1,
        fontWeight: '100'
    },
    right: {
        width: measures.defaultUnit * 6,
        justifyContent: 'center',
        paddingRight: measures.paddingSmall
    },
});
