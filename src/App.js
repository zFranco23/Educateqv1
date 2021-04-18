import React, { Component } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

import Provider from './Provider/ProviderBackContext';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  constructor(props){
    super(props);
    this.state={logged:false ,attempt:1};
    this.changeLogged=this.changeLogged.bind(this);
    this.offLogged=this.offLogged.bind(this);
  }

  changeLogged(){
    this.setState({logged: true});
  }
  offLogged(){
    this.setState({logged: false});

  }
  render() {
    return (
      <Provider>
        <HashRouter>
            <React.Suspense fallback={loading}>
              <Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login ga={this.changeLogged} {...props}/>} />
                <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                <Route path="/" name="Home" render={props => !this.state.logged  ? <Login ga={this.changeLogged} {...props}/> : <TheLayout logged={this.state.logged} ga={this.offLogged} {...props}/>} />          
              </Switch>
            </React.Suspense>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
