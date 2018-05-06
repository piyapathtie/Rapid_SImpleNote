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

class Verify extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        const { email, password } = this.state;
        const classes = this.props.classes;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h1>Please verify your email</h1>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Verify);
