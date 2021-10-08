const validacion = require('../controller/validaciones')
const User = require('../model/Users')
const bcrypt = require('bcrypt')

module.exports.newUser = async(req,res)=>{
    const { error } = validacion.schemaRegister.validate(req.body)
    
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
}

