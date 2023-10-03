export async function fetchOptions(pocketbaseClient, params) {
  try {
    const response = await pocketbaseClient
      .collection("possibleAnswer")
      .getFullList(params);
    return response;
  } catch (error) {
    console.log("error fetching options", error);
  }
}
