import "./App.css";
import Navbar from "./Navbar/";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Login from "./Login";
import Signup from "./Signup";
import jwtdecode from "jwt-decode";

import PropTypes from "prop-types";
import { loginSuccess } from "../actions/auth";
import Home from "./Home";
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
        const { posts, loading } = this.props.posts;
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        );
    }
}

App.propTypes = {
    posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    posts: state.posts,
});

export default connect(mapStateToProps)(style(App));
