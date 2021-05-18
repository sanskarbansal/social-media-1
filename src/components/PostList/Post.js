import { Card, CardContent, CardHeader, Typography, CardActions, IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import React from "react";

export default function Post(props) {
    const {
        body,
        createdAt,
        user: { firstName, lastName },
    } = props.post;
    return (
        <Card variant="elevation">
            <CardHeader title={`${firstName} ${lastName}`} subheader={createdAt} />

            <CardContent>
                <Typography>{body}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
