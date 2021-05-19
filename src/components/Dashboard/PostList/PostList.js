import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Post from "./Post";
class PostList extends Component {
    render() {
        const { posts } = this.props.posts;

        return (
            <Grid container direction="column" alignItems="center" spacing={2}>
                {posts.map((post) => (
                    <Grid item md={9} xs={12} style={{ width: "100%" }} key={post._id}>
                        <Post post={post} dispatch={this.props.dispatch} userId={this.props.user._id} />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    user: state.auth.user,
});
export default connect(mapStateToProps)(PostList);
