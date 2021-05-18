import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

function ProtectedRoute(props) {
    const Component = props.component;
    if (props.auth.isLoggedIn && props.auth.user) return <Route path={props.path} render={(propsH) => <Component {...propsH} />} />;
    return <Route path={props.path} render={() => <Redirect to={{ pathname: "/", from: { pathname: props.location.pathname } }} />} />;
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(ProtectedRoute);
