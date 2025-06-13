import Game from '@/components/pages/Game';
import MainMenu from '@/components/pages/MainMenu';
import VictoryScreen from '@/components/pages/VictoryScreen';
import HowToPlay from '@/components/pages/HowToPlay';
import Settings from '@/components/pages/Settings';

export const routes = {
  mainMenu: {
    id: 'mainMenu',
    label: 'Main Menu',
    path: '/menu',
    icon: 'Home',
    component: MainMenu
  },
  game: {
    id: 'game',
    label: 'Game',
    path: '/game',
    icon: 'Map',
    component: Game
  },
victory: {
    id: 'victory',
    label: 'Victory',
    path: '/victory',
    icon: 'Trophy',
    component: VictoryScreen
  },
  howToPlay: {
    id: 'howToPlay',
    label: 'How to Play',
    path: '/tutorial',
    icon: 'BookOpen',
    component: HowToPlay
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: Settings
  }
};

export const routeArray = Object.values(routes);
export default routes;