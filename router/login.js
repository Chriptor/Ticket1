const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const validacion = require('../controller/validaciones')
const User = require('../model/Users')
const router = require('express').Router();

router.post('/login', async (req, res) => {

    const { error } = validacion.schemaLogin.validate(req.body);
    if (error) return res.render("index",{Invalido:"", error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.render("index",{Invalido: "Usuario o Contraseña invalido"})

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.render("index",{Invalido: "Usuario o Contraseña invalido"})
    
    const token = jwt.sign({
        id: user._id,
        name: user.nombre,
    }, process.env.SECRET_TOKEN)
        
   res.setHeader('auth-token', token).render("dashboard")
})
module.exports = router