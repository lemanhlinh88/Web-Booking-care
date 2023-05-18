export const adminMenu = [
  {
    //quan ly nguoi dung
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      {
        //quan ly kế hoạch khám bẹnh của bác sĩ
        name: "menu.doctor.schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    //quan ly phòng khám
    name: "menu.admin.manage-clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //quan ly chuyên khoa
    name: "menu.admin.manage-specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //quan ly cẩm nang
    name: "menu.admin.manage-handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        //quan ly kế hoạch khám bẹnh của bác sĩ
        name: "menu.doctor.schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
];
