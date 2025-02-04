import express from "express";
import morgan from 'morgan';
import pkg from './package.json';
import versionHandler from "./config/version-config";

import userRoute from "./src/routes/user.route";
import authRoute from "./src/routes/auth.route";

const app = express();
app.use(morgan('dev'));
app.use(express.json({limit: '300mb'}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', require('ejs'));
app.set('pkg', pkg);

app.use(`${ versionHandler.v1 }/`, userRoute);
app.use(`${ versionHandler.v1 }/`, authRoute);

app.get('/', (req,res)=>{
  res.json({
    "name": app.get('pkg').name,
    "description": app.get('pkg').description,
    "author": app.get('pkg').author,
    "version": app.get('pkg').version
  });
});

export default app;
