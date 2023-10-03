export async function fetchQuestions(pocketbaseClient, params) {
  try {
    const response = await pocketbaseClient
      .collection("jobQuestion")
      .getFullList(params);
    return response;
  } catch (error) {
    console.log("error fetching questions", error);
  }
}
