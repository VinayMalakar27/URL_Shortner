const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParse = require('cookie-parser');
const path = require("path");
const { connectToMongoDB } = require("./connect")
const { connect } = require("mongoose");
const URL = require('./models/url');
const {restrictToLoginnedinUserOnly,checkAuth} = require('./middleWare/auth')
const urlRoute = require('./routes/url');
const router = require("./routes/url");
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user');
const cookieParser = require("cookie-parser");

//server create
const app = express();
const PORT = 8001;


connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.get("/", async (req,res)=>{
    const allUrls = await URL.find({});
    console.log("All URLs =>", allUrls);  // Debug
    return res.render('home', {
        urls: allUrls,   
    })
})

app.use("/url", restrictToLoginnedinUserOnly, urlRoute);
app.use("/user",userRoute);
app.use("/" ,checkAuth, staticRoute);


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: { timestamp: Date.now() },
            },
        }
    );

    //check to handle the case where the URL is not found
    if (!entry) {
        return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=> console.log(`Server started at port: ${PORT}`));