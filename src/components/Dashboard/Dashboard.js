import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import CreatePost from "./CreatePost";
export default class Dashboard extends Component {
    render() {
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={8} style={{ width: "100%" }}>
                    <CreatePost />
                </Grid>
            </Grid>
        );
    }
}
