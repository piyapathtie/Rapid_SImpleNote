import React, { Component } from 'react';
import firebase, { auth } from '../firebase';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const { email } = this.state;

        var emailAddress = email;
        console.log(emailAddress)

        auth.sendPasswordResetEmail(emailAddress)
            .then(() => {
                this.props.history.push('/')
            // Email sent.
        }).catch(function(error) {
            // An error happened.
        });



    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { email } = this.state;
        const classes = this.props.classes;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h1>Forget Password</h1>
                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <TextField
                                    id="email"
                                    label="Email"
                                    className={classes.textField}
                                    value={email}
                                    onChange={this.handleChange('email')}
                                    margin="normal"
                                    type="email"
                                />
                                <br />

                                <Button variant="raised" color="primary" type="submit">Send</Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(ForgetPassword);
