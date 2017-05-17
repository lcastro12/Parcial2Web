import React, { Component } from 'react';
import './Overlay.css';
export default class Overlay extends Component{
constructor(props) {
		super(props);
		this.canvas = null;
	}

componentWillUpdate(nextProps){
	//console.log(nextProps.tweets);
	let projection = nextProps.getProjection();
	//console.log(projection);
	var canv = this.canvas;
	var ctx = canv.getContext('2d');
    ctx.clearRect(0,0,600,600);
    ctx.beginPath();
	nextProps.tweets.map((tweet) =>{
		//console.log(tweet);
		//console.log(tweet.coordinates.coordinates);
	  let coordenadas = projection(tweet.coordinates.coordinates);
	  //console.log(coordenadas);
	  var centerX = coordenadas[0];
      var centerY = coordenadas[1];
      var radius = 3;
      ctx.moveTo(centerX, centerY);
      var num = Math.floor(Math.random() * 3) + 1;
      if(num == 1){
      	ctx.fillStyle = 'yellow';
      }
      else if(num ==2){
      	ctx.fillStyle = 'blue';
      }
      else if(num ==3){
      	ctx.fillStyle = 'red';
      }
      console.log(num);
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
       ctx.fill();
      //ctx.lineWidth = 5;
      //ctx.strokeStyle = '#003300';
      //ctx.stroke();
	});

}
render(){
	return(
		<div className="puntitos">
		<canvas  width="600" height="600" ref= {(cancan)=>{this.canvas=cancan}}></canvas>
		</div>
		);
}
}