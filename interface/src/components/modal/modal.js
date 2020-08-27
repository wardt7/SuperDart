import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import './modal.css'

class Modal extends Component {
    constructor(props){
	super(props)
	this.handleModalExitClick = this.handleModalExitClick.bind(this)
	this.handleModalContentClick = this.handleModalContentClick.bind(this)
    }
    handleModalExitClick(event){
	this.props.onModalExitClick()
    }
    handleModalContentClick(event){
	event.stopPropagation()
	return null
    }
    render(){
	let SettingsSchema = Yup.object().shape({
	    start: Yup.number().integer("You must use an integer value!").required("A start value is required!"),
	    playerOneColor: Yup.string().required("A color is required!"),
	    playerTwoColor: Yup.string().required("A color is required!")
	})
	return(
		<div className="modal" onClick={this.handleModalExitClick}>
		<div className="modalContent" onClick={this.handleModalContentClick}>
		<Formik initialValues={{start: 501, playerOneColor: "orange", playerTwoColor: "blue"}} validationSchema={SettingsSchema} onSubmit={values => this.props.onFormSubmission(values)}>
		{({errors, touched}) => (
			<Form className="signupForm">
			<p className="modalText">Starting Score:</p>
			<Field component="select" name="start">
			<option value={501}>501</option>
			<option value={301}>301</option>
			<option value={170}>170</option>
			<option value={701}>701</option>
			<option value={1001}>1001</option>
			</Field>
			{errors.start && touched.start ? (
				<div className="error">{errors.start}</div>
			) : null}
			<p className="modalText">Player One Colour:</p>
			<Field component="select" name="playerOneColor">
			<option value="orange">Orange</option>
			<option value="pink">Pink</option>
			<option value="blue">Blue</option>
			</Field>
			{errors.playerOneColor && touched.playerOneColor ? (
				<div className="error">{errors.playerOneColor}</div>
			) : null}
			<p className="modalText">Player Two Colour:</p>
			<Field component="select" name="playerTwoColor">
			<option value="orange">Orange</option>
			<option value="pink">Pink</option>
			<option value="blue">Blue</option>
			</Field>
			{errors.playerTwoColor && touched.playerTwoColor ? (
				<div className="error">{errors.playerTwoColor}</div>
			) : null}
			<button className="formButton" type="submit">Start Game</button>
			</Form>
		)}
	        </Formik>
		</div>
		</div>
	)
    }
}

export default Modal
