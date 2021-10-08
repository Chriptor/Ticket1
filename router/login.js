const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const validacion = require('../controller/validaciones')
const User = require('../model/Users')
const router = require('express').Router();


router.post('/login', async (req, res) => {

    const { error } = validacion.schemaLogin.validate(req.body);
    const user = await User.findOne({ email: req.body.email });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    
    if (error) return res.render("index",{Invalido:"", error: error.details[0].message })
    if (!user) return res.render("index",{Invalido: "Usuario o Contraseña invalido"})
    if (!validPassword) return res.render("index",{Invalido: "Usuario o Contraseña invalido"})

    
    const token = jwt.sign({
        id: user._id,
        name: user.nombre,
    }, process.env.SECRET_TOKEN)
    
    res
  .status(201)
  .cookie('access_token', token, {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
  })
  .cookie('user', user.nombre )
  .redirect(301, '/dashboard')
   
  
})
module.exports = router