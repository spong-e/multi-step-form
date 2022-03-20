import * as React from "react";
import FormButtons from "../components/FormButtons";

function Step3() {
	return (
		<div data-testid="step3">
			<h1>Step 3</h1>
			<p>This is Step 3.</p>
			<div className="form-group">
				<FormButtons />
			</div>
		</div>
	);
}

export default Step3;
