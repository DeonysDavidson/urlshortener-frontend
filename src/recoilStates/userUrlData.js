import { atom } from "recoil";

export const userUrlData = atom({
  key: "userUrlData",
  default: JSON.parse(localStorage.getItem("urlData"))
    ? JSON.parse(localStorage.getItem("urlData"))
    : []
});
