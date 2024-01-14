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
};

function formatShortDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { month: 'short', day: '2-digit' });
}

function formatLongDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ' - ' + 
      date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

export {
    formatShortDate,
    formatLongDate,
    handleSuccessAuthentication
}
