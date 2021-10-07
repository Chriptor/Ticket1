const router = require('express').Router();
const User = require('../model/Users')
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
 
const schemaRegister = Joi.object({
    
    nombre: Joi.string().min(6).max(255).required(),
    ap_pat: Joi.string().min(6).max(255).required(),
    ap_mat: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/login', async (req, res) => {

    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario o Contraseña invalido' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Usuario o Contraseña invalido' })
    
    const token = jwt.sign({
        id: user._id,
        name: user.nombre,
    }, process.env.SECRET_TOKEN)
        
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
})

module.exports = router;
router.post('/register', async (req, res) => {

     const { error } = schemaRegister.validate(req.body)
    
     if (error) {
         return res.status(400).json(
             {error: error.details[0].message}
         )
     }
     
     const emailEx = await User.findOne({ email: req.body.email });
     if (emailEx) {
         return res.status(400).json({error: 'Email ya registrado'})
    }
    
    const ronda = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, ronda)

    const user = new User({
        nombre: req.body.nombre,
        ap_pat: req.body.ap_pat,
        ap_mat: req.body.ap_mat,
        email: req.body.email,
        password: password
    })
    
try {
    const userDB = await user.save();
    res.json({
        error: null,
        data: userDB
    })
} catch (error) {
    res.status(400).json(error )    
}
        
})

module.exports=router;