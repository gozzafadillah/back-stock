import Cookies from "js-cookie";

const Auth = {
  isAuthorization() {
    if (!Cookies.get("id")) return false;
    return true;
  },
};

export default Auth;
