//App component
//Entry point of the app
import 'react-native-gesture-handler';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import codePush from 'react-native-code-push';
import Toast from 'react-native-toast-message';
import { InitialScreen, LoggedInInitialScreen, ScreensWithoutHeader } from './utils/constants';
import { ScreenConfig } from './screens/screenConfig';
import { FavoriteProvider } from './contexts/FavoriteProvider';
import { useAppInitialization } from './hooks/useAppInitialization';
import { styles } from './appStyles';

type RootStackParamList = {
    [key: string]: undefined | { [key: string]: any };
};

const Stack = createStackNavigator<RootStackParamList>();

const revoPushOptions = {//OTA updates via revoposh (optional)
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
};

//App component
const App: React.FC = () => {
    const { isLoading, loggedInUserId } = useAppInitialization();

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="green" />
            </View>
        );
    }

    return (
        <FavoriteProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={loggedInUserId ? LoggedInInitialScreen : InitialScreen}>
                        {Object.values(ScreenConfig).map((s) =>
                            ScreensWithoutHeader.includes(s.name) ? (
                                <Stack.Screen
                                    key={s.name}
                                    name={s.name}
                                    component={s.component}
                                    options={{ headerShown: false }}
                                />
                            ) : (
                                <Stack.Screen key={s.name} name={s.name} component={s.component} />
                            )
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
                <Toast />
            </SafeAreaProvider>
        </FavoriteProvider>
    );
};

export default codePush(revoPushOptions)(App);

