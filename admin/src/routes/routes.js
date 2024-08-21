export const menu = [
  {
    label: "Dashboard",
    items: [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-chart-bar",
        to: "/dashboard/",
      },
      {
        label: "Sous Admins",
        icon: "pi pi-fw pi-users",
        to: "/dashboard/admins",
      },
    ],
  },
  // {
  //   label: "Global Settings",
  //   items: [
  //     {
  //       label: "Gest Roles",
  //       icon: "pi pi-fw pi-users",
  //       to: "/dashboard/roles",
  //     },
  //     {
  //       label: "Gest Front",
  //       icon: "pi pi-fw pi-desktop",
  //       to: "/dashboard/front",
  //     },
  //     {
  //       label: "Pricing",
  //       icon: "pi pi-fw pi-dollar",
  //       to: "/dashboard/pricing",
  //     },
  //     {
  //       label: "Colors",
  //       icon: "pi pi-fw pi-palette",
  //       to: "/dashboard/colors",
  //     },
  //   ],
  // },
  {
    label: "Universities & Students",
    items: [
      {
        label: "Universities",
        icon: "pi pi-fw pi-building",
        to: "/dashboard/universities",
      },
      {
        label: "Formation",
        icon: "pi pi-fw pi-file",
        to: "/dashboard/formation",
      },
      {
        label: "Students",
        icon: "pi pi-fw pi-id-card",
        to: "/dashboard/students",
      },
    ],
  },
  // {
  //   label: "About Products",
  //   items: [
  //     {
  //       label: "Categories",
  //       icon: "pi pi-fw pi-sitemap",
  //       items: [
  //         {
  //           label: "Group",
  //           icon: "pi pi-fw pi-sitemap",
  //           to: "/dashboard/group",
  //         },
  //         {
  //           label: "Category",
  //           icon: "pi pi-fw pi-tags",
  //           to: "/dashboard/category",
  //         },
  //         {
  //           label: "Sub Category",
  //           icon: "pi pi-fw pi-tag",
  //           to: "/dashboard/sub-category",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    label: "Interactions & Communication",
    items: [
      {
        label: "FeedBacks",
        icon: "pi pi-fw pi-thumbs-up",
        to: "/dashboard/feedbacks",
      },
      {
        label: "Conversations",
        icon: "pi pi-fw pi-comments",
        to: "/dashboard/conversation",
      },
      {
        label: "Mailing",
        icon: "pi pi-fw pi-envelope",
        to: "/dashboard/mailing",
      },
    ],
  },
  {
    label: "Transaction & Bills",
    items: [
      {
        label: "Transaction ",
        icon: "pi pi-fw pi-credit-card",
        to: "/dashboard/transactions",
      },
      {
        label: "Bills ",
        icon: "pi pi-fw pi-wallet",
        to: "/dashboard/bills",
      },
    ],
  },
];
