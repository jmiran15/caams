import PocketBase from "pocketbase";

export const pocketbaseClient = new PocketBase("http://10.203.70.207:8090");

// get rid of these functions.

export function isAuthenticated() {
  return pocketbaseClient.authStore.model
    ? (pocketbaseClient.authStore.isValid &&
        pocketbaseClient.authStore.model.role === "user") ||
        (pocketbaseClient.authStore.model.role === "employer" &&
          pocketbaseClient.authStore.model.reviewed === true)
    : false;
}

export function isEmployer() {
  return pocketbaseClient.authStore.model.role === "employer";
}

export function isUser() {
  return pocketbaseClient.authStore.model.role === "user";
}

export function isAdmin() {
  return pocketbaseClient.authStore.model.isAdmin;
}

export async function logout() {
  await pocketbaseClient.authStore.clear();
}

export const user = () => pocketbaseClient.authStore.model;

export function getFile(collection, fileName) {
  let file = null;
  try {
    file = pocketbaseClient.files.getUrl(collection, fileName);
  } catch (error) {
    console.log("error fetching file", error);
  } finally {
    return file;
  }
}

export function loadAvatar(pocketbaseClient, user) {
  let avatar = null;
  if (user.avatar != "") {
    try {
      avatar = pocketbaseClient.files.getUrl(user, user.avatar);
    } catch (error) {
      console.log("error fetching avatar", error);
    } finally {
      return avatar;
    }
  }
}
