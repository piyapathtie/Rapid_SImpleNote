import React, { Component } from 'react';
import firebase, { auth, db } from '../firebase';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/ModeEdit';
import List, {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    ListItemIcon
} from 'material-ui/List';
import Icon from 'material-ui/Icon';

import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import CancelIcon from '@material-ui/icons/Cancel'
import Divider from 'material-ui/Divider';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    list: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        maxWidth: 360,
        // maxHeight: 200,
        overflow: 'auto',
    },
    bootstrapRoot: {
        padding: 0,
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },

});

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes : [],
            current : "",
            newpassword: "",
            retype: "",
            email: "",
            name: "",
            open: false,
            openName: false,
            openEmail: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        // const uid = auth.currentUser.uid;
        // let notesRef = db.ref('notes/' + uid).orderByKey().limitToLast(100);
        // notesRef.on('child_added', snapshot => {
        //     let note = { text: snapshot.val(), id: snapshot.key };
        //     this.setState({ notes: [note].concat(this.state.notes) });
        // })
        var user = firebase.auth().currentUser;

        if (user != null) {
            this.setState({email: auth.currentUser.email, name: auth.currentUser.displayName})
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    handleClickName = () => {
        this.setState({ openName: !this.state.openName });
    };

    handleClickEmail = () => {
        this.setState({ openEmail: !this.state.openEmail });
    };

    changePassword = () => {
        // const user = firebase.auth().currentUser;

        if (this.state.newpassword === this.state.retype){
            console.log(this.state.newpassword)
            auth.currentUser.updatePassword(this.state.newpassword).then(function() {
                // Update successful.
                console.log("Update successful.")
                alert("Complete");
            }).catch(function(error) {
                // An error happened.
                console.log(error)
            });
        }
        else{
            console.log("else")
            alert("Password does not match");
        }
    };

    changeName = () => {
        // console.log(this.state.name);
        auth.currentUser.updateProfile({
            displayName: this.state.name,
        }).then(function() {
            // Update successful.
        }).catch(function(error) {
            // An error happened.
        });
    };

    changeEmail = () => {
        console.log(this.state.email);
        auth.currentUser.updateEmail(this.state.email).then(function() {
            // Update successful.
            auth.currentUser.sendEmailVerification().then(function() {
                // Email sent.
                alert("Please verify your new email");
            }).catch(function(error) {
                // An error happened.
            });
        }).catch(function(error) {
            // An error happened.
        });
    };

    render() {
        const classes = this.props.classes;
        return (
            <Grid container className={classes.container}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        {/*<p>Hello, { auth.currentUser.email }</p>*/}
                        <List className={classes.list}>

                            <ListItem>
                                <ListItemText primary={"Name: " + this.state.name} />
                                {this.state.openName ?
                                    <IconButton aria-label="cancel" onClick={this.handleClickName}>
                                        <CancelIcon />
                                    </IconButton>
                                    :
                                    <IconButton aria-label="edit" onClick={this.handleClickName}>
                                        <EditIcon />
                                    </IconButton>}
                            </ListItem>
                            <Divider />
                            <Collapse in={this.state.openName} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem className={classes.nested}>
                                        <form>
                                            <TextField
                                                id="newName"
                                                label="New Name"
                                                className={classes.textField}
                                                value={this.state.name}
                                                onChange={this.handleChange('name')}
                                                margin="normal"
                                                type="text"
                                            />
                                            <br/>
                                            <Button variant="raised" color="primary" onClick={this.changeName}>Save Changes</Button>
                                        </form>
                                    </ListItem>
                                </List>
                            </Collapse>

                            <Divider />

                            <ListItem>
                                <ListItemText primary={"Email: " + this.state.email} />
                                {this.state.openEmail ?
                                    <IconButton aria-label="cancel" onClick={this.handleClickEmail}>
                                        <CancelIcon />
                                    </IconButton>
                                    :
                                    <IconButton aria-label="edit" onClick={this.handleClickEmail}>
                                        <EditIcon />
                                    </IconButton>}
                            </ListItem>
                            <Divider />
                            <Collapse in={this.state.openEmail} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem className={classes.nested}>
                                        <form>
                                            <TextField
                                                id="newEmail"
                                                label="New Email"
                                                className={classes.textField}
                                                value={this.state.email}
                                                onChange={this.handleChange('email')}
                                                margin="normal"
                                                type="email"
                                            />
                                            <br/>
                                            <Button variant="raised" color="primary" onClick={this.changeEmail}>Save Changes</Button>
                                        </form>
                                    </ListItem>
                                </List>
                            </Collapse>


                            <Divider />

                            <ListItem>
                                <ListItemText primary="Change Password" />
                                {this.state.open ?
                                    <IconButton aria-label="cancel" onClick={this.handleClick}>
                                        <CancelIcon />
                                    </IconButton>
                                    :
                                    <IconButton aria-label="edit" onClick={this.handleClick}>
                                        <EditIcon />
                                    </IconButton>}
                            </ListItem>
                            <Divider />
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem className={classes.nested}>
                                        <form>
                                            <TextField
                                                id="new"
                                                label="New Password"
                                                className={classes.textField}
                                                value={this.state.newpassword}
                                                onChange={this.handleChange('newpassword')}
                                                margin="normal"
                                                type="password"
                                            />
                                            <br/>
                                            <TextField
                                                id="retype"
                                                label="Retype New Password"
                                                className={classes.textField}
                                                value={this.state.retype}
                                                onChange={this.handleChange('retype')}
                                                margin="normal"
                                                type="password"
                                            />
                                            <br/>

                                            <Button variant="raised" color="primary" onClick={this.changePassword}>Save Changes</Button>
                                        </form>
                                    </ListItem>
                                </List>
                            </Collapse>

                        </List>

                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Profile);
