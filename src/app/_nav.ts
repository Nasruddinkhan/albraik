import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'لوحة القيادة',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'المستعمل / Add User',
    url: '/users',
    icon: 'icon-people'
  },
  {
    name: 'رئيس / Master',
    url: '/master',
    icon: 'icon-people',
     children: [
       {
         name: 'المكتب / Company',
         url: '/master/company',
         icon: 'fa fa-fw fa-cubes',
         
       },
       {
        name: 'الإدارات / Department',
        url: '/master/department',
        icon: 'fa fa-fw fa-cubes',
      },
      {
       name: 'المسميات / Jobtitle',
       url: '/master/jobtitle',
       icon: 'fa fa-fw fa-cubes',
     },
     {
      name: 'الأدوار / Role',
      url: '/master/role',
      icon: 'fa fa-fw fa-cubes',
    },
    {
     name: 'المستعمل / User',
     url: '/master/user',
     icon: 'fa fa-fw fa-cubes',
   },
   {
    name: 'نوع المشروع / Create case',
    url: '',
    icon: 'fa fa-fw fa-cubes',
   }
     ]
  },
  {
    name: 'إدارة الاتصال / Contact',
    url: '/contact',
    icon: 'icon-people'
  }
];
