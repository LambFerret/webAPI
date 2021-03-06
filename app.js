const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = require('./routers');

const port = 4004;
const mode = process.env.NODE_ENV;

app.set('json spaces', 2);
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('SecretSentenceForCOOKIE'));

app.use(async (req, res, next) => {
  // if (typeof req.session.user === "undefined") {
  //     let token = req.header("Authorization")
  //     if (typeof token !== "undefined") {
  //         token = token.replace("Bearer ", "")
  //         try {
  //             const userid = await Userlib.getTokenUser(token);
  //             if (userid !== false) {
  //                 const user = await Userlib.getUserFromId(userid)
  //                 delete user.password
  //                 delete user.salt
  //                 req.session.user = user
  //             }
  //         } catch (err) {
  //             console.log(err);
  //         }
  //     }
  // }
  mode === 'release'
    ? res.header('Access-Control-Allow-Origin', '*') // insert domain name
    : res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Headers', 'GET, PATCH, POST, DELETE');
  next();
});

app.use(router);

app.listen(port, () => {
  console.log(`mode:${mode}, port:${port}`);
});
