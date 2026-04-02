import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const sendToAI = async (filePath) => {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  const response = await axios.post(
    process.env.AI_API_URL, // FastAPI endpoint
    formData,
    {
      headers: formData.getHeaders(),
    }
  );

  return response.data;
};