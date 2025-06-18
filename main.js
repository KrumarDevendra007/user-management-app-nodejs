//this imports the express module
const express = require('express');

//set up the express app = server
const app = express();
//this creates an instance of the express application
//now we have to deploy the server to a port
//set up the port
const port = 3000;

const root = function(req, res){
    //send index.html
    res.sendFile(__dirname + '/index.html')
    //__dirname is a global variable that gives the current directory of the file
    //res.sendFile is a method that sends a file as a response
}

app.get('/sendHTML', root);

// app.method('route', handlerfunction)
//root route -> / -> localhost:3000
//profile -> /profile -> localhost:3000/profile
app.get('/', (req, res) => {
    res.send("Hello word Welcome to my Espress server");
});


app.get('/profile', (req, res) => {
    res.send("This is a GET request to /profile route");
});

app.post('/post', (req, res) => {
    res.send("This is POST request to the /post rout.");
});

// req-> methods, data, headers, etc
// res -> response, status code, headers, etc


//function -> intialize and then implement whenever i call it


//port listener provided by express


//app.method('route', handlerfunction) -> simple 
//advanced routing 
//Route Parameters
//profile pages, product pages, etc


//Query parameter
app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(`You search for: ${query}`);
});

//Query Parameters 
//searching for something 
app.get('/search', (req, res) => {
    const query = req.query.q; //q is the query parameter
    const sort = req.query.sort; //sort is the query parameter
    const limit = req.query.limit; //limit is the query parameter
    
    res.send(`This is the search req of ${query} it is ${sort} and the ${limit}`);
});


// Rout parameters
app.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    res.send(`This is the profile page of ${username}`);
});

// Rout parameters product
app.get('/product/:productName', (req,res) => {
    const productName = req.params.productName;
    res.send(`This is the Product ${productName}`);
});

//youtube -> millions of videos -> cannot make millions of routes
//dynamic routing -> format of the route -> data 


//amazon.in -> products -> millions of products

//https://www.youtube.com/results?search_query=react+tutorial
//youtube -> search query -> react tutorial


// Custom middleware 
// Logging Midelware

const middleware = (req, res, next) => {
      
    const route = req.originalUrl;
    const method = req.method;
    const time = new Date().toLocaleString();

    console.log(`Route: ${route}, Method: ${method}, Time: ${time}`)
    next();
}

app.use(middleware)

app.use(express.json());

//lets implement a POST route to get data from the client
//signup
//data input json file server send 
app.post('/signup', (req,res) => {
    const userData = req.body;
    console.log("User Data:", userData);
    res.send("User signed up successfully");
} );

app.get('/about', middleware, (req, res) => {
    console.log('About route acessed');
    res.send("This is the about route")
})


//app.method 
app.listen(
    port, () => 
        console.log(`Server is running on port ${port}`)
);


