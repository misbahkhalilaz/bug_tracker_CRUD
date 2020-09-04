import React, { useState } from "react";
import { connect } from "react-redux";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { icons } from "./icons";
import { bugResolved, bugRemoved, bugUpdated } from "../redux/actionCreators";

function CreateFields(props) {
	const [value, setValue] = useState(props.bug.description);
	const [editFlag, setEditFlag] = useState("readOnly");
	const fieldRef = React.createRef();
	const dispatchUpdate = () => {
		setEditFlag("readOnly");
		props.bugUpdated(props.bug.id, fieldRef.current.value);
	};
	const enableEdit = () => {
		setEditFlag(null);
		fieldRef.current.focus();
	};

	return (
		<InputGroup style={{ marginTop: "10px" }}>
			<InputGroup.Prepend>
				{props.bug.resolved ? (
					<Button
						variant="outline-info"
						size="sm"
						onClick={() => props.bugResolved(props.bug.id)}
					>
						{icons.checked}
					</Button>
				) : (
					<Button
						variant="outline-dark"
						size="sm"
						onClick={() => props.bugResolved(props.bug.id)}
					>
						{icons.check}
					</Button>
				)}
			</InputGroup.Prepend>
			<FormControl
				type="text"
				as="input"
				placeholder="Bug Description"
				onChange={(e) => setValue(e.target.value)}
				value={value}
				readOnly={editFlag}
				ref={fieldRef}
				style={{ backgroundColor: props.bug.resolved ? "#c3fba5" : "#c8daf7" }}
			/>
			<InputGroup.Append>
				{editFlag === "readOnly" ? (
					<Button variant="warning" onClick={enableEdit}>
						{icons.edit}
					</Button>
				) : (
					<Button variant="secondary" onClick={dispatchUpdate}>
						{icons.edited}
					</Button>
				)}
			</InputGroup.Append>
			<InputGroup.Append>
				<Button
					variant={props.bug.resolved ? "warning" : "danger"}
					onClick={() => props.bugRemoved(props.bug.id)}
				>
					{icons.delete}
				</Button>
			</InputGroup.Append>
		</InputGroup>
	);
}
const mapStateToProps = (state, ownProps) => ({
	bug: ownProps.bug,
});

export default connect(mapStateToProps, {
	bugRemoved,
	bugResolved,
	bugUpdated,
})(CreateFields);
