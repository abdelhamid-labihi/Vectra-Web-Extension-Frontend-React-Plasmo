const express = require('express');
const multer = require('multer');
const mindee = require('mindee');
const router = express.Router();
const run = require('../googletry');


const upload = multer({ storage: multer.memoryStorage() });
const mindeeClient = new mindee.Client({ apiKey: process.env.APP_MINDEE_API_KEY });
const customEndpoint = mindeeClient.createEndpoint('resume', 'mindee', '1');

router.post('/', upload.single('pdf'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(404).send("File not received");
        const inputSource = mindeeClient.docFromBuffer(
          file.buffer,
          file.originalname
        );
        const apiResponse = mindeeClient.enqueueAndParse(
          mindee.product.GeneratedV1,
          inputSource,
          { endpoint: customEndpoint }
        );
    
        apiResponse
          .then(async (resp) => {
            console.log(resp.document)
            const respString = resp.document.toString();
            console.log(respString);
            const transformedText = await run(respString);
    
      let jsonString = transformedText.replace(/^```json\n?/, ''); // Remove leading "```json"
      jsonString = jsonString.replace(/\n?```$/, ''); // Remove trailing "```"
      console.log(JSON.parse(jsonString))
      res.send(JSON.parse(jsonString)).status(200);

          })
          .catch((error) => {
            console.log(error)
          });
      } catch (error) {
        console.error(error);
        res.status(500).send("Error processing file.");
      }
});

module.exports = router;