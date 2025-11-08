import { useEffect, useState } from 'react';
import { getSignedInUser, signIn } from '../utils/auth_utils';
import { gotoLandingPage } from '../utils/navigation_utils';
import { useNetInfo } from '@react-native-community/netinfo';
import { ScreenNames, phoneLength } from '../utils/constants';
import { NavigationProp } from '@react-navigation/native';

interface UseStartPageLogicReturn {
    phno: string;
    handlePhno: (phval: string) => void;
    handleLogin: () => Promise<void>;
    netInfo: ReturnType<typeof useNetInfo>;
    isPhoneNumberValid: boolean;
}

type NavigationType = NavigationProp<any>;

export const useStartPageLogic = (navigation: NavigationType): UseStartPageLogicReturn => {
    const netInfo = useNetInfo();
    const [userId, setUserId] = useState<string>('');
    const [phno, setPhno] = useState<string>('');

    const handleLogin = async (): Promise<void> => {
        try {
            if (await signIn(phno)) {
                setUserId(phno);
                gotoLandingPage(navigation);
            } else {
                const loginScreenName = (ScreenNames as Record<string, string>).LoginPageScreenName || ScreenNames.LandingPageScreenName;
                navigation.navigate(loginScreenName, { phno });
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    useEffect(() => {
        const checkUser = async (): Promise<void> => {
            try {
                const user_id = await getSignedInUser();
                if (user_id && user_id.length > 1) {
                    gotoLandingPage(navigation);
                }
            } catch (error) {
                console.error('Error checking user:', error);
            }
        };
        checkUser();
    }, [navigation, userId]);

    const handlePhno = (phval: string): void => {
        const ph_no_patt = /^[0-9]{0,10}$/;
        if (phval.match(ph_no_patt)) setPhno(phval);
    };

    const isPhoneNumberValid = phno.length === phoneLength;

    return { phno, handlePhno, handleLogin, netInfo, isPhoneNumberValid };
};

