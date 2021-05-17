import React, { useState } from "react";
import { Button, ButtonGroup, Grid, makeStyles, Paper } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import Login from "./Login";
import Signup from "./Signup";

import "./Home.css";

const useStyle = makeStyles({
    fullWidth: {
        width: "100%",
    },
});

export default function Home() {
    const classes = useStyle();
    const [isLoginForm, setLoginForm] = useState(true);
    console.log(isLoginForm);
    return (
        <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item className={classes.fullWidth} xs={8}>
                <Paper elevation={1}>
                    <ButtonGroup fullWidth color="primary">
                        <Button onClick={() => setLoginForm(1)} variant={`${isLoginForm ? "contained" : "outlined"}`}>
                            Login
                        </Button>
                        <Button onClick={() => setLoginForm(0)} variant={`${!isLoginForm ? "contained" : "outlined"}`}>
                            Sign Up
                        </Button>
                    </ButtonGroup>
                </Paper>
            </Grid>
            <Grid item className={classes.fullWidth} xs={12}>
                <CSSTransition in={!isLoginForm} timeout={300} classNames="slideMe">
                    {isLoginForm ? <Login /> : <Signup />}
                </CSSTransition>
            </Grid>
        </Grid>
    );
}
