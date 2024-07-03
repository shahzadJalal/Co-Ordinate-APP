import express from "express";
import axios from "axios";
import bodyParser from "body-parser"
// import dotenv from "dotenv";
//import request  from "request";

const app=express();
const port= 3000;

//dotenv.config(); this is to hide api key for your own API or you want to hide it.

const appkey = "919109d50f6d6152cffc93b772634265";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs",{error: null , city: null , latitude: null , longitude: null });
});

app.get("/weather", async (req,res)=>{
    const city=req.query.city;
    try {
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${appkey}`);
        res.render("index.ejs",{
            latitude : response.data[0].lat,
            longitude : response.data[0].lon,
            city : city,
            error: null,
        });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.render("index.ejs", {
            latitude: null,
            longitude: null,
            city: null,
            error: "City not found or API error.",
        });
    }
 
})


app.listen(port, ()=> {
    console.log(`Server is running at port : ${port}`);
})
