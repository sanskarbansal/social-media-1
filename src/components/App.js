import "./App.css";
import Navbar from "./Navbar/";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from "react";
import { fetchPosts } from "../actions/posts";
import PostList from "./PostList/";
import { CircularProgress, makeStyles } from "@material-ui/core";

import PropTypes from "prop-types";

const classes = {
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

class App extends Component {
    componentDidMount() {
        this.props.dispatch(fetchPosts());
    }

    render() {
        const { posts, loading } = this.props.posts;
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    {loading ? (
                        <div style={classes.center}>
                            <CircularProgress style={{ fontSize: 70 }} />
                        </div>
                    ) : (
                        <PostList posts={posts} />
                    )}
                </div>
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

export default connect(mapStateToProps)(App);
