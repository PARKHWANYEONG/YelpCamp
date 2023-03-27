const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controller/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true, }), users.login)
//keepSessionInfo:true로 설정 (세션에 직접 저장한게 undefined오류가 있었음.)

router.get('/logout', users.logout)

module.exports = router;
