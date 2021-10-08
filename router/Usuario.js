const router = require('express').Router();
const users =  require('../controller/User')

router.post('/register', async (req, res) => {
    users.newUser(req,res);
})



module.exports=router;