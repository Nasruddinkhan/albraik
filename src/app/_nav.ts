import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'لوحة القيادة',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'المستعمل',
    url: '/users',
    icon: 'icon-people'
  },
  {
    name: 'Master / رئيس',
    url: '/master',
    icon: 'icon-people',
     children: [
       {
         name: 'Company',
         url: '/master/company',
         icon: 'fa fa-fw fa-cubes',
         
       },
       {
        name: 'Department',
        url: '/master/department',
        icon: 'fa fa-fw fa-cubes',
      },
      {
       name: 'Jobtitle',
       url: '/master/jobtitle',
       icon: 'fa fa-fw fa-cubes',
     },
     {
      name: 'Role',
      url: '/master/role',
      icon: 'fa fa-fw fa-cubes',
    },
    {
     name: 'User',
     url: '/master/user',
     icon: 'fa fa-fw fa-cubes',
   }
     ]
  },
  {
    name: 'Contact / إدارة الاتصال',
    url: '/contact',
    icon: 'icon-people'
  }
];
