import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configure from './aws-exports';
import {Amplify} from 'aws-amplify'
import {Provider} from './context/Provider'

Amplify.configure({
    ...configure,
    "aws_user_pools_id": process.env.REACT_APP_USER_POOL_ID,
    "aws_user_pools_web_client_id": process.env.REACT_APP_USER_POOLS_WEB_CLIENT_ID,
})

ReactDOM.render(
  <React.StrictMode>
      <Provider>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
