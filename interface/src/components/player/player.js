import React, { Component } from "react"
import "./player.css"

class Player extends Component{
    constructor(props){
	super(props)
    }
    render() {
	let playerType = this.props.playerType
	let score = this.props.getScore(playerType)
	let altered = ""
	if(score[1]){
	    if(score[2]){
		altered = "bad"
	    } else {
		altered = "good"
	    }
	}
	return (
		<div className={`player ${playerType}`}>
		<h2 className={`${playerType}`}>{this.props.playerName}</h2>
		<h1 className={`score ${altered}`}>{score[0]}</h1>
		</div>
	)
    }
}

export default Player
