import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Security Analysis',
    group: true,
  },{
    title: 'Contingencies',
    icon: 'nb-alert',
    link: '/pages/network-context/contingencies',
  },{
    title: 'Network contexts',
    icon: 'nb-keypad',
    link: '/pages/network-context/list',
  },
];
