import React, { Component } from "react"
import "./keyButton.scss"

class KeyButton extends Component{
    constructor(props){
	super(props)
	this.handleButtonClick = this.handleButtonClick.bind(this)
    }
    handleButtonClick(event){
	event.stopPropagation()
	if(!this.props.disabled){
	    this.props.clickMethod(this.props.children)
	}
    }
    render(){
	let name = ""
	let buttonText = ""
	if(this.props.children === "ENT"){
	    name = "ENT"
	    buttonText = "ER SCORE"
	} else if (this.props.children === "DEL"){
	    name = "DEL"
	    buttonText = "ETE"
	} else if (this.props.children === "UNDO"){
	    buttonText = " LAST SCORE"
	    // Set colour to that of previous player
	    if(this.props.turn % 2 === 0){
		name = `UNDO ${this.props.getColor("playertwo")}`
	    } else {
		name = `UNDO ${this.props.getColor("playerone")}`
	    }
	} else if (this.props.children === "REDO"){
	    buttonText = " SCORE"
	    // Set colour to that of "next" player"
	    if(this.props.turn % 2 === 0){
		name = `REDO ${this.props.getColor("playerone")}`
	    } else {
		name = `REDO ${this.props.getColor("playertwo")}`
	    }
	} else if (this.props.turn % 2 === 0){
	    name = `${this.props.getColor("playerone")}`
	} else {
	    name = `${this.props.getColor("playertwo")}`
	}
	if(this.props.disabled){
	    name += " disabled"
	}
	return (
		<div onClick={this.handleButtonClick} className={`btn-wrapper ${name}`}>
		{this.props.children}{buttonText}
	    </div>
	)
    }
}

export default KeyButton
	    
