const router = require('express').Router();

router.get('/flujoEfectivo', async (req, res) => {
    
    res.render('flujoEfectivo', {TituloW:"Flujo de Efectivo"})
})

module.exports=router;