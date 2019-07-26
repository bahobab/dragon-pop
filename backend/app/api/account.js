const {Router} = require('express');

const AccountTable = require('../account/table');
const {hash} = require('../account/helper');
const {setSession} = require('./helper');
const Session = require('../account/session');

const router = new Router();

router.post('/signup', (req, res, next) => {
    const {username, password} = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable
        .getAccount(usernameHash)
        .then(({account}) => {
            if (!account) {

                return AccountTable.storeAccount({usernameHash, passwordHash})
            } else {
                const error = new Error('Sorry! Unable to create this account');
                error.statusCode = 409;
                throw error;
            }
        })
        .then(() => {
            return setSession({username, res});
        })
        .then(({message}) => {
            res
                .status(201)
                .json({message})
        })
        .catch(error => next(error));

});

router.post('/signin', (req, res, next) => {
    const {username, password} = req.body;
    const usernameHash = hash(username);

    AccountTable
        .getAccount(usernameHash)
        .then(({account}) => {
            if (account && account.passwordHash === hash(password)) {
                const {sessionId} = account;
                return setSession({username, res, sessionId});
            } else {
                const error = new Error('Incorrect username/password combination');
                error.statusCode = 409;

            }
        })
        .then(({message}) => res.status(201).json({message}))
        .catch(error => next(error));
});

router.get('/signout', (req, res, next) => {
    const {username} = Session.parse(req.cookies.sessionString);

    AccountTable
        .updateSessionId({sessionId: null, usernameHash: hash(username)})
        .then(() => {
            res.clearCookie('sessionString');
            res
                .status(200)
                .json({message: 'Successfully signed out'})
        })
        .catch(error => next(error));
});

module.exports = router;