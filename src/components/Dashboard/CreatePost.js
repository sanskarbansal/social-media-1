import { useState, useEffect, useRef } from "react";
import { TextField, Grid, Button, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Typography } from "@material-ui/core";
import React from "react";
import { createPost } from "../../actions/posts";
import { connect } from "react-redux";
import Markdown from "../Makrdown";

let pos = null;

function CreatePost(props) {
    const [isOpen, setisOpen] = useState(false);
    const toggleClose = (val) => () => setisOpen(val);
    const [content, setContent] = useState("");
    const handleOnChange = (event) => {
        setContent(event.target.value);
    };
    let inputRef = useRef(null);
    useEffect(() => {
        if (pos == null) return;
        inputRef.current.selectionStart = pos + 1;
        inputRef.current.selectionEnd = pos + 1;
    }, [content]);

    const handleSubmit = () => {
        props.dispatch(createPost({ body: content }));
        setisOpen(false);
        setContent("");
    };
    const handleTab = (event) => {
        if (inputRef.current == null) inputRef.current = event.target;
        if (event.keyCode === 9) {
            event.preventDefault();
            pos = event.target.selectionStart;
            setContent(content.substr(0, pos) + "\t" + content.substr(pos));
        } else {
            pos = null;
        }
    };
    return (
        <>
            <Grid container alignItems="stretch" justify="center" spacing={2}>
                <Grid item md={9} style={{ width: "100%" }}>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Create Post"
                        variant="outlined"
                        fullWidth
                        onClick={toggleClose(true)}
                    />
                </Grid>
            </Grid>

            <Dialog open={isOpen} fullScreen onClose={() => setisOpen(false)}>
                <DialogTitle color="black">Create Post</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText color="primary" variant="h6">
                        Enter content of the post.
                    </DialogContentText>
                    <TextField
                        onKeyDown={handleTab}
                        id="post"
                        value={content}
                        onChange={handleOnChange}
                        label="Post Content"
                        variant="outlined"
                        fullWidth
                        rows="10"
                        multiline
                    />

                    <Typography variant="h5" color="textPrimary" align="center" style={{ textDecoration: "underline" }}>
                        OUTPUT
                    </Typography>
                    <Markdown content={content} />
                </DialogContent>
                <DialogActions>
                    <Grid container justify="center">
                        <>
                            <Button onClick={toggleClose(false)} color="secondary" variant="contained" style={{ width: "40%", marginRight: 5 }}>
                                Discard
                            </Button>
                            <Button onClick={handleSubmit} color="primary" variant="contained" style={{ width: "40%", marginLeft: 5 }}>
                                Post
                            </Button>
                        </>
                    </Grid>
                </DialogActions>
            </Dialog>

            {/* <Grid item md={4}>
                <Button variant="contained" color="secondary" style={{ height: "100%" }}>
                Create Post
                </Button>
            </Grid> */}
        </>
    );
}

export default connect(null, null)(CreatePost);
