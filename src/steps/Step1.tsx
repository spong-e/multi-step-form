import * as React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSteps } from "../context";
import FormButtons from "../components/FormButtons";
import { useEffect, useState } from "react";

interface StepComponentProps {
	onSave: () => void;
}

interface Data {
	firstName: string;
	lastName: string;
}

const StorageKey = "step1";

function Step1() {
	const { prev, next, progress, jump, total, current } = useSteps();
	const [data, setData] = useState<Data | null>(null);

	useEffect(() => {
		const localData = localStorage.getItem(StorageKey);

		if (!localData) return;
		const parsed = JSON.parse(localData);

		setData(parsed);
	}, []);

	const initialValues = {
		firstName: data === null ? "" : data.firstName,
		lastName: data === null ? "" : data.lastName,
	};

	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={initialValues}
				validationSchema={Yup.object().shape({
					firstName: Yup.string().required("First Name is required"),
					lastName: Yup.string().required("Last Name is required"),
				})}
				onSubmit={(fields) => {
					localStorage.setItem(StorageKey, JSON.stringify(fields, null, 4));
					next();
				}}
				render={({ errors, status, touched }) => (
					<Form>
						<div className="form-group">
							<label htmlFor="firstName">First Name</label>
							<Field
								name="firstName"
								type="text"
								className={
									"form-control" +
									(errors.firstName && touched.firstName ? " is-invalid" : "")
								}
							/>
							<ErrorMessage
								name="firstName"
								component="div"
								className="invalid-feedback"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="lastName">Last Name</label>
							<Field
								name="lastName"
								type="text"
								className={
									"form-control" +
									(errors.lastName && touched.lastName ? " is-invalid" : "")
								}
							/>
							<ErrorMessage
								name="lastName"
								component="div"
								className="invalid-feedback"
							/>
						</div>

						<div className="form-group">
							<FormButtons />
						</div>
					</Form>
				)}
			/>
		</>
	);
}

export default Step1;
