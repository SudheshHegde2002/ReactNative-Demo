//Authentication utilities

import EncryptedStorage from 'react-native-encrypted-storage';
import { getUserId, storeUserDetails } from './data_utils';

interface UserDetails {
    phno: string;
    [key: string]: any;
}

//Get the signed in user
export const getSignedInUser = async (): Promise<string | null> => {
    return await fetchStoredUserId();
};

//Sign in the user
export const signIn = async (phno: string): Promise<boolean> => {
    try {
        const user_id = await getUserId(phno);
        if (user_id === null || user_id === undefined || user_id === -1) {
            console.log(user_id === -1 ? 'User does not exist' : 'Could not login the user');
            return false;
        }
        await storeUserId(user_id, phno);
        if ((await fetchStoredUserId()) === user_id) {
            console.log('Successfully logged in the user');
            return true;
        } else {
            console.log('Could not login the user - storage fetch failure');
        }
    } catch (e) {
        console.log('Exception verifying with cloud ' + e);
    }
    return false;
};

//Sign up the user
export const signUp = async (userDetails: UserDetails): Promise<boolean> => {
    try {
        if (await storeUserDetails(userDetails)) {
            return await signIn(userDetails.phno);
        }
    } catch (e) {
        console.log('storeUserDetails', e);
    }
    return false;
};

//Store the user id
export const storeUserId = async (user_id: string, phno: string): Promise<boolean> => {
    try {
        await EncryptedStorage.setItem('user_id', user_id);
        return true;
    } catch (e) {
        console.log("exception storing user id and hashed phone number: ", e);
        return false;
    }
};

//Fetch the stored user id
export const fetchStoredUserId = async (): Promise<string | null> => {
    try {
        return await EncryptedStorage.getItem('user_id');
    } catch (e) {
        return null;
    }
};

