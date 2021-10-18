const router = require('express').Router();

router.get('/edoResul', async (req, res) => {
    
    res.render('flujoEfectivo', {TituloW:"Estado de Resultado"})
})

module.exports=router;