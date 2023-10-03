export async function fetchUsers(pocketbaseClient, params) {
  try {
    const response = await pocketbaseClient
      .collection("user") // change to plural
      .getFullList(params);
    return response;
  } catch (error) {
    console.log("error fetching users", error);
  }
}
