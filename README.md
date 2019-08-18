# Stories - study work

This is my stydy work.
It is based on CRA and mainly uses the following libraries and frameworks: React, Redux, Styled Components, Express, Passport, Mongoose, etc.

## Api and data flow

This app uses JSON oriented API.

### On server

The server responds to a request with a JSON document.

#### Ok

If the server can process the request, response object will be sent with `res.jsonOk([objectToMerge])` custom method.


Example:
```
{
  ok: true,
  user: {name: 'Nick'}
}
```
Example if user not found in DB:
```
{
  ok: true,
  user: null
}
```

#### Reject

If the server can not process the request or some error has occured response object will be sent with `res.jsonReject([someMesage, status])` custom method. By default status is 400.


Example:
```
{
  ok: false,
  message: 'You are not authorized to complete this action.'
}
```

### On client

On client side uses custom fetch module `/client/src/utils/fetchJSON.js`. This module logs responses and requests(for post req) in no-production mode and sets needed headers. The module is used through methods: fetchJSON.get(url), fetchJSON.post(url, dataObject), etc.


If server response with not ok status and have not JSON object, object will be created locally, for example:
```
{
  ok: false,
  message: 'Unexpected error'
}
```

fetchJSON methods **always** return resolved promise with data object as value. In turn Redux actions also return resolved promise with data object as value to component(or another place where it was called).

## Changing react scripts with react-app-rewired

This app use react-app-rewired with react-app-rewire-styled-components. This needed to provide babel-plugin-styled-components for styled components class naming.
Settings stored in config-overrides.js. Most of react-scripts replaced by react-app-rewired.

## Available Scripts

### Global

#### `npm run start`

Runs the server without defining a mode.

#### `npm run build`

Runs `npm install` and `npm run build` from /client sripts. Mainly need for deploy at heroku.

#### `npm run client`

Runs `npm run start` from /client sripts.

#### `npm run server`

Uses nodemon package to runs the server without defining a mode.
Nodemon will reload server if any error will occurred.

#### `npm run dev`

Uses concurrently package to runs `npm run server` and `npm run client` commands in parallel.

### Client

In the project directory, you can run:

#### `npm run start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
