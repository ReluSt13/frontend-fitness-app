import { jwtDecode } from "jwt-decode";
import { Claims } from "./constant.js";

function handleSuccessAuthentication(result) {

    if (result !== null && result.isSuccess && result.response.length > 1) {
      const decodedToken = jwtDecode(result.response);
      const user = {
        name: decodedToken[Claims.NameTokenKey],
        email: decodedToken[Claims.EmailTokenKey],
        roles: decodedToken[Claims.RoleTokenKey],
        token: result.response
      };
      localStorage.setItem('user', JSON.stringify(user));
    }
    return result;
}

export {
    handleSuccessAuthentication
}
