import "cross-fetch/dist/node-polyfill.js"; // Need for Pocketbase
import PocketBase from "pocketbase";
const url = "https://saving-stuff.pockethost.io";
const client = new PocketBase(url);

function get_all_secrets() {
  return client
    .collection("secrets")
    .getList()
    .then((result) => {
      return result;
    });
}

function get_secret_by_id(recordId) {
  return client.collection("secrets").getOne(recordId);
}

function update_secret_by_id(recordId, body = {}) {
  return client.collection("secrets").update(recordId, body);
}

async function hit_secret(record_id) {
  const secret = await get_secret_by_id(record_id);
  if (secret.already_open) return null;
  return await update_secret_by_id(record_id, { already_open: true });
}

export { get_all_secrets, get_secret_by_id, hit_secret };

/*
// Returns a paginated records list.
🔓 pb.collection(collectionIdOrName).getList(page = 1, perPage = 30, queryParams = {});

// Returns a list with all records batch fetched at once
// (by default 200 items per request; to change it set the `batch` query param).
🔓 pb.collection(collectionIdOrName).getFullList(queryParams = {});

// Returns the first found record matching the specified filter.
🔓 pb.collection(collectionIdOrName).getFirstListItem(filter, queryParams = {});

// Returns a single record by its id.
🔓 pb.collection(collectionIdOrName).getOne(recordId, queryParams = {});

// Creates (aka. register) a new record.
🔓 pb.collection(collectionIdOrName).create(bodyParams = {}, queryParams = {});

// Updates an existing record by its id.
🔓 pb.collection(collectionIdOrName).update(recordId, bodyParams = {}, queryParams = {});

// Deletes a single record by its id.
🔓 pb.collection(collectionIdOrName).delete(recordId, queryParams = {});
*/
