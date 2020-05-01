import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { icons } from "./icons";
import { bugAdded } from "../redux/actionCreators";
import { InputGroup, FormControl, Button } from "react-bootstrap";

function InputForm(props) {
	const [value, setValue] = useState("");
	const inputRef = React.createRef();
	useEffect(() => inputRef.current.focus());
	return (
		<>
			<h1 style={{ textAlign: "center" }}>Bug Tracker</h1>
			<InputGroup className="mb-3">
				<FormControl
					type="text"
					as="input"
					placeholder="Bug Description"
					ref={inputRef}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<InputGroup.Append>
					<Button
						onClick={() => {
							props.bugAdded(inputRef.current.value);
							setValue("");
							inputRef.current.focus();
						}}
					>
						{icons.add}
					</Button>
				</InputGroup.Append>
			</InputGroup>
		</>
	);
}

export default connect(null, { bugAdded })(InputForm);
