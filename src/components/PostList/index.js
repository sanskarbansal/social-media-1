import React, { Component } from "react";
import { Grid, Card, Container, CardContent, CardActions, Button, Typography } from "@material-ui/core";

function capitalize(input) {
    var words = input.split(" ");
    var CapitalizedWords = [];
    words.forEach((element) => {
        CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
    });
    return CapitalizedWords.join(" ");
}

export default class PostList extends Component {
    render() {
        const posts = this.props.posts;
        return (
            <Container maxWidth="xl">
                <Grid container spacing={1}>
                    {posts.map((post) => {
                        return (
                            <Grid item xs={5} style={{ margin: "20px auto" }}>
                                <Card style={{ minHeight: 300, cursor: "pointer", background: "lightgrey" }}>
                                    <CardContent>
                                        <Typography variant="h5" component="h6">
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {post.body}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        );
    }
}
