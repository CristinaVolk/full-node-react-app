import { createContext } from "react";

function doingNothing() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: doingNothing,
  logout: doingNothing,
  isAuthenticated: false,
});
