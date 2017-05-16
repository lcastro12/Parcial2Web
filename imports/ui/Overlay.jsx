import React, { Component } from 'react';

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
	console.log(projection);
	var canv = this.state.canvas;
	var ctx = canv.getContext('2d');

    ctx.beginPath();
	nextProps.tweets.map((tweet) =>{
		console.log(tweet);
		console.log(tweet.coordinates.coordinates);
	  let coordinadas = projection(tweet.coordinates.coordinates);
	  //console.log(coordinadas);
	  var centerX = coordinadas[0];
      var centerY = coordinadas[1];
      var radius = 7;
      
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = 'green';
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#003300';
      ctx.stroke();

	});
	ctx.fill();

}
render(){
	return(
		<canvas  width="600" height="600" ref= {(cancan)=>{this.state.canvas=cancan}}></canvas>
		);
}
}