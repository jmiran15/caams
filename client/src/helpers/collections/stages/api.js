export async function fetchStages(pocketbaseClient, params) {
  try {
    const response = await pocketbaseClient
      .collection("stage") // change to plural
      .getFullList(params);
    return response;
  } catch (error) {
    console.log("error fetching stages", error);
  }
}
