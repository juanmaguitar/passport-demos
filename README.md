# Passport Demos

## Description

This repo contains several demos of using passport to authenticate users using several methods (providers)
- Local authentication (w/ Login & Register pages)
- Google
- Facebook
- Twitter
- Github

This demo is based on the project suggested at:
- http://mherman.org/blog/2013/11/11/user-authentication-with-passport-dot-js/
- http://mherman.org/blog/2013/11/10/social-authentication-with-passport-dot-js/

## Launch project locally

First of all you should start the MongoDB daemon w/ some command like (specify your own path)

    mongod --dbpath ~/data/db

To launch project w/ local auth you can do...

    npm run dev:local

To launch project w/ social auth (google, twitter,... ) you can do...

    npm run dev:social


## Resources

- http://mherman.org/blog/2013/11/10/social-authentication-with-passport-dot-js/
- http://passportjs.org/docs/google
- https://scotch.io/tutorials/easy-node-authentication-google
