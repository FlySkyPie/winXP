import iePaper from '../../assets/windowsIcons/ie-paper.png';
import computer from '../../assets/windowsIcons/676(16x16).png';

import InternetExplorer from './InternetExplorer';
import MyComputer from './MyComputer';

const gen = () => {
    let id = -1;
    return (): number => {
        id += 1;
        return id;
    };
};
const genId = gen();
const genIndex = gen();

interface IAppState {
    component: React.FC<any>;

    header: {
        title: string;
        icon: string;
    };

    defaultSize: {
        width: number;
        height: number;
    };

    defaultOffset: {
        x: number;
        y: number;
    };

    resizable: boolean;
    minimized: boolean;
    maximized: boolean;

    id: number;
    zIndex: number;

    [key: string]: unknown;
}

export const defaultAppState: IAppState[] = [
    {
        component: InternetExplorer,
        header: {
            title: 'Internet Explorer',
            icon: iePaper,
        },
        defaultSize: {
            width: 700,
            height: 500,
        },
        defaultOffset: {
            x: 130,
            y: 20,
        },
        resizable: true,
        minimized: false,
        maximized: window.innerWidth < 800,
        id: genId(),
        zIndex: genIndex(),
    },
    {
        component: MyComputer,
        header: {
            title: 'My Computer',
            icon: computer,
        },
        defaultSize: {
            width: 660,
            height: 500,
        },
        defaultOffset: {
            x: 250,
            y: 40,
        },
        resizable: true,
        minimized: false,
        maximized: window.innerWidth < 800,
        id: genId(),
        zIndex: genIndex(),
    },
];