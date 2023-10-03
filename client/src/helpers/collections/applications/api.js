export async function fetchApplications(pocketbaseClient, params) {
  try {
    const response = await pocketbaseClient
      .collection("application") // change to plural
      .getFullList(params);
    return response;
  } catch (error) {
    console.log("error fetching applications", error);
  }
}
