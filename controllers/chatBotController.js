const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const key = process.env.OPENAI_KEY;
const endpoint = process.env.OPENAI_ENDPOINT;
const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));
const deploymentName = process.env.OPENAI_DEPLOYMENTNAME;

exports.talk = async (req, res) => {
    try {
      const {question, type} = req.body;
      const { choices } = await client.getCompletions(deploymentName, [question]);
      for (const choice of choices) {
        const completion = choice.text;
        return res.status(200).json({message: completion});
      }
    } catch (err) {
        res.status(401).json({message: err});
    }
  };

