//Screen configuration

import StartPage from './startPage/startPage';
import { ScreenNames } from '../utils/constants';
import { ComponentType } from 'react';

interface ScreenConfigItem {
    name: string;
    component: ComponentType<any>;
}

interface ScreenConfigType {
    [key: string]: ScreenConfigItem;
}

export const ScreenConfig: ScreenConfigType = {
    StartPage: { name: ScreenNames.StartPageScreenName, component: StartPage },
};

