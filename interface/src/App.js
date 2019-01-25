import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Keypad from './components/keypad/keypad'

class App extends Component {
    constructor(props){
	super(props)
	this.state = {
	    turn: 0,
	    playerOneScores: [501],
	    playerTwoScores: [501],
	    playerOneIndex: 0,
	    playerTwoIndex: 0,
	    input: "",
	    evalInput: ""
	}
	this.appendToInput = this.appendToInput.bind(this)
	this.removeFromInput = this.removeFromInput.bind(this)
	this.enterScore = this.enterScore.bind(this)
	this.undoScore = this.undoScore.bind(this)
	this.redoScore = this.redoScore.bind(this)
	this.calculateScore = this.calculateScore.bind(this)
    }
    appendToInput(value){
	let newInput = this.state.input
	let newEvalInput = this.state.evalInput
	newInput = newInput + value
	if(value === "X"){
	    newEvalInput = newEvalInput + "*"
	} else {
	    newEvalInput = newEvalInput + value
	}
	this.setState({ input: newInput, evalInput: newEvalInput })
	// State updates properly only AFTER re-render
	console.log(this.calculateScore(newEvalInput))
    }
    removeFromInput(){
	let newInput = this.state.input
	let newEvalInput = this.state.evalInput
	if(newInput.length > 0){
	    newInput = newInput.slice(0,-1)
	    newEvalInput = newEvalInput.slice(0,-1)
	    console.log(this.calculateScore(newEvalInput))
	} else {
	    console.log(this.calculateScore("0"))
	}
	this.setState({ input: newInput, evalInput: newEvalInput })
	console.log(newInput)
    }
    enterScore(){
	let score = this.calculateScore(this.state.evalInput)
	if(this.state.turn % 2 === 0){
	    let newList = this.state.playerOneScores
	    if(newList.length === this.state.playerOneIndex + 1){
		newList.push(score)
	    } else {
		newList[this.state.playerOneIndex + 1] = score
	    }
	    this.setState({ playerOneScores: newList, playerOneIndex: this.state.playerOneIndex + 1})
	} else {
	    let newList = this.state.playerTwoScores
	    if(newList.length === this.state.playerTwoIndex + 1){
		newList.push(score)
	    } else {
		newList[this.state.playerTwoIndex + 1] = score
	    }
	    this.setState({ playerTwoScores: newList, playerTwoIndex: this.state.playerTwoIndex + 1})
	}
	this.setState({ input: "", evalInput: "", turn: this.state.turn + 1})
    }
    undoScore(){
	// Check the OTHER player's index, as that's what we're updating, NOT the current player's
	if(this.state.turn % 2 === 0){
	    if(this.state.playerTwoIndex > 0){
		this.setState({ playerTwoIndex: this.state.playerTwoIndex - 1, turn: this.state.turn - 1, input: "", evalInput: ""})
	    }
	} else {
	    if(this.state.playerOneIndex > 0){
		this.setState({ playerOneIndex: this.state.playerOneIndex - 1, turn: this.state.turn - 1, input: "", evalInput: ""})
	    }
	}
    }
    redoScore(){
	// Check the OTHER player's index, as that's what we're updating, NOT the current player's
	if(this.state.turn % 2 === 0){
	    if(this.state.playerTwoIndex + 1 !== this.state.playerTwoScores.length){
		this.setState({ playerTwoIndex: this.state.playerTwoIndex + 1, turn: this.state.turn + 1, input: "", evalInput: ""})
	    }
	} else {
	    if(this.state.playerOneIndex + 1 !== this.state.playerOneScores.length){
		this.setState({ playerOneIndex: this.state.playerOneIndex + 1, turn: this.state.turn + 1, input: "", evalInput: ""})
	    }
	}
    }
    calculateScore(newInput){
	let total = null
	if(newInput.slice(-1) === "+" || newInput.slice(-1) === "*"){
	    total = eval(newInput.slice(0,-1))
	} else {
	    total = eval(newInput)
	}
	let newScore = 0
	if(this.state.turn % 2 === 0){
	    newScore = this.state.playerOneScores[this.state.playerOneIndex] - total
	} else {
	    newScore = this.state.playerTwoScores[this.state.playerTwoIndex] - total
	}
	return newScore
    }
    render() {
	return (
		<div>
		<Keypad turn={this.state.turn} input={this.state.input} removeFromInput={this.removeFromInput} appendToInput={this.appendToInput} enterScore={this.enterScore}
	    undoScore={this.undoScore} redoScore={this.redoScore}/>
		</div>
	)
    }
}

export default App
