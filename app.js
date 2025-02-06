import express from "express";
import versionHandler from "./config/version-config";

import userRoute from "./src/routes/user.route";
import authRoute from "./src/routes/auth.route";
import supplierRoute from "./src/routes/supplier.route";

const app = express();
//app.use(morgan('dev'));
app.use(express.json({limit: '300mb'}));
app.use(express.static(__dirname + '/public'));


app.use(`${ versionHandler.v1 }/`, userRoute);
app.use(`${ versionHandler.v1 }/`, authRoute);
app.use(`${ versionHandler.v1 }/`, supplierRoute);

app.get('/', (req,res)=>{
  res.json({
    "name": app.get('pkg').name,
    "description": app.get('pkg').description,
    "author": app.get('pkg').author,
    "version": app.get('pkg').version
  });
});

export default app;
