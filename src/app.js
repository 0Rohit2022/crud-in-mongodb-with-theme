const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path")
const homeroutes  = require('../routers/home')

const app = express();
const PORT = 8000;
mongoose.connect("mongodb://localhost:27017/EmployeeDB", {useNewUrlParser:true})
.then(() => {
    console.log("Database Connected Successfully")
})
.catch((err) => {
    console.log(err);
});




app.set('view engine', 'ejs');
const staticPath = path.join(__dirname , '../public')
app.use(express.static(staticPath))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', homeroutes);  
 

app.listen(PORT, () => {
    console.log(`Server is running live on port no.${PORT}`)
})
