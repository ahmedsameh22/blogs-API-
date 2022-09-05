const multer = require("multer");
const upload = multer({ dest: "public/images/", limits: { fileSize: 1.7 } });
module.exports = upload;
