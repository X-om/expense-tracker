require('dotenv').config()
const express = require('express');
const cors = require("cors");
const router = require('./routes');
const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/v1",router);

app.listen(process.env.PORT || 3000, '0.0.0.0' ,() =>{
    console.log(`server is running on port no ${process.env.PORT || 3000}`);
})


