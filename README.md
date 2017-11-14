Server.js JWT Example
=====================

> An example on how to use [Server.js](https://serverjs.io/) with JWT authentication.

## Quick Start

* `npm install`
* copy `example-config.js` to `config.js`
* update `config.js` with the correct details
* `npm start`

## Setup

#### Home Route

The default page is unauthenticated by default. And returns a simple login form that shows how the login works.

#### Authenticating a user

```
POST http://localhost:3000/login

{
    "username": "john.doe",
    "password": "foobar"
}
```

This will return the token as an object:

```
{
    "token": "some.crazy.string"
}
```

You can then access protected routes behind the authentication middleware:

```
GET http://localhost:3000/protected

{
    message: 'hello! thanks for the token',
    user: {
        id: 123,
        email: 'admin@admin.com',
        first_name: 'Admin',
        last_name: 'Account',
    },
}
```

### Coding style

Airbnb has an excellent [style guide](https://github.com/airbnb/javascript) for ES6. We will follow the guide and adhere to the recommended coding style.

### ESLint

We will use ESLint with Airbnb style and pre-parse our code to detect violations of the style.

## Commands

### Run

```
npm start
```

## License

  [MIT](LICENSE)