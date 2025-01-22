require('dotenv').config()
const express = require('express');
const cors = require("cors");
const router = require('./routes');
const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/v1",router);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

