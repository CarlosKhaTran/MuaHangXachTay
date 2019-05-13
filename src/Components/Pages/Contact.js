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


export default class Contact extends Component<Props, State> {


    onBack = () => {
        const { navigation } = this.props;
        navigation.navigate({
            routeName: SCREENS.SHOP_MENU,
            key: SCREENS.SHOP_MENU,
        });
    }

    _pressCall = (phone) => {
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `tel://${phone}`;
        }
        else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            }).catch(err => console.log(err));
    };

    render() {
        return (
            <Container>
                <Header
                    title="LIÊN HỆ"
                    rightIcon={<Icon name="bell" type="ent" color={colors.mango} />}
                    handleLeftButton={this.onBack}
                />
                <View style={defaultStyles.center}>
                    <Image source={require('../../assets/images/ic_launcher.png')} style={styles.logo} />
                    <Text style={styles.title}>HTH: MUA HÀNG XÁCH TAY</Text>
                    <View style={styles.buttonView}>
                        <Button
                            style={styles.button}
                            title="Điện thoại"
                            onPress={() => { this._pressCall('+84363466087') }}
                        />
                        <Button
                            style={styles.button}
                            title="Webiste"
                        />
                    </View>
                </View>
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
