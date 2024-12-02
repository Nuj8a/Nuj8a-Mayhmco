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
    title: 'Orders',
    href: '/dashboard/orders',
    icon: 'orders',
    label: 'Orders',
    subnav: [
      {
        title: 'All Orders',
        href: '/dashboard/orders/all',
        icon: 'allOrders',
        label: 'All Orders'
      },
      {
        title: 'Pending',
        href: '/dashboard/orders/pending',
        icon: 'pendingOrders',
        label: 'Pending Orders'
      },
      {
        title: 'Completed',
        href: '/dashboard/orders/completed',
        icon: 'ordersComplete',
        label: 'Completed Orders'
      }
    ]
  },
  {
    title: 'Products',
    href: '/dashboard/products',
    icon: 'products',
    label: 'Products',
    subnav: [
      {
        title: 'All',
        href: '/dashboard/products/all',
        icon: 'allProduct',
        label: 'All Products'
      },
      {
        title: 'Add',
        href: '/dashboard/products/add',
        icon: 'addProduct',
        label: 'Add Product'
      },
      {
        title: 'Categories',
        href: '/dashboard/products/categories',
        icon: 'categories',
        label: 'Categories'
      },
      {
        title: 'Inventory',
        href: '/dashboard/products/inventory',
        icon: 'inventory',
        label: 'Inventory'
      }
    ]
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    icon: 'customers',
    label: 'Customers',
    subnav: [
      {
        title: 'List',
        href: '/dashboard/customers/list',
        icon: 'customerList',
        label: 'Customer List'
      },
      {
        title: 'Segments',
        href: '/dashboard/customers/segments',
        icon: 'customerSegments',
        label: 'Segments'
      },
      {
        title: 'Feedback',
        href: '/dashboard/customers/feedback',
        icon: 'feedback',
        label: 'Customer Feedback'
      }
    ]
  },
  {
    title: 'Pay',
    href: '/dashboard/payments',
    icon: 'payments',
    label: 'Payments',
    subnav: [
      {
        title: 'Methods',
        href: '/dashboard/payments/methods',
        icon: 'manageMethods',
        label: 'Payment Methods'
      },
      {
        title: 'History',
        href: '/dashboard/payments/history',
        icon: 'transactionHistory',
        label: 'Transaction History'
      },
      {
        title: 'Refunds',
        href: '/dashboard/payments/refunds',
        icon: 'refunds',
        label: 'Refunds'
      },
      {
        title: 'Billing',
        href: '/dashboard/payments/billing',
        icon: 'billing',
        label: 'Billing Settings'
      }
    ]
  },
  {
    title: 'Task Scheduler',
    href: '/dashboard/taskscheduler',
    icon: 'clipboardList',
    label: 'Task Scheduler',
    subnav: [
      {
        title: 'Kanban',
        href: '/dashboard/taskscheduler/kanban',
        icon: 'kanban',
        label: 'Kanban'
      },
      {
        title: 'Calendar',
        href: '/dashboard/taskscheduler/calendar',
        icon: 'calendar',
        label: 'Calendar'
      }
    ]
  },
  {
    title: 'Reports',
    href: '/dashboard/analytics',
    icon: 'analytics',
    label: 'Analytics',
    subnav: [
      {
        title: 'Sales',
        href: '/dashboard/analytics/sales',
        icon: 'salesReports',
        label: 'Sales Reports'
      },
      {
        title: 'Insights',
        href: '/dashboard/analytics/customers',
        icon: 'customerInsights',
        label: 'Customer Insights'
      },
      {
        title: 'Traffic',
        href: '/dashboard/analytics/traffic',
        icon: 'traffic',
        label: 'Site Traffic'
      }
    ]
  },
  {
    title: 'Configuration',
    href: '/dashboard/settings',
    icon: 'settings',
    label: 'Settings',
    subnav: [
      {
        title: 'Profile',
        href: '/dashboard/settings/profile',
        icon: 'profile',
        label: 'Profile Settings'
      },
      {
        title: 'Security',
        href: '/dashboard/settings/security',
        icon: 'security',
        label: 'Security'
      },
      {
        title: 'Notifications',
        href: '/dashboard/settings/notifications',
        icon: 'notification',
        label: 'Notification Settings'
      }
    ]
  },
  {
    title: 'Help',
    href: '/dashboard/support',
    icon: 'support',
    label: 'Support',
    subnav: [
      {
        title: 'Docs',
        href: '/dashboard/support/docs',
        icon: 'booktext',
        label: 'Documentation'
      },
      {
        title: 'Contact',
        href: '/dashboard/support/contact',
        icon: 'contact',
        label: 'Contact Support'
      },
      {
        title: 'FAQ',
        href: '/dashboard/support/faq',
        icon: 'FAQ',
        label: 'FAQ'
      }
    ]
  },
  {
    title: 'Admin',
    href: '/dashboard/admin',
    icon: 'admins',
    label: 'Admin Panel',
    subnav: [
      {
        title: 'User Management',
        href: '/dashboard/admin/users',
        icon: 'usermanagement',
        label: 'User Management'
      },
      {
        title: 'Roles',
        href: '/dashboard/admin/roles',
        icon: 'roles',
        label: 'Roles & Permissions'
      },
      {
        title: 'Audit',
        href: '/dashboard/admin/audit',
        icon: 'audit',
        label: 'Audit Logs'
      }
    ]
  }
];

