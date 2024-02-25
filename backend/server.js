// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
db();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// Routes
const authRoute = require("./routes/AuthRoute"); // Import the authRoute
const postRoute = require("./routes/PostRoute"); // Import the postRoutes
const userRoute = require("./routes/UserRoute");


app.use("/", authRoute); // Use the authRoute
app.use("/", userRoute); // Use the userRoute

app.use("/api/posts", postRoute); // Use the postRoutes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
