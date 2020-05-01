import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { bugRemoved } from "../redux/actionCreators";
import Getlist from "./GetList";
import filterBugs from "../redux/selectors/selectByVisibility";

function Body(props) {
	return (
		<>
			<Getlist bugs={props.bugs} />
			<Button
				variant="outline-danger"
				size="sm"
				style={{ marginTop: "10px" }}
				onClick={() => {
					props.bugs.forEach((obj) =>
						obj.resolved ? props.bugRemoved(obj.id) : null
					);
				}}
				block
			>
				Delete Selected
			</Button>
		</>
	);
}

const mapStateToProps = (state) => ({
	bugs: filterBugs(state),
});

export default connect(mapStateToProps, { bugRemoved })(Body);
