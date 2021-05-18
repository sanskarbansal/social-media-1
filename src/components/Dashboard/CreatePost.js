import { useState } from "react";
import { TextField, Grid, Button, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Container } from "@material-ui/core";
import React from "react";
import { createPost } from "../../actions/posts";
import { connect } from "react-redux";

function CreatePost(props) {
    const [isOpen, setisOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialog] = useState(false);
    const toggleClose = (val) => () => setisOpen(val);
    const [content, setContent] = useState("");
    const handleOnChange = (event) => {
        setContent(event.target.value);
    };
    const handleSubmit = () => {
        props.dispatch(createPost({ body: content }));
    };

    return (
        <>
            <Grid container alignItems="stretch" justify="center" spacing={2}>
                <Grid item md={8}>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Create Post"
                        variant="outlined"
                        fullWidth
                        style={{ borderRadius: 0 }}
                        onClick={toggleClose(true)}
                    />
                </Grid>
            </Grid>

            <Dialog open={isOpen} fullWidth onBackdropClick={() => setIsConfirmDialog(true)}>
                <DialogTitle color="black">Create Post</DialogTitle>
                <DialogContent>
                    <DialogContentText color="primary" variant="h6">
                        Enter content of the post.
                    </DialogContentText>
                    <TextField id="post" onChange={handleOnChange} label="Post Content" variant="outlined" fullWidth rows="10" multiline />
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
            <Dialog open={isConfirmDialogOpen} fullWidth>
                <DialogTitle>CONFIRMATION</DialogTitle>

                <DialogContent dividers>
                    <DialogContentText variant="h5" color="black" style={{ textAlign: "center" }}>
                        Do you really want to discard this post ?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" fullWidth color="primary" onClick={() => setIsConfirmDialog(false)}>
                        No
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        onClick={() => {
                            setIsConfirmDialog(false);
                            setisOpen(false);
                        }}
                    >
                        Yes
                    </Button>
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
