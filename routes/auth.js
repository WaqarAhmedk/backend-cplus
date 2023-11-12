const express = require('express');
const authController = require('../controllers/authcontorollers');
const router = express.Router();
const { query, validationResult, body } = require('express-validator')
const AuthValidation = [
    body('name').notEmpty().withMessage('Name cannot be empty '),
    body('email').notEmpty().withMessage('Email cannot be empty '),
    body('password').notEmpty().withMessage('Password cannot be empty '),

]
const loginValidation = [
    body('email').notEmpty().withMessage('Email cannot be empty ').isEmail(),
    body('password').notEmpty().withMessage('Password cannot be empty '),

]
router.post('/create', AuthValidation, (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    authController.create(req, res)
})
router.post('/login', loginValidation, (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    authController.signin(req, res)
})


module.exports = router;