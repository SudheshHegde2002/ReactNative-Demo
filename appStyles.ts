import { StyleSheet, ViewStyle } from 'react-native';

interface AppStyles {
    loadingContainer: ViewStyle;
}

export const styles = StyleSheet.create<AppStyles>({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

