import express from "express";

const app = express();
app.use(express.json({limit: '300mb'}));
app.set('view engine', require('ejs'));
app.use(express.static(__dirname + '/public'));


app.get('/', (req,res)=>{
  res.json({
    "name": app.get('pkg').name,
    "description": app.get('pkg').description,
    "author": app.get('pkg').author,
    "version": app.get('pkg').version
  });
});

export default app;
