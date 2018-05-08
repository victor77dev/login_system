# login_system
This is a demo project for login system using React + Express + Passport.

There are 2 versions of login system in this project, authentication in both of them are based on Passport.

1. **Server based (Express + jade)**
  
   Express + Passport handle the auth logic and jade handles the ui rendering
   
   Demo: https://victor77dev-login-system-sev.herokuapp.com

   ```
   Note: It may take some time for first loading as server is inactive.
         Server was set to inactive if it is idle for a long time.
   ```

2. **Client + Server (React + Express)**

   Express + Passport handle the auth logic and React handles the ui rendering
   
   Demo: https://victor77dev-login-system.herokuapp.com

   ```
   Note: It may take some time for first loading as server is inactive.
         Server was set to inactive if it is idle for a long time.
   ```
   
I hosted the demo using [Heroku](https://www.heroku.com) for Express and React, [mlab](https://www.mlab.com) for MongoDB.
   
**Credit to**: https://www.youtube.com/watch?v=hb26tQPmPl4

Most of parts in **Server based** version are based on this video


## Major Tools
* React (https://reactjs.org)
   > for frontend
* Express (https://expressjs.com)
   > for backend
* Passport
   > for authentication
* Bcrypt
   > for encrypting password before saving into DB
* React-Redux
   > for basic React & data interaction
* React-Router-Dom
   > for React path routing
* Redux-Thunk
   > for React & data interaction
* Redux-Form
   > for creating forms in React
* Mongoose
   > for MongoDB
* Axios
   > for basic server & client interaction (api calls)

Branches
========
### simple_login
   The basic login system using Express + jade + Passport
### login_react
   The login system using Express + Passport as backend and React as frontend
### heroku_server
   The settings used to config backend project in Heroku (Server based version + api for React version)
### heroku_client
   The settings used to config frontend project in Heroku (React project)
   
Tags
========
### Server_simple_login, Server_email_login
   The basic login system using Express + jade + Passport (Login using username, Login using email)
### Client_login, Client_login_v0, Client_login_v0.1
   The login system using Express + Passport as backend and React as frontend (with differnet updates & bug fixes)
### Client_login_all_in_1_commit
   An old version where all the React commits packed into 1 commit (Difficult to read, suggest to check Client_login_v0.1)
