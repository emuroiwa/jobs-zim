const express = require("express");
const connectDB = require("./config/db");

const app = express();
//connect to db
connectDB();

//middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("dsdsd"));

//define routes
app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server on ${PORT}`));
