import hoistStatics from 'hoist-non-react-statics';
import PT from 'prop-types';
import React from 'react';

import * as inputTypes from './inputs';

import css from '../styles/form.css';
import { deepGet, immutableDeepSet } from '../utils/objectHelpers';

export default configFn => WrappedForm => hoistStatics(class Form extends React.PureComponent {
	static propTypes = {
		values: PT.objectOf(PT.any),
	};

	static defaultProps = {
		values: {},
	};

	constructor(props) {
		super();

		this.fieldCache = {};
		this.config = configFn(props);

		this.state = {
			errors: {},
			values: this.generateDefaultValues(props.values),
		};
	}

	componentWillReceiveProps(props) {
		this.config = configFn(props);
	}

	getFieldPath(fieldName) {
		return (this.config.fields[fieldName].name || fieldName)
			.replace(/\]/g, '')
			.replace(/\[/g, '.');
	}

	createHandleUpdate = fieldName => {
		const path = this.getFieldPath(fieldName);
		return value => {
			const values = immutableDeepSet(this.state.values, path, value);
			this.setState({ values });
		};
	}

	fieldValid(fieldName, validators, value) {
		return validators.reduce((a, b) => a.then(b), Promise.resolve(value))
			.then(finalValue => {
				this.setState({
					errors: {
						...this.state.errors,
						[fieldName]: undefined,
					},
				});

				return finalValue;
			})
			.catch(err => {
				this.setState({
					errors: {
						...this.state.errors,
						[fieldName]: err.message,
					},
				});

				throw err;
			});
	}

	formValidate = () => {
		const { values } = this.state;

		const promises = Object.keys(this.config.fields)
			.filter(fieldName => (
				this.config.fields[fieldName].validators !== undefined
			))
			.map(fieldName => this.fieldValid(
				fieldName,
				this.config.fields[fieldName].validators,
				values[fieldName],
			));

		return Promise.all(promises)
			.then(() => values);
	}

	// eslint-disable-next-line class-methods-use-this
	generateDefaultValues(givenValues) {
		let values = { ...givenValues };

		Object.keys(this.config.fields).forEach(fieldName => {
			const path = this.getFieldPath(fieldName);
			const value = deepGet(values, path);
			if (value !== undefined) {
				return;
			}

			const { type } = this.config.fields[fieldName];
			values = immutableDeepSet(values, path, inputTypes[type].defaultValue || '');
		});

		return values;
	}

	generateFields() {
		const { values } = this.state;

		const fields = {};
		Object.keys(this.config.fields).forEach(fieldName => {
			if (this.fieldCache[fieldName]) {
				fields[fieldName] = this.fieldCache[fieldName];
				return;
			}

			const { type, ...field } = this.config.fields[fieldName];
			const handleUpdate = this.createHandleUpdate(fieldName);
			const InputType = inputTypes[type];

			delete field.validators;

			fields[fieldName] = () => (
				<InputType
					name={fieldName}
					{...field}
					defaultValue={deepGet(values, this.getFieldPath(fieldName))}
					error={this.state.errors[fieldName]}
					onUpdate={handleUpdate}
				/>
			);

			this.fieldCache[fieldName] = fields[fieldName];
		});

		return fields;
	}

	render() {
		return (
			<div className={css.form}>
				<WrappedForm
					{...this.props}
					fields={this.generateFields()}
					formValidate={this.formValidate}
					values={this.state.values}
				/>
			</div>
		);
	}
}, WrappedForm);
