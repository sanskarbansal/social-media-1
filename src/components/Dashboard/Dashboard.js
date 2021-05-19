import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/posts";
import PostList from "../PostList/PostList";
import CreatePost from "./CreatePost";
class Dashboard extends Component {
    componentDidMount() {
        // console.log(this.props.dispatch);
        this.props.dispatch(fetchPosts());
    }

    render() {
        return (
            <Grid container alignItems="center" direction="column" spacing={5}>
                <Grid item xs={10} md={8} style={{ width: "100%" }}>
                    <CreatePost />
                </Grid>
                <Grid item xs={10} style={{ width: "100%", padding: 2 }}>
                    <PostList />
                </Grid>
            </Grid>
        );
    }
}

export default connect(null, null)(Dashboard);
