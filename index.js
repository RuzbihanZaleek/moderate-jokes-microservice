const app = require("./src/app");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Moderate Jokes Microservice running on port ${PORT}`);
});
