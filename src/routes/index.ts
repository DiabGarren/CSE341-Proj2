"use strict";

import express = require('express');
const routes = express.Router();

routes.use('/vehicles', require('./vehicles'));

const session = require('express-session')
const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth2').Strategy;

routes.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));
routes.use(passport.initialize());
routes.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    // callbackURL: 'http://localhost:8080/google-callback',
    callbackURL: 'https://cse341-proj2.onrender.com/google-callback',
    passReqToCallback: true
}, (request: Request | any, accessToken: any, refreshToken: any, profile: any, callback: Function | any) => {
    return callback(null, profile);
}));

passport.serializeUser((user: any, callback: Function | any) => {
    callback(null, user);
});

passport.deserializeUser((user: any, callback: Function | any) => {
    callback(null, user);
});

routes.get('/login', passport.authenticate('google', { scope: ['email', 'profile'] }));
routes.get('/google-callback', passport.authenticate('google', { successRedirect: '/users' }));

routes.get("/logout", (req: Request | any, res: Response | any) => {
    req.logout;
    res.redirect("/api-docs");
    console.log(`-------> User Logged out`);
})

const checkAuthenticated = (req: Request | any, res: Response | any, next: Function | any) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}
routes.use('/users', checkAuthenticated, require('./users'));
routes.use('/', require('./swagger'));

export = routes;
