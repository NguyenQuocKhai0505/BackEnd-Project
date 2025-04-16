const express = require("express")
const router= express.Router();

const controller = require("../../controllers/clients/product.controller.js")

router.get('/',controller.index);

router.get('/:slug', controller.details)

module.exports=router;