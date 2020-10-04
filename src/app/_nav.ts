import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'لوحة القيادة',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: ' رئيس / Master',
    url: '/master',
    icon: 'icon-people',
    children: [
      {
        name: 'الشركة / Company',
        url: '/master/company',
        icon: 'fa fa-building',

      },
      {
        name: 'الإدراة / Department',
        url: '/master/department',
        icon: 'fa fa-sitemap',
      },
      {
        name: 'المسمى الوظيفي / Job title',
        url: '/master/jobtitle',
        icon: 'fa fa-black-tie',
      },
      {
        name: 'الأدوار / Role',
        url: '/master/role',
        icon: 'fa fa-stumbleupon',
      },
      {
        name: 'جهة نظر القضية / Court',
        url: '/master/court',
        icon: 'fa fa-university',
      },
      {
        name: 'المستعمل / User',
        url: '/master/user',
        icon: 'fa fa-user',
      },
      {
        name: 'Project',
        url: '/master/project',
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
