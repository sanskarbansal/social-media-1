import React, { Component } from "react";
import { Grid, Card, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import Post from "./Post";
class PostList extends Component {
    render() {
        const { posts, loading } = this.props.posts;
        return (
            <Grid container direction="column" alignItems="center" spacing={2}>
                {posts.map((post) => (
                    <Grid item md={8} xs={10} style={{ width: "100%" }} key={post._id}>
                        <Post post={post} dispatch={this.props.dispatch} />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
});
export default connect(mapStateToProps)(PostList);
