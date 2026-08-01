const backendUrl = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL.replace(/\/$/, '') : "http://localhost:5000";
export const host = backendUrl;
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;

export const friendBaseRoute = `${host}/api/friends`;
export const getFriendsRoute = `${friendBaseRoute}/all`;
export const getRequestsRoute = `${friendBaseRoute}/requests`;
export const exploreUsersRoute = `${friendBaseRoute}/explore`;
export const sendRequestRoute = `${friendBaseRoute}/send`;
export const acceptRequestRoute = `${friendBaseRoute}/accept`;
export const rejectRequestRoute = `${friendBaseRoute}/reject`;
