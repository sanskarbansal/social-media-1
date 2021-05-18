import "./App.css";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import jwtdecode from "jwt-decode";
import Dashboard from "./Dashboard/Dashboard";
import { loginSuccess } from "../actions/auth";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";

import Settings from "./Dashboard/Setting";

const style = withStyles((theme) => {
    return {
        center: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
    };
});

class App extends Component {
    componentDidMount() {
        const token = window.localStorage.getItem("token");
        if (token) {
            const user = jwtdecode(token);
            this.props.dispatch(loginSuccess(user));
        }
    }

    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <ProtectedRoute path="/setting" component={Settings} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
});

export default connect(mapStateToProps)(style(App));
