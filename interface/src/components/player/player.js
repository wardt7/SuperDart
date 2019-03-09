import React, { Component } from "react"
import "./player.css"

class Player extends Component{
    constructor(props){
	super(props)
	this.getHeaderOrder = this.getHeaderOrder.bind(this)
    }
    getHeaderOrder(){
	let playerType = this.props.playerType
	if(playerType === "playerone"){
	    return (
		    <table className={`header ${playerType}`}>
		    <tbody>
		    <tr>
		    <td></td>
		    <td><h2 className={`name ${playerType}`}>{this.props.playerName}</h2></td>
		    <td><h2 className={`legs ${playerType}`}>{this.props.playerLegs}</h2></td>
		    </tr>
		    </tbody>
		    </table>
	    )
	} else {
	    return (
		    <table className={`header ${playerType}`}>
		    <tbody>
		    <tr>
		    <td><h2 className={`legs ${playerType}`}>{this.props.playerLegs}</h2></td>
		    <td><h2 className={`name ${playerType}`}>{this.props.playerName}</h2></td>
		    <td></td>
		    </tr>
		    </tbody>
		    </table>
	    )
	}
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
		{this.getHeaderOrder()}
		<h1 className={`score ${altered}`}>{score[0]}</h1>
		</div>
	)
    }
}

export default Player
