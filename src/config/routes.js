import Game from '@/components/pages/Game';
import MainMenu from '@/components/pages/MainMenu';
import VictoryScreen from '@/components/pages/VictoryScreen';

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
  }
};

export const routeArray = Object.values(routes);
export default routes;