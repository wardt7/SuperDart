import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import './App.css'
import Keypad from './components/keypad/keypad'
import Player from './components/player/player'

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
	this.checkUndoDisabled = this.checkUndoDisabled.bind(this)
	this.checkRedoDisabled = this.checkRedoDisabled.bind(this)
	this.checkDeleteDisabled = this.checkDeleteDisabled.bind(this)
	this.getScore = this.getScore.bind(this)
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
	let calculatedScore = this.calculateScore(this.state.evalInput, true)
	if(calculatedScore[1] !== false){
	    return false
	}
	let score = calculatedScore[0]
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
	return true
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
	// Check the CURRENT player's index, as that's what we're updating
	if(this.state.turn % 2 === 0){
	    if(this.state.playerOneIndex + 1 < this.state.playerOneScores.length){
		this.setState({ playerOneIndex: this.state.playerOneIndex + 1, turn: this.state.turn + 1, input: "", evalInput: ""})
	    }
	} else {
	    if(this.state.playerTwoIndex + 1 < this.state.playerTwoScores.length){
		this.setState({ playerTwoIndex: this.state.playerTwoIndex + 1, turn: this.state.turn + 1, input: "", evalInput: ""})
	    }
	}
    }
    calculateScore(newInput, entry = false){
	let total = null
	let invalid = false
	if(newInput.slice(-1) === "+" || newInput.slice(-1) === "*"){
	    total = eval(newInput.slice(0,-1))
	} else {
	    total = eval(newInput)
	}
	if(newInput === ""){
	    total = 0
	}
	if(isNaN(total)){
	    if(entry){
		toast.error("Could not save score; The input was invalid in some way (e.g. multiple adjacent operators)!")
	    } else {
		toast.warning("Check your input, it's invalid!")
	    }
	    return ["ERROR", true]
	}
	if(total > 180){
	    if(entry){
		toast.error("Could not save score; The entered score is more than 180!")
	    } else {
		toast.warning("The current score is more than 180; will not be able to save!")
	    }
	    invalid = true
	}
	let newScore = 0
	if(this.state.turn % 2 === 0){
	    newScore = this.state.playerOneScores[this.state.playerOneIndex] - total
	} else {
	    newScore = this.state.playerTwoScores[this.state.playerTwoIndex] - total
	}
	if(newScore < 0){
	    if(entry){
		toast.error("Could not save score. The entered score is bust!")
	    } else {
		toast.warning("The score entered is bust; will not be able to save!")
	    }
	    invalid = true
	}
	return [newScore, invalid]
    }
    checkUndoDisabled(){
	// true if disabled
	if(this.state.turn < 1){
	    return true
	}
	return false
    }
    checkRedoDisabled(){
	// true if disabled
	if(this.state.turn % 2 === 0){
	    if(this.state.playerOneIndex + 1 < this.state.playerOneScores.length){
		return false
	    }
	} else {
	    if(this.state.playerTwoIndex + 1 < this.state.playerTwoScores.length){
		return false
	    }
	}
	return true
    }
    checkDeleteDisabled(){
	// true if disabled
	if(this.state.input === ""){
	    return true
	}
	return false
    }
    getScore(player){
	let score = 0
	if(player === "playerone"){
	    if(this.state.input !== "" && this.state.turn % 2 === 0){
		return([this.calculateScore(this.state.evalInput)[0], true])
	    }
	    score = this.state.playerOneScores[this.state.playerOneIndex]
	} else {
	    if(this.state.input !== "" && this.state.turn %2 !== 0){
		return([this.calculateScore(this.state.evalInput)[0], true])
	    }
	    score = this.state.playerTwoScores[this.state.playerTwoIndex]
	}
	return([score, false])
    }
    render() {
	return (
		<div>
		<Player playerName="Player One" playerType="playerone" getScore={this.getScore}/>
		<Player playerName="Player Two" playerType="playertwo" getScore={this.getScore}/>
		<Keypad turn={this.state.turn} input={this.state.input} removeFromInput={this.removeFromInput} appendToInput={this.appendToInput} enterScore={this.enterScore}
	    undoScore={this.undoScore} redoScore={this.redoScore} checkUndoDisabled={this.checkUndoDisabled} checkRedoDisabled={this.checkRedoDisabled} checkDeleteDisabled={this.checkDeleteDisabled}/>
		<ToastContainer position="top-center" />
		</div>
	)
    }
}

export default App
