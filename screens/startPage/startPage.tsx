import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import { useStartPageLogic } from '../../hooks/useStartPageLogic';
import styles from './Styles';
import fontSizes from '../../utils/font_sizes';
import { text } from '../../utils/text_placeholder';
import { NavigationProp } from '@react-navigation/native';

interface StartPageProps {
    navigation: NavigationProp<any>;
}

Icon.loadFont();

const StartPage: React.FC<StartPageProps> = ({ navigation }) => {
    const { phno, handlePhno, handleLogin, netInfo, isPhoneNumberValid } = useStartPageLogic(navigation);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="always">
                <View style={styles.logoContainer}>
                    <Text style={styles.sp_title}>{text.myApp}</Text>
                    <Text style={styles.sp_description}>{text.welcomeToMyApp}</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        testID="login_ph_no"
                        accessible
                        accessibilityLabel="login_ph_no"
                        placeholder={text.enterYourPhoneNumber}
                        onChangeText={handlePhno}
                        value={phno}
                        keyboardType="phone-pad"
                        editable
                        style={styles.sp_textInputLogin}
                    />
                    <Button
                        icon={<Icon name="login" size={fontSizes.small} color={isPhoneNumberValid ? 'white' : 'black'} />}
                        type="solid"
                        titleStyle={styles.loginButtonTitle}
                        disabledTitleStyle={styles.loginButtonDisabledTitle}
                        iconRight
                        buttonStyle={styles.loginButton}
                        containerStyle={styles.loginButtonContainer}
                        title={text.login}
                        disabled={!netInfo.isConnected || !isPhoneNumberValid}
                        onPress={handleLogin}
                    />
                </View>
            </ScrollView>

            {!netInfo.isConnected && <Text style={styles.noInternetText}>{text.noInternetConnection}</Text>}
        </SafeAreaView>
    );
};

export default StartPage;

