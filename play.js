const jwk = require("jsonwebtoken");
const encoded = jwk.sign("123456789", "s11");
console.log(encoded);
const decoded = jwk.verify(encoded, "s11");
console.log(decoded);
