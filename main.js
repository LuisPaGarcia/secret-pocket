import { hit_secret } from "./index.js";

(async function main() {
  const result = await hit_secret('bo4kg8oojkxmlaf');
  console.log(result);
}())