import React from "react";
import { connect } from "react-redux";
import CreateFields from "./CreateFields";

function Getlist(props) {
	if (props.bugs.length === 0) return <i>Add Bugs... Or Change View...</i>;
	return props.bugs.map((bug) => <CreateFields bug={bug} key={bug.id} />);
}

const mapStateToProps = (state, ownProps) => ({
	bugs: ownProps.bugs,
});

export default connect(mapStateToProps)(Getlist);
