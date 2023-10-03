export async function fetchJobs(pocketbaseClient, params) {
  try {
    const response = await pocketbaseClient
      .collection("jobs")
      .getFullList(params);
    return response;
  } catch (error) {
    console.log("error fetching jobs", error);
  }
}

export async function fetchJob(pocketbaseClient, id, params = undefined) {
  try {
    const response = await pocketbaseClient
      .collection("jobs")
      .getOne(id, params);
    return response;
  } catch (error) {
    console.log("error fetching job", error);
  }
}

export async function patchJob(pocketbaseClient, id, data) {
  try {
    const response = await pocketbaseClient.collection("jobs").update(id, data);
    return response;
  } catch (error) {
    console.log("error patching job", error);
  }
}
