import ie from '../../assets/windowsIcons/ie.png';
import computerLarge from '../../assets/windowsIcons/676(32x32).png';
import notepadLarge from '../../assets/windowsIcons/327(32x32).png';
import paintLarge from '../../assets/windowsIcons/680(32x32).png';

import InternetExplorer from './InternetExplorer';
import MyComputer from './MyComputer';
import Notepad from './Notepad';
import Paint from './Paint';

export interface IIconState {
    id: number;
    icon: string;
    title: string;
    component: React.FC<any>;
    isFocus: boolean;
};

export const defaultIconState: IIconState[] = [
    {
        id: 0,
        icon: ie,
        title: 'Internet Explorer',
        component: InternetExplorer,
        isFocus: false,
    }, {
        id: 2,
        icon: computerLarge,
        title: 'My Computer',
        component: MyComputer,
        isFocus: false,
    }, {
        id: 3,
        icon: notepadLarge,
        title: 'Notepad',
        component: Notepad,
        isFocus: false,
    }, {
        id: 5,
        icon: paintLarge,
        title: 'Paint',
        component: Paint,
        isFocus: false,
    },
];
