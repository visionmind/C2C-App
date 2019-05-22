import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default (
  <div>
    <div className="container-fluid mt-5">
      <Switch>
        <Route exact path="/" component={() => (<div>Main</div>)} />
        <Route path="/login" component={() => (<div>Login</div>)} />
        <Route path="/register" component={() => (<div>Register</div>)} />
      </Switch>
    </div>
  </div>
);
