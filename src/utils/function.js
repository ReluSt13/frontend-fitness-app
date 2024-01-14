import { jwtDecode } from "jwt-decode";
import { Claims } from "./constant.js";

function handleSuccessAuthentication(result) {

    if (result !== null && result.isSuccess && result.response.length > 1) {
      const decodedToken = jwtDecode(result.response);
      const user = {
        id: decodedToken[Claims.NameIdentifierTokenKey],
        name: decodedToken[Claims.NameTokenKey],
        email: decodedToken[Claims.EmailTokenKey],
        roles: decodedToken[Claims.RoleTokenKey],
        avatar: decodedToken[Claims.AvatarTokenKey],
        token: result.response
      };
      localStorage.setItem('user', JSON.stringify(user));
    }
    return result;
}

export {
    handleSuccessAuthentication
}
