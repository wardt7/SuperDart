import React, { Component } from "react"
import "./keyButton.css"

class KeyButton extends Component{
    constructor(props){
	super(props)
	this.handleButtonClick = this.handleButtonClick.bind(this)
    }
    handleButtonClick(event){
	event.stopPropagation()
	console.log(this.props)
	this.props.clickMethod(this.props.children)
    }
    render(){
	let name = ""
	if(this.props.children === "ENT"){
	    name = "green"
	}
	else if (this.props.children === "DEL"){
	    name = "red"
	} else if (this.props.turn % 2 === 0){
	    name = "playerone"
	} else {
	    name = "playertwo"
	}
	return (
		<div onClick={this.handleButtonClick} className={`btn-wrapper ${name}`}>
		{this.props.children}
	    </div>
	)
    }
}

export default KeyButton
	    
