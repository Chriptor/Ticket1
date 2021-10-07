const router = require('express').Router();
const User = require('../model/Users')

router.post('/register', async (req, res) => {
    
    const user = new User({
        nombre: req.body.name,
        ap_pat: req.body.ap_pat,
        ap_mat: req.body.ap_mat,
        email: req.body.email,
        password: req.body.password
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