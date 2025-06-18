const express =  require('express');
const app = express();
const port = 3000;
const userRoutes = require('./view/routes.view'); // Importing user routes

app.use(express.json())

const mongoose = require('mongoose');

//Connect to MongoDB
mongoose.connect('mongodb+srv://mjrajak47z:H3Pkg3GTHrbWmJDd@cluster0.ht39vu6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log("Connected to MongoDB successfully")
})
.catch((error)=>{
    console.error("Error connecting to MongoDB", error)
});

const middleware = (req, res, next)=>{
    const route = req.originalUrl;
    const method = req.method;
    const time = new Date().toLocaleString();

    console.log(`Route : ${route}, Method: ${method}, Time: ${time}`);
    next();
}

app.use(middleware);
app.use('/', userRoutes);  // Using user routes for all requests starting with '/'


app.listen(
    port,
    console.log(`Server is running on ${port}`)
);
