const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  if (req.file === undefined) return res.send("you must select a file.");
  const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
  return res.json(imgUrl);
});

module.exports = router;
//v1
// {"size":285866,"type":"image/png","name":"Screenshot (1).png","meta":{"blamed":0,"expireAt":1657395460328,"createdAt":1657265860328},"ext":"png","extension":"png","extensionWithDot":".png","mime":"image/png","mime-type":"image/png","_id":"NKS4t3j2CHXNYvAfT","userId":null,"path":"/data/meteor-files/uploads/NKS4t3j2CHXNYvAfT.png","versions":{"original":{"path":"/data/meteor-files/uploads/NKS4t3j2CHXNYvAfT.png","size":285866,"type":"image/png","extension":"png"}},"_downloadRoute":"/cdn/storage","_collectionName":"uploadedFiles","isVideo":false,"isAudio":false,"isImage":true,"isText":false,"isJSON":false,"isPDF":false,"_storagePath":"/data/meteor-files/uploads","public":false}
// //v2
// {"size":285866,"type":"image/png","name":"Screenshot (1).png","meta":{"blamed":0,"expireAt":1657395551182,"createdAt":1657265951182},"ext":"png","extension":"png","extensionWithDot":".png","mime":"image/png","mime-type":"image/png","_id":"k4HivFWiq8YRkkgmm","userId":null,"path":"/data/meteor-files/uploads/k4HivFWiq8YRkkgmm.png","versions":{"original":{"path":"/data/meteor-files/uploads/k4HivFWiq8YRkkgmm.png","size":285866,"type":"image/png","extension":"png"}},"_downloadRoute":"/cdn/storage","_collectionName":"uploadedFiles","isVideo":false,"isAudio":false,"isImage":true,"isText":false,"isJSON":false,"isPDF":false,"_storagePath":"/data/meteor-files/uploads","public":false}
