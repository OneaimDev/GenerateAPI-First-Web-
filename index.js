import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_MEOW = "https://meowfacts.herokuapp.com/"
const API_JOKE = "https://v2.jokeapi.dev/joke/Any" 

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("index.ejs");
})

app.get("/api", async (req, res) => {
    res.render("api.ejs");
})

app.post("/Generate", async (req, res) => {
    const category = req.body.api;
    let API_URL;

    switch (category) {
        case "MeowFact":
            API_URL = API_MEOW;
            break;
        case "Jokes":
            API_URL = API_JOKE;
            break;
        default:
            API_URL = API_MEOW;
            break;
    }

    try {
        const response = await axios.get(API_URL);
        const result = response.data;
        
        console.log(result);

        res.render("api.ejs", {
            content: JSON.stringify(result)
        })
    } catch (error) {
        res.status(404).send(error.message);
    }
})

app.listen(port, () => {
    console.log("Listening to port "+port);
})