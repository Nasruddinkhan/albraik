import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'لوحة القيادة',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },  
   {
    name: 'لوحة القيادة',
    url: '/registercompany',
    icon: 'icon-star'
  },
  {
    name: 'المستعمل',
    url: '/users',
    icon: 'icon-people'
  }
  /* {
    name: 'الصفحات',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  } */
];