export const operationNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Orders',
    href: '/dashboard/orders',
    icon: 'orders',
    label: 'Orders',
    subnav: [
      {
        title: 'All Orders',
        href: '/dashboard/orders/all',
        icon: 'allOrders',
        label: 'All Orders'
      },
      {
        title: 'Pending',
        href: '/dashboard/orders/pending',
        icon: 'pendingOrders',
        label: 'Pending Orders'
      },
      {
        title: 'Completed',
        href: '/dashboard/orders/completed',
        icon: 'ordersComplete',
        label: 'Completed Orders'
      }
    ]
  },
  {
    title: 'Products',
    href: '/dashboard/products',
    icon: 'products',
    label: 'Products',
    subnav: [
      {
        title: 'All',
        href: '/dashboard/products/all',
        icon: 'allProduct',
        label: 'All Products'
      },
      {
        title: 'Add',
        href: '/dashboard/products/add',
        icon: 'addProduct',
        label: 'Add Product'
      },
      {
        title: 'Categories',
        href: '/dashboard/products/categories',
        icon: 'categories',
        label: 'Categories'
      },
      {
        title: 'Inventory',
        href: '/dashboard/products/inventory',
        icon: 'inventory',
        label: 'Inventory'
      }
    ]
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    icon: 'customers',
    label: 'Customers',
    subnav: [
      {
        title: 'List',
        href: '/dashboard/customers/list',
        icon: 'customerList',
        label: 'Customer List'
      },
      {
        title: 'Segments',
        href: '/dashboard/customers/segments',
        icon: 'customerSegments',
        label: 'Segments'
      },
      {
        title: 'Feedback',
        href: '/dashboard/customers/feedback',
        icon: 'feedback',
        label: 'Customer Feedback'
      }
    ]
  },
  {
    title: 'Pay',
    href: '/dashboard/payments',
    icon: 'payments',
    label: 'Payments',
    subnav: [
      {
        title: 'Methods',
        href: '/dashboard/payments/methods',
        icon: 'manageMethods',
        label: 'Payment Methods'
      },
      {
        title: 'History',
        href: '/dashboard/payments/history',
        icon: 'transactionHistory',
        label: 'Transaction History'
      },
      {
        title: 'Refunds',
        href: '/dashboard/payments/refunds',
        icon: 'refunds',
        label: 'Refunds'
      },
      {
        title: 'Billing',
        href: '/dashboard/payments/billing',
        icon: 'billing',
        label: 'Billing Settings'
      }
    ]
  }
];

export const managementNavItems: NavItem[] = [
  {
    title: 'Task Scheduler',
    href: '/dashboard/taskscheduler',
    icon: 'clipboardList',
    label: 'Task Scheduler',
    subnav: [
      {
        title: 'Kanban',
        href: '/dashboard/taskscheduler/kanban',
        icon: 'kanban',
        label: 'Kanban'
      },
      {
        title: 'Calendar',
        href: '/dashboard/taskscheduler/calendar',
        icon: 'calendar',
        label: 'Calendar'
      }
    ]
  },
  {
    title: 'Reports',
    href: '/dashboard/analytics',
    icon: 'analytics',
    label: 'Analytics',
    subnav: [
      {
        title: 'Sales',
        href: '/dashboard/analytics/sales',
        icon: 'salesReports',
        label: 'Sales Reports'
      },
      {
        title: 'Insights',
        href: '/dashboard/analytics/customers',
        icon: 'customerInsights',
        label: 'Customer Insights'
      },
      {
        title: 'Traffic',
        href: '/dashboard/analytics/traffic',
        icon: 'traffic',
        label: 'Site Traffic'
      }
    ]
  },
  {
    title: 'Configuration',
    href: '/dashboard/settings',
    icon: 'settings',
    label: 'Settings',
    subnav: [
      {
        title: 'Profile',
        href: '/dashboard/settings/profile',
        icon: 'profile',
        label: 'Profile Settings'
      },
      {
        title: 'Security',
        href: '/dashboard/settings/security',
        icon: 'security',
        label: 'Security'
      },
      {
        title: 'Notifications',
        href: '/dashboard/settings/notifications',
        icon: 'notification',
        label: 'Notification Settings'
      }
    ]
  }
];
export const supportNavItems: NavItem[] = [
  {
    title: 'Help',
    href: '/dashboard/support',
    icon: 'support',
    label: 'Support',
    subnav: [
      {
        title: 'Docs',
        href: '/dashboard/support/docs',
        icon: 'booktext',
        label: 'Documentation'
      },
      {
        title: 'Contact',
        href: '/dashboard/support/contact',
        icon: 'contact',
        label: 'Contact Support'
      },
      {
        title: 'FAQ',
        href: '/dashboard/support/faq',
        icon: 'FAQ',
        label: 'FAQ'
      }
    ]
  },
  {
    title: 'Admin',
    href: '/dashboard/admin',
    icon: 'admins',
    label: 'Admin Panel',
    subnav: [
      {
        title: 'User Management',
        href: '/dashboard/admin/users',
        icon: 'usermanagement',
        label: 'User Management'
      },
      {
        title: 'Roles',
        href: '/dashboard/admin/roles',
        icon: 'roles',
        label: 'Roles & Permissions'
      },
      {
        title: 'Audit',
        href: '/dashboard/admin/audit',
        icon: 'audit',
        label: 'Audit Logs'
      }
    ]
  }
];
