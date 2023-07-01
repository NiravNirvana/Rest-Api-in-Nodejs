/**
 * Created by Athh on 5/18/20.
 */
"use strict";
let app = require("express")();

let bodyParser = require("body-parser");
app.use(bodyParser.json());




/////////////////Import Product Vise File From Rought/////////
app.use('/', require('./routes/index'));
app.use('/product1', require('./routes/product1'));
app.use('/product2', require('./routes/product2'));
app.use('/live', require('./routes/liveApi'));// Import Here routes/liveApi file






app.listen('3000');
