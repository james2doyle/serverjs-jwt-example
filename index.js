const config = require('./config');
const jwt = require('jsonwebtoken');
const server = require('server');

const { get, post } = server.router;
const {
  render, redirect, json, status,
} = server.reply;

const auth = async ctx => new Promise((resolve, reject) => {
  const token = ctx.headers.authorization || ctx.query.token;
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    ctx.user = (err || !decoded) ? null : decoded.user;
    if (err) {
      console.log(err);
      reject(err.message);
    }

    resolve();
  });
});

server(
  config.serverConfig,
  [
    // serve index.html from the public dir
    get('/', ctx => render('public/index')),
    get('/protected', auth, async ctx => json({
      message: 'hello! thanks for the token',
      user: ctx.user, // stored in the token and pulled out in the auth middleware
    })),
    post('/login', async (ctx) => {
      console.log(ctx.req.body);
      // replace with some calls to a real user system
      if (!(ctx.req.body.email === 'admin@admin.com' && ctx.req.body.password === 'admin')) {
        return status(401).send({
          error: 'Could not log in.',
        });
      }

      // fake profile that would come from a db or something
      const profile = {
        user: {
          id: 123,
          email: 'admin@admin.com',
          first_name: 'Admin',
          last_name: 'Account',
        },
      };

      // We are sending the profile inside the token
      const token = jwt.sign(profile, config.jwtSecret, config.jwtOptions);

      return json({
        token,
      });
    }),
  ],
).then((ctx) => {
  console.log(`Server launched on http://localhost:${ctx.options.port}/`);
});
