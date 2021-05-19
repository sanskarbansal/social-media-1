import { Card, CardContent, CardHeader, Typography, CardActions, Button, makeStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import React from "react";
import { toggleLike } from "../../actions/posts";

const useStyles = makeStyles({
    pointer: {
        cursor: "pointer",
    },
});

export default function Post(props) {
    const {
        body,
        createdAt,
        user: { firstName, lastName },
        likes,
    } = props.post;
    const classes = useStyles();

    const handleLike = () => {
        // props.dispatch(toggleLike(props.post._id));
        props.dispatch(toggleLike(props.post._id));
    };
    return (
        <Card variant="elevation">
            <CardHeader title={`${firstName} ${lastName}`} subheader={createdAt} />

            <CardContent>
                <Typography>{body}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button aria-label="add to favorites" onClick={handleLike}>
                    <FavoriteIcon className={classes.pointer} />
                    <Typography>{likes.length}</Typography>
                </Button>
                <Button aria-label="share">
                    <ShareIcon />
                </Button>
            </CardActions>
        </Card>
    );
}
