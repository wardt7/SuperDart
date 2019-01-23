import React, { Component } from "react"
import "./input.css"

class Input extends Component {
    constructor(props){
	super(props)
    }
    render() {
	let name = ""
	if(this.props.turn % 2 === 0){
	    name = "playerone"
	} else {
	    name = "playertwo"
	}
	return (
		<div className={`input ${name}`}>{this.props.children}</div>
	)
    }
}

export default Input
