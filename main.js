import { hit_secret } from "./index.js";

(async function main() {
  const result = await hit_secret('1y3m9fa90vgqidu');
  console.log(result);
}())