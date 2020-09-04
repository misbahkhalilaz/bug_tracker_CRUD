import React from "react";
import { connect } from "react-redux";
import { visibilityFilters } from "../redux/actionTypes";
import { changeFilter } from "../redux/actionCreators";
import { Button, ButtonGroup, InputGroup } from "react-bootstrap";

function Views(props) {
	return (
		<>
			<InputGroup className="mb-3" style={{ paddingLeft: "100px" }}>
				<InputGroup.Prepend>
					<InputGroup.Text>View:</InputGroup.Text>
				</InputGroup.Prepend>
				<ButtonGroup>
					<Button
						variant="outline-info"
						onClick={() => props.changeFilter(visibilityFilters.SHOW_ALL)}
					>
						All
					</Button>
					<Button
						variant="outline-info"
						onClick={() => props.changeFilter(visibilityFilters.SHOW_ACTIVE)}
					>
						Active
					</Button>
					<Button
						variant="outline-info"
						onClick={() => props.changeFilter(visibilityFilters.SHOW_COMP)}
					>
						Resolved
					</Button>
				</ButtonGroup>
			</InputGroup>
		</>
	);
}

export default connect(null, { changeFilter })(Views);
