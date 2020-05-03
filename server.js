const express = require("express");
const connectDB = require("./config/db");

//calling the constructor
const app = express();
//connect to db
connectDB();

//middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Jobs-Zim"));

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server on ${PORT}`));
