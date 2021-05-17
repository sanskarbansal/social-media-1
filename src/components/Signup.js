import React, { Component } from "react";
import { TextField, Button, Grid, Typography, withStyles, Paper, CircularProgress, FormControl, InputLabel } from "@material-ui/core";
import { login, loginFailed, signup } from "../actions/auth";
import { connect } from "react-redux";

const styleMe = withStyles({
    field: {
        margin: "5px 0",
    },
    fullWidth: {
        width: "100%",
    },
    btnDisabled: {
        "&$disabled": {
            background: "pink !important",
        },
    },
});

class Login extends Component {
    state = {
        username: "",
        password: "",
        confirm_password: "",
        firstName: "",
        lastName: "",
        email: "",
        number: null,
    };
    handleChange = (field) => (event) => {
        this.setState({
            [field]: event.target.value,
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(signup(this.state));
    };
    render() {
        const { classes } = this.props;
        const { error, inProgress } = this.props.auth;
        return (
            <Grid container alignItems="center" wrap="nowrap" direction="column" justify="space-evenly" spacing={2}>
                <Grid item xs={11} md={8} className={classes.fullWidth}>
                    {error && (
                        <Paper variant="elevation" elevation={2} style={{ background: "#f2225a", color: "white" }}>
                            <Typography variant="h6" align="center" style={{ padding: 5 }}>
                                {error}
                            </Typography>
                        </Paper>
                    )}
                </Grid>
                <Grid item md={8} xs={11} className={classes.fullWidth}>
                    <Paper variant="elevation" elevation={2} style={{ padding: 20 }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="primary">
                                    Sign Up
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                    <Grid container justify="space-between">
                                        <Grid item xs={6}>
                                            <TextField
                                                id="firstName"
                                                onChange={this.handleChange("firstName")}
                                                className={classes.field}
                                                label="First Name"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                onChange={this.handleChange("lastName")}
                                                className={classes.field}
                                                label="Last Name"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <TextField onChange={this.handleChange("email")} className={classes.field} label="Email" variant="outlined" fullWidth />
                                    <TextField
                                        onChange={this.handleChange("number")}
                                        className={classes.field}
                                        label="Mobile Number"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                    />
                                    <TextField
                                        onChange={this.handleChange("username")}
                                        className={classes.field}
                                        label="Username"
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        onChange={this.handleChange("password")}
                                        className={classes.field}
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        fullWidth
                                    />
                                    <TextField
                                        onChange={this.handleChange("confirm_password")}
                                        className={classes.field}
                                        label="Confirm Password"
                                        variant="outlined"
                                        type="password"
                                        fullWidth
                                    />

                                    <Button variant="contained" className={classes.btnDisabled} color="primary" type="submit" disabled={inProgress} fullWidth>
                                        {inProgress ? <CircularProgress color="primary" /> : "Sign Up"}
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(styleMe(Login));
