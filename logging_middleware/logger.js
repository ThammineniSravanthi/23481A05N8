const axios = require("axios");

const Log = async (
  stack,
  level,
  packageName,
  message,
  token
) => {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Success:");
    console.log(response.data);

  } catch (error) {
    console.log("Error:");

    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

module.exports = Log;