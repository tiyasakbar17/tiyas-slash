require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const express = require("express");
const router = require("./api/router");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
connectDB().then(() => {
	//Route To Api
	app.use("/api/v1", router);
	app.get("/", (req, res) => res.send("Hello World!"));

    // if app is deployed
	if (process.env.NODE_ENV === "production") {
		app.use(express.static("client/build"));
		app.get("*", (req, res) => {
			res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
		});
	}

	app.listen(port, () => {
		console.log(`Server are running on port ${port}`);
	});
});
