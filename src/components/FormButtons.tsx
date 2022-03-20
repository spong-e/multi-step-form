import React from "react";
import { useSteps } from "../context";

function FormButtons() {
	const { prev, next, progress, jump, total, current } = useSteps();

	return (
		<>
			{progress > 0 && (
				<button data-testid="prev" onClick={prev}>
					Prev
				</button>
			)}
			{progress < 1 && (
				<button data-testid="next" type="submit">
					Next
				</button>
			)}{" "}
		</>
	);
}

export default FormButtons;
