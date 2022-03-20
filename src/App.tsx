import React from "react";
import { Steps, useSteps } from "./context";
import { Step1, Step2, Step3, Step4 } from "./steps";

const App = () => {
	const onStepChange = () => {
		console.log("Step Changed");
	};

	return (
		<div className="steps_wrapper">
			<h1>Multi step form</h1>
			<StepsComponent onStepChange={onStepChange} startsFrom={1} />
		</div>
	);
};

interface StepsComponentProps {
	onStepChange: () => void;
	startsFrom: number;
}

export const StepsComponent: React.FC<StepsComponentProps> = (props) => {
	const { prev, next, progress, jump, total, current } = useSteps();

	return (
		<>
			<Steps onStepChange={props.onStepChange} startsFrom={props.startsFrom}>
				<Step1 />
				<Step2 />
				<Step3 />
				<Step4 />
			</Steps>

			{/* <button data-testid="jump" onClick={() => jump(3)}>
				Jump to Step 3
			</button> */}
			{/* <div data-testid="total">Total: {total}</div>
			<div data-testid="current">Current: {current}</div>
			<div data-testid="progress">Progress: {progress * 100}%</div> */}
		</>
	);
};

export default App;
