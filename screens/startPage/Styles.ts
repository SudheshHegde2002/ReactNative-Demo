import { StyleSheet, Dimensions, TextStyle, ViewStyle } from 'react-native';
import { fontSizes, max } from '../../utils/font_sizes'; //font_size utils does not exit, its referenced as an example

interface StartPageStyles {
    safeArea: ViewStyle;
    scrollContainer: ViewStyle;
    logoContainer: ViewStyle;
    inputContainer: ViewStyle;
    sp_title: TextStyle;
    sp_description: TextStyle;
    sp_textInputLogin: TextStyle;
    loginButton: ViewStyle;
    loginButtonContainer: ViewStyle;
    loginButtonTitle: TextStyle;
    loginButtonDisabledTitle: TextStyle;
    noInternetText: TextStyle;
}

const styles = StyleSheet.create<StartPageStyles>({
    safeArea: {
        height: Dimensions.get('window').height,
    },
    scrollContainer: {
        height: '100%',
    },
    logoContainer: {
        alignSelf: 'center',
        paddingTop: '20%',
    },
    inputContainer: {
        marginTop: 10,
    },
    sp_title: {
        fontSize: fontSizes.xlarge,
        fontWeight: '400',
        color: '#000000',
        textAlign: 'center',
    },
    sp_description: {
        marginTop: 8,
        textAlign: 'center',
        fontSize: fontSizes.medium,
        fontWeight: '400',
        color: '#333333',
    },
    sp_textInputLogin: {
        marginTop: 5,
        padding: 10,
        borderRadius: 5,
        borderColor: 'green',
        borderWidth: 2,
        width: '80%',
        height: max(50, fontSizes.xlarge),
        alignSelf: 'center',
    },
    loginButton: {
        width: '80%',
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: 'green',
    },
    loginButtonContainer: {
        marginTop: 10,
    },
    loginButtonTitle: {
        fontSize: fontSizes.small,
        color: 'white',
    },
    loginButtonDisabledTitle: {
        color: 'black',
        fontSize: fontSizes.small,
    },
    noInternetText: {
        color: '#741b47',
        textAlign: 'center',
        marginBottom: 170,
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 5,
    },
});

export default styles;

