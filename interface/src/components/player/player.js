import React, { Component } from "react"
import "./player.scss"

class Player extends Component{
    constructor(props){
	super(props)
	this.state = {
	    windowWidth: undefined
	}
	this.getHeaderOrder = this.getHeaderOrder.bind(this)
	this.setupHistory = this.setupHistory.bind(this)
    }
    getHeaderOrder(){
	let playerType = this.props.playerType
	let playerColor = this.props.getColor(playerType)
	if(playerType === "playerone"){
	    return (
		    <table className={`header ${playerColor}`}>
		    <tbody>
		    <tr>
		    <td></td>
		    <td><h2 className={`name ${playerColor}`}>{this.props.playerName}</h2></td>
		    <td><h2 className={`legs ${playerColor} ${playerType}`}>{this.props.playerLegs}</h2></td>
		    </tr>
		    </tbody>
		    </table>
	    )
	} else {
	    return (
		    <table className={`header ${playerColor}`}>
		    <tbody>
		    <tr>
		    <td><h2 className={`legs ${playerType} ${playerType}`}>{this.props.playerLegs}</h2></td>
		    <td><h2 className={`name ${playerType}`}>{this.props.playerName}</h2></td>
		    <td></td>
		    </tr>
		    </tbody>
		    </table>
	    )
	}
    }
    setupHistory(){
	let playerType = this.props.playerType
	let playerColor = this.props.getColor(playerType)
	let playerHistory = this.props.playerHistory.slice(0,-1)
	let score = this.props.getScore(playerType)
	let altered = ""
	if(score[1]){
	    if(score[2]){
		altered = "bad"
	    } else {
		altered = "good"
	    }
	}
	if(window.innerWidth > 800){
	    return(
		    <div>
		    <div className={`history ${playerColor} ${playerType}`}>
		    <p>Previous Scores</p>
		    {playerHistory.reverse().map((item) =>
							    <p>{item}</p>
							   )}
		    </div>
		    <h1 className={`score ${altered} ${playerColor}`}>{score[0]}</h1>
		    </div>
	    )
	} else {
	    return(
			<h1 className={`score ${altered}`}>{score[0]}</h1>
	    )
	}
    }
    render() {
	let playerType = this.props.playerType
	let playerColor = this.props.getColor(playerType)
	return (
		<div className={`player ${playerColor}`}>
		{this.getHeaderOrder()}
	    {this.setupHistory()}
		</div>
	)
    }
    componentDidMount() {
	const self = this;
	window.addEventListener("orientationchange", function(event){
	    self.setState({windowWidth: window.innerWidth})
	}, false)
	window.addEventListener("resize", function(){
	    self.setState({windowWidth: window.innerWidth})
	}, false)
    }
	
}

export default Player
