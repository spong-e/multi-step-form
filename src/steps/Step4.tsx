import * as React from "react";
import FormButtons from "../components/FormButtons";

function Step4() {
	return (
		<div data-testid="step4">
			<h1>Step 4</h1>
			<p>This is Step 4.</p>
			<div className="form-group">
				<FormButtons />
			</div>
		</div>
	);
}

export default Step4;
