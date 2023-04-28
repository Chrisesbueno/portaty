import { atom } from "recoil";

/* Permits */
export const permissionsStatus = atom({
  key: "permissionsStatusValue",
  default: false,
});
export const notificationPermissions = atom({
  key: "notificationPermissionsValue",
  default: false,
});
export const statsPermissions = atom({
  key: "statsPermissionsValue",
  default: false,
});
export const locationPermissions = atom({
  key: "locationPermissionsValue",
  default: false,
});
export const contactPermissions = atom({
  key: "contactPermissionsValue",
  default: false,
});
export const calendarPermissions = atom({
  key: "calendarPermissionsValue",
  default: false,
});
export const cameraPermissions = atom({
  key: "cameraPermissionsValue",
  default: false,
});
/*  */

/* Search */
export const searchGlobal = atom({
  key: "searchGlobalValue",
  default: "",
});

export const searchRecent = atom({
  key: "recentSvalue",
  default: [
    {
      id: 1,
      title: "Snake Skin Bag"
    },
    {
      id: 2,
      title: "Dell 133999"
    },
    {
      id: 3,
      title: "HeadPhone White"
    }
  ],
});
/* */

// Sort and Filter
export const isFilterShow = atom({
  key: "isFilterShowValue",
  default: false,
});
// user auth
export const userAutenticated = atom({
  key: "userAutenticatedValue",
  default: undefined,
});

// Post Product Modals Data
export const listCategories = atom({
  key: "listCategoriesValue",
  default: [],
});
export const listBrands = atom({
  key: "listBrandsValue",
  default: [],
});
export const listProducts = atom({
  key: "listProductsValue",
  default: [],
});

export const categoriesId = atom({
  key: "categoriesIdValue",
  default: '',
});
export const brandsId = atom({
  key: "brandsIdValue",
  default: '',
});
export const productsId = atom({
  key: "productsIdValue",
  default: '',
});