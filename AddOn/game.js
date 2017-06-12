height = 10;
width = 10;

shouldAdd = 0;
shouldDelete = 0;

FoodX = 0;
FoodY =0;
PoisonX = 0;
PoisonY= 0;
isGameInProgress = 0;
window.onload = function(){
	c=document.getElementById('gc');
	cc=c.getContext('2d');
	c.style.background = 'lightblue';
	window.addEventListener("keyup", myScript);
	restart();
}



function initSnake(){
array = [0,0,10,0,20,0,30,0];
speedx = 0;
speedy = 10;
}

function update(){
	cc.clearRect(0,0,c.width,c.height);


	if (array.length == 0){
	gameOver();
			return;
}
	xorigin = array[array.length - 2];
	yorigin = array[array.length - 1];
	cc.fillStyle = 'black';
	xorigin = (c.width + ( xorigin + speedx )) %c.width;
	yorigin = (c.height + ( yorigin + speedy ))%c.height;
	cc.fillRect(xorigin,yorigin,width,height);

	processAddFood(xorigin,yorigin);
	processDeleteFood(xorigin,yorigin);
	showAddFood();
	showDeleteFood();
	if (shouldAdd == 0){
		array.splice(0,2);
	}else{
		shouldAdd = 0;
	}
	

	cc.fillStyle = 'green';
	for (i=0;i<array.length/2;i++){
		if (xorigin == array[i*2] && yorigin == array[i*2+1]){
			gameOver();
			return;
		}
		cc.fillRect(array[i*2],array[i*2+1],width,height);
	}

	if (shouldDelete == 0){
		array.push(xorigin);
		array.push(yorigin);
	}else{
		shouldDelete = 0;
	}

}





function createAddFood(){
	FoodX =  Math.floor((Math.random()*c.width)/10)*10;
	FoodY = Math.floor((Math.random()*c.height)/10)*10;
}


function createDeleteFood(){
	PoisonX = Math.floor((Math.random()*c.width)/10)*10;
	PoisonY =  Math.floor((Math.random()*c.height)/10)*10;;

}


function showAddFood(){
	cc.fillStyle = 'orange';
	x = (c.width + ( FoodX)) %c.width;
	y = (c.height + ( FoodY ))%c.height;
	cc.fillRect(x,y,width,height);

}


function showDeleteFood(){
	

	x = (c.width + ( PoisonX)) %c.width;
	y = (c.height + ( PoisonY ))%c.height;
	drawCross(x,y);
	//cc.fillRect(x,y,width,height);

}


function processAddFood(x,y){
	if (x == FoodX && y == FoodY){
		shouldAdd = 1;
		createAddFood();
		//showAddFood();
	}
}


function processDeleteFood(x,y){
	if (x == PoisonX && y == PoisonY){
		shouldDelete = 1;
		createDeleteFood();
		//showDeleteFood();
	}

}


function myScript(event){
	var keyPressed = event.which || event.keyCode || event.charCode;
	if (keyPressed == '37'){
		if (speedy != 0){
			speedx = -10;
			speedy = 0;
		}
	}




	if (keyPressed == '38'){
		if (speedx != 0){
			speedx = 0;
			speedy = -10;
		}

	}

	if (keyPressed == '39'){
		if (speedy != 0){
			speedx = 10;
			speedy = 0;
		}

	}

	if (keyPressed == '40'){
		if (speedx != 0){
			speedx = 0;
			speedy = 10;
		}
	}

	if (keyPressed == '65'){
		shouldAdd = 1;	
	}


	if (keyPressed == '66'){
		shouldDelete = 1;
	}


}


document.addEventListener('DOMContentLoaded', function() {

  document.getElementById("restartButton").addEventListener("click", restart);
});


function restart(){
	if (isGameInProgress == 1){
	gameOver();
	}
	document.getElementById("restartButton").value = "Game in progress";
	isGameInProgress = 1;
	intervalSet = setInterval(update,1000/10);
	initSnake();
	createAddFood();
	createDeleteFood();

}

function gameOver(){
	document.getElementById("restartButton").value = "Game Over Click to Restart";
	cc.clearRect(0,0,c.width,c.height);
	clearInterval(intervalSet);
	
}

function drawCross(x, y) {
	x = x+5;
	y = y+5;
	cc.strokeStyle = 'red';
	
    cc.beginPath();

    cc.moveTo(x - 5, y - 5);
    cc.lineTo(x + 5, y + 5);

    cc.moveTo(x + 5, y - 5);
    cc.lineTo(x - 5, y + 5);
    cc.stroke();
}

