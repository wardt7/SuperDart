import React, { Component } from "react"
import KeyButton from "../keyButton/keyButton"
import Input from "../input/input"
import "./keypad.css"

class Keypad extends Component{
    constructor(props){
	super(props)
    }
    render(){
	console.log(this.props)
	return (
		<div className="keypad">
		<table width="100%">
		<tbody>
		<tr>
		<td colSpan="2" className="playerone"><KeyButton clickMethod={this.props.undoScore} turn={this.props.turn} disabled={this.props.checkUndoDisabled()}>UNDO</KeyButton></td>
		<td colSpan="2" className="playertwo"><KeyButton clickMethod={this.props.redoScore} turn={this.props.turn} disabled={this.props.checkRedoDisabled()}>REDO</KeyButton></td>
		</tr>
		<tr>
		<td colSpan="4"><Input turn={this.props.turn}>{this.props.input}</Input></td>
		</tr>
		<tr>
		<td><KeyButton turn={this.props.turn} clickMethod={this.props.appendToInput}>7</KeyButton></td>
		<td><KeyButton turn={this.props.turn} clickMethod={this.props.appendToInput}>8</KeyButton></td>
		<td><KeyButton turn={this.props.turn} clickMethod={this.props.appendToInput}>9</KeyButton></td>
		<td rowSpan="2" className="double"><KeyButton clickMethod={this.props.removeFromInput} disabled={this.props.checkDeleteDisabled()}>DEL</KeyButton></td>
		</tr>
		<tr>
		<td><KeyButton turn={this.props.turn} clickMethod={this.props.appendToInput}>4</KeyButton></td>
		<td><KeyButton turn={this.props.turn} clickMethod={this.props.appendToInput}>5</KeyButton></td>
		<td><KeyButton turn={this.props.turn} clickMethod={this.props.appendToInput}>6</KeyButton></td>
		</tr>
		<tr>
		<td><KeyButton turn={this.props.turn} clickMethod={this.props.appendToInput}>1</KeyButton></td>
		<td><KeyButton turn={this.props.turn} clickMethod={this.props.appendToInput}>2</KeyButton></td>
		<td><KeyButton turn={this.props.turn} clickMethod={this.props.appendToInput}>3</KeyButton></td>
		<td rowSpan="2" className="double"><KeyButton clickMethod={this.props.enterScore}>ENT</KeyButton></td>
		</tr>
		<tr>
		<td><KeyButton turn={this.props.turn} clickMethod={this.props.appendToInput}>0</KeyButton></td>
		<td><KeyButton turn={this.props.turn} clickMethod={this.props.appendToInput}>+</KeyButton></td>
		<td><KeyButton turn={this.props.turn} clickMethod={this.props.appendToInput}>X</KeyButton></td>
		</tr>
		</tbody>
		</table>
		</div>
	)
    }
}


export default Keypad
