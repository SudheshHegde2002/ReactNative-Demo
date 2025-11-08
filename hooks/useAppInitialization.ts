import { useEffect, useState } from 'react';
import { getSignedInUser } from '../utils/auth_utils';

interface UseAppInitializationReturn {
    isLoading: boolean;
    loggedInUserId: string;
}

export const useAppInitialization = (): UseAppInitializationReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loggedInUserId, setLoggedInUserId] = useState<string>('');

    useEffect(() => {
        const setupInitialState = async (): Promise<void> => {
            try {
                const userId = await getSignedInUser();
                setLoggedInUserId(userId || '');
            } catch (error) {
                console.error('Error setting up initial state:', error);
            } finally {
                setIsLoading(false);
            }
        };

        setupInitialState();
    }, []);

    return { isLoading, loggedInUserId };
};

