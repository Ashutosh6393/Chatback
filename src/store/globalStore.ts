import { atom } from "recoil";

const authState = atom({
  key: "AuthState",
  default: {
    isAuthenticated: false,
    user: {
      id: "",
      name: "",
      email: "",
      image: "",
    },
  },
});

export { authState };
