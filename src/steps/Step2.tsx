import * as React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormButtons from "../components/FormButtons";
import { useSteps } from "../context";
import { useEffect, useState } from "react";

const StorageKey = "step2";
interface Data {
	email: string;
	password: string;
	confirmPassword: string;
}

function Step2() {
	const { prev, next, progress, jump, total, current } = useSteps();
	const [data, setData] = useState<Data | null>(null);

	useEffect(() => {
		const localData = localStorage.getItem(StorageKey);

		if (!localData) return;
		const parsed = JSON.parse(localData);

		setData(parsed);
	}, []);

	const initialValues = {
		email: data === null ? "" : data.email,
		password: data === null ? "" : data.password,
		confirmPassword: data === null ? "" : data.confirmPassword,
	};

	return (
		<Formik
			enableReinitialize={true}
			initialValues={initialValues}
			validationSchema={Yup.object().shape({
				email: Yup.string()
					.email("Email is invalid")
					.required("Email is required"),
				password: Yup.string()
					.min(6, "Password must be at least 6 characters")
					.required("Password is required"),
				confirmPassword: Yup.string()
					.oneOf([Yup.ref("password"), null], "Passwords must match")
					.required("Confirm Password is required"),
			})}
			onSubmit={(fields) => {
				localStorage.setItem(StorageKey, JSON.stringify(fields, null, 4));
				next();
			}}
			render={({ errors, status, touched }) => (
				<Form>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<Field
							name="email"
							type="text"
							className={
								"form-control" +
								(errors.email && touched.email ? " is-invalid" : "")
							}
						/>
						<ErrorMessage
							name="email"
							component="div"
							className="invalid-feedback"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<Field
							name="password"
							type="password"
							className={
								"form-control" +
								(errors.password && touched.password ? " is-invalid" : "")
							}
						/>
						<ErrorMessage
							name="password"
							component="div"
							className="invalid-feedback"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="confirmPassword">Confirm Password</label>
						<Field
							name="confirmPassword"
							type="password"
							className={
								"form-control" +
								(errors.confirmPassword && touched.confirmPassword
									? " is-invalid"
									: "")
							}
						/>
						<ErrorMessage
							name="confirmPassword"
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
	);
}

export default Step2;
