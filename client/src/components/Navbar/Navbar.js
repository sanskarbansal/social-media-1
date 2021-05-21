import React from "react";
import { AppBar, Toolbar, List, ListItem, ListItemText, makeStyles, Container, Hidden, Button, InputBase, fade, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Home from "@material-ui/icons/Home";
import { SideDrawer } from "./SideDrawer";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { nominalTypeHack } from "prop-types";

const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
        width: "100%",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
    },
    list: {
        width: 250,
    },
    navDisplayFlex: {
        display: "flex",
        justifyContent: "flex-end",
        flexGrow: 1,
    },
    linkText: {
        textDecoration: "none",
        textTransform: "uppercase",
        color: "white",
    },
}));

// const navLinks = [
//     { title: `about us`, path: `/about-us` },
//     { title: `product`, path: `/product` },
//     { title: `blog`, path: `/blog` },
//     { title: `contact`, path: `/contact` },
//     { title: `faq`, path: `/faq` },
// ];

function Navbar(props) {
    const classes = useStyles();
    const navLinks = [];
    if (props.auth.isLoggedIn) {
        const { firstName } = props.auth.user;
        navLinks.push({ title: firstName, path: "/setting" });
        navLinks.push({ title: "Logout", path: "/logout" });
    }
    return (
        <div style={{ marginBottom: 80 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Link to="/dashboard" style={{ textDecoration: "none", width: "450px" }}>
                        <Button>
                            <p>Social Media</p>
                            <Home />
                        </Button>
                    </Link>
                    <Hidden smDown>
                        <Container maxWidth="xs">
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </div>
                        </Container>
                    </Hidden>
                    <Container className={classes.navDisplayFlex} maxWidth="xl">
                        <Hidden smDown>
                            <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                                {navLinks.map(({ title, path }) => {
                                    return (
                                        <Link key={title} to={path} className={classes.linkText}>
                                            <ListItem button>
                                                <ListItemText primary={title} />
                                            </ListItem>
                                        </Link>
                                    );
                                })}
                            </List>
                        </Hidden>
                        <Hidden mdUp>
                            <SideDrawer navLinks={navLinks} />
                        </Hidden>
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
