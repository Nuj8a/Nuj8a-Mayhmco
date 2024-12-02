import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Websites',
    href: '/dashboard/websites',
    icon: 'websites',
    label: 'Websites'
  },
  {
    title: 'Domains',
    href: '/dashboard/domains',
    icon: 'domains',
    label: 'Domains',
    subnav: [
      {
        title: 'Domain portfolio',
        href: '/dashboard/domain/portfolio',
        icon: 'domainportfolio',
        label: 'Domain portfolio'
      },
      {
        title: 'Get a New Domain',
        href: '/dashboard/domain-checker',
        icon: 'domains',
        label: 'Get a New Domain'
      },
      {
        title: 'Transfers',
        href: '/dashboard/transfers',
        icon: 'domains',
        label: 'Transfers'
      }
    ]
  },
  {
    title: 'Email',
    href: '/dashboard/email',
    icon: 'email',
    label: 'email',
    subnav: [
      {
        title: 'Domain portfolio',
        href: '/dashboard/domains',
        icon: 'domains',
        label: 'Domain portfolio'
      },
      {
        title: 'Get a New Domain',
        href: '/dashboard/domain-checker',
        icon: 'domains',
        label: 'Get a New Domain'
      },
      {
        title: 'Transfers',
        href: '/dashboard/transfers',
        icon: 'domains',
        label: 'Transfers'
      }
    ]
  },
  {
    title: 'Files',
    href: '/dashboard/files',
    icon: 'files',
    label: 'files',
    subnav: [
      {
        title: 'File Manager',
        href: '/dashboard/filemanager',
        icon: 'fileManager',
        label: 'File Manager'
      },
      {
        title: 'Backups',
        href: '/dashboard/backups',
        icon: 'backups',
        label: 'Backups'
      },
      {
        title: 'FTP Accounts',
        href: '/dashboard/ftpaccount',
        icon: 'ftpAccount',
        label: 'FTP Accounts'
      }
    ]
  },
  {
    title: 'VPS',
    href: '/dashboard/vps',
    icon: 'vps',
    label: 'vps'
  },
  {
    title: 'Billing',
    href: '/dashboard/billing',
    icon: 'billing',
    label: 'billing'
  }
];
// export const navItems: NavItem[] = [
//   {
//     title: 'Dashboard',
//     href: '/dashboard',
//     icon: 'dashboard',
//     label: 'Dashboard'
//   },
//   {
//     title: 'User',
//     href: '/dashboard/user',
//     icon: 'user',
//     label: 'user'
//   },
//   {
//     title: 'Employee',
//     href: '/dashboard/employee',
//     icon: 'employee',
//     label: 'employee'
//   },
//   {
//     title: 'Profile',
//     href: '/dashboard/profile',
//     icon: 'profile',
//     label: 'profile'
//   },
//   {
//     title: 'Kanban',
//     href: '/dashboard/kanban',
//     icon: 'kanban',
//     label: 'kanban'
//   },
//   {
//     title: 'Login',
//     href: '/',
//     icon: 'login',
//     label: 'login'
//   }
// ];
