import express from "express";
import pkg from './package.json';
import versionHandler from "./config/version-config";

import userRoute from "./src/routes/user.route";
import authRoute from "./src/routes/auth.route";
import supplierRoute from "./src/routes/supplier.route";
import enterpriseRoute from "./src/routes/enterprise.route";
import warehouseRoute from "./src/routes/warehouse.route";
import bankRoute from "./src/routes/bank.route"; // Bank and Account routes
import departmentRoute from "./src/routes/department.route";
import clientRoute from "./src/routes/client.route";
import sellerRoute from "./src/routes/seller.route";
import currencyTypeRoute from "./src/routes/currency-type.route";
import documentRoute from "./src/routes/document.route";
import invoiceTypeRoute from "./src/routes/invoice-type.route";
import measurementUnitRoute from "./src/routes/measurement-unit.route";
import paymentMethodRoute from "./src/routes/payment-method.route";
import productStatusRoute from "./src/routes/product-status.route";
import invoiceStatusRoute from "./src/routes/invoice-status.route";
import systemSettingRoute from "./src/routes/system-setting.route";


const app = express();
//app.use(morgan('dev'));
app.use(express.json({limit: '300mb'}));
app.set('pkg', pkg);
app.use(express.static(__dirname + '/public'));


app.use(`${ versionHandler.v1 }/`, userRoute);
app.use(`${ versionHandler.v1 }/`, authRoute);
app.use(`${ versionHandler.v1 }/`, supplierRoute);
app.use(`${ versionHandler.v1 }/`, enterpriseRoute);
app.use(`${ versionHandler.v1 }/`, warehouseRoute);
app.use(`${ versionHandler.v1 }/`, bankRoute); // Bank and Account routes
app.use(`${ versionHandler.v1 }/`, departmentRoute);
app.use(`${ versionHandler.v1 }/`, clientRoute);
app.use(`${ versionHandler.v1 }/`, sellerRoute);
app.use(`${ versionHandler.v1 }/`, currencyTypeRoute);
app.use(`${ versionHandler.v1 }/`, documentRoute);
app.use(`${ versionHandler.v1 }/`, invoiceTypeRoute);
app.use(`${ versionHandler.v1 }/`, measurementUnitRoute);
app.use(`${ versionHandler.v1 }/`, paymentMethodRoute);
app.use(`${ versionHandler.v1 }/`, productStatusRoute);
app.use(`${ versionHandler.v1 }/`, invoiceStatusRoute);
app.use(`${ versionHandler.v1 }/`, systemSettingRoute);


app.get('/', (req,res)=>{
  res.json({
    "name": app.get('pkg').name,
    "description": app.get('pkg').description,
    "author": app.get('pkg').author,
    "version": app.get('pkg').version
  });
});

export default app;
