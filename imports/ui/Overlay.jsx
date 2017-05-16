import React, { Component } from 'react';
import './Overlay.css';
export default class Overlay extends Component{
constructor(props) {
		super(props);
		this.state = ({
			canvas : null,
		});
	}

componentWillUpdate(nextProps){
	//console.log(nextProps.tweets);
	let projection = nextProps.getProjection();
	//console.log(projection);
	var canv = this.state.canvas;
	var ctx = canv.getContext('2d');

    ctx.beginPath();
	nextProps.tweets.map((tweet) =>{
		//console.log(tweet);
		//console.log(tweet.coordinates.coordinates);
	  let coordenadas = projection(tweet.coordinates.coordinates);
	  //console.log(coordenadas);
	  var centerX = coordenadas[0];
      var centerY = coordenadas[1];
      var radius = 4;
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = 'green';
      //ctx.lineWidth = 5;
      //ctx.strokeStyle = '#003300';
      //ctx.stroke();


	});
	 ctx.fill();

}
render(){
	return(
		<div className="puntitos">
		<canvas  width="600" height="600" ref= {(cancan)=>{this.state.canvas=cancan}}></canvas>
		</div>
		);
}
}