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
	if(!this.props.disabled){
	    this.props.clickMethod(this.props.children)
	}
    }
    render(){
	let name = ""
	if(this.props.children === "ENT"){
	    name = "ENT"
	} else if (this.props.children === "DEL"){
	    name = "DEL"
	} else if (this.props.children === "UNDO"){
	    // Set colour to that of previous player
	    if(this.props.turn % 2 === 0){
		name = "UNDO playertwo"
	    } else {
		name = "UNDO playerone"
	    }
	} else if (this.props.children === "REDO"){
	    // Set colour to that of "next" player"
	    if(this.props.turn % 2 === 0){
		name = "REDO playerone"
	    } else {
		name = "REDO playertwo"
	    }
	} else if (this.props.turn % 2 === 0){
	    name = "playerone"
	} else {
	    name = "playertwo"
	}
	if(this.props.disabled){
	    name += " disabled"
	}
	return (
		<div onClick={this.handleButtonClick} className={`btn-wrapper ${name}`}>
		{this.props.children}
	    </div>
	)
    }
}

export default KeyButton
	    
