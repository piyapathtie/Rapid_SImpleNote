import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { auth } from '../firebase';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';

import PrivateRoute from './PrivateRoute';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import Verify from './Verify';
import ForgetPassword from './ForgetPassword'
import Profile from './Profile'

import './App.css';

const theme = createMuiTheme();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            authenticated: false,
            currentUser: null };
        }

    componentWillMount() { auth.onAuthStateChanged(user => {
        if (user) {
            if (!user.emailVerified){
                this.setState({
                        authenticated: true,
                        currentUser: user,
                        loading: false },
                    () => { this.props.history.push('/verify') }
                );
            }
            else{
                this.setState({
                        authenticated: true,
                        currentUser: user,
                        loading: false },
                    () => { this.props.history.push('/') }
                );
            }
        }
        else {
            this.setState({
                authenticated: false,
                currentUser: null,
                loading: false
            });
        }
        });
    }

    render () {
        const { authenticated, loading } = this.state;
        const content = loading ? (
            <div align="center">
                <CircularProgress size={80} thickness={5} />
            </div>
        ) : (
            <div>
                <PrivateRoute
                    exact
                    path="/"
                    component={Main}
                    authenticated={authenticated}
                    />
                <PrivateRoute
                    exact
                    path="/profile"
                    component={Profile}
                    authenticated={authenticated}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/verify" component={Verify} />
                <Route exact path="/forgetpassword" component={ForgetPassword} />

            </div>
        );
        return (
            <MuiThemeProvider theme={theme}>
                <div >
                    <AppBar position="static" color="default">
                        <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="title" color="inherit" style={{order:1}}>
                                Simple Note
                            </Typography>
                            <div style={{order:2}}>
                                <form onSubmit={()=>this.props.history.push('/')}>
                                    { authenticated &&
                                    <Button variant="raised" color="default" type="submit"> Main </Button>
                                    }
                                    { authenticated &&
                                    <Button variant="raised" color="default" onClick={() => this.props.history.push('/profile')}> Profile </Button>
                                    }
                                    { authenticated &&
                                    <Button variant="raised" color="default" onClick={() => auth.signOut()}>Log out</Button>
                                    }
                                </form>

                            </div>

                        </Toolbar>
                    </AppBar>
                    { content }
                </div>
            </MuiThemeProvider>
         );
    }
}

export default withRouter(App);
