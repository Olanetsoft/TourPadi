const express = require('express');

const app = express();


const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Bro i dey listen to ${port}`);
});