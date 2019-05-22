import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
);

export default App;
