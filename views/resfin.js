const router = require('express').Router();

router.get('/resfin', async (req, res) => {
    
    res.render('resumenFinan', {TituloW:"Resumen Financiero"})
})

module.exports=router;