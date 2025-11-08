//Constants for the screens

//Screen names
export const ScreenNames = {
    StartPageScreenName: 'Home',
    LandingPageScreenName: 'My demo app',
} as const;

//Screens without header
export const ScreensWithoutHeader: readonly string[] = [
    ScreenNames.StartPageScreenName,
    ScreenNames.LandingPageScreenName,
];

//Initial screen
export const InitialScreen: string = ScreenNames.StartPageScreenName;
export const LoggedInInitialScreen: string = ScreenNames.LandingPageScreenName;
export const phoneLength: number = 10;

