
var canvas = document.getElementById("idCanvas");
var context = canvas.getContext("2d");

var cons = document.getElementById("idConsole");

//var keys = document.getElementById("idKeyHandler");

function hero(name) {
	this.image=new Image();
	this.image.src="rogue.png";
	this.x=0;
	this.y=0;
	this.pass=false;
	
	this.desc = name;
	this.color = "default";
	this.maxHP = "default";
	this.armorClass = "default";
}

function enemy() {
	this.image=new Image();
	this.image.src="octopod.png";
	this.x=0;
	this.y=0;
	this.pass=false;
	
	this.desc = "octopod";
	this.color = "default";
	this.maxHP = "default";
	this.armorClass = "default";
}

function fence() {
	this.image=new Image();
	this.image.src="fence.png";
	this.x=0;
	this.y=0;
	this.pass=false;
	
	this.desc = "fence";
	this.color = "default";
	this.maxHP = "default";
	this.armorClass = "default";
}

function tile() {
	this.x=0;
	this.y=0;
	this.pass=true;
	
	this.desc = "a tile";
}

var keys = document.getElementById("idKeyHandler");

var xSize = 16;
var ySize = 24;

var mapWidth = 11;
var mapHeight = 11;

var btnAction = document.getElementById("idRandom");

var numberOfBarriers;

window.addEventListener("focus", function()
{
	keys.focus();
});

var coordinates = new Array(mapWidth);
for (var i =0; i <mapWidth; i++) {
	coordinates[i] = new Array(mapHeight);			
}

for (var i=0; i<mapWidth; i++) {
	for (var j=0; j<mapHeight; j++) {
		coordinates[i][j] = 0;
	}
}

function autoLoader()
{
	canvasBackground();
	heroLoader();
	enemyLoader();
	barrier(5);
	keys.focus();
}

function heroLoader()
{
	var actor = new hero("NyanCat");
	coordinates[actor.x][actor.y] = actor;
	redrawCoordinates();
}

function enemyLoader()
{
	var octopod = new enemy();
	octopod.x = mapWidth-1;
	octopod.y = mapHeight-1;
	coordinates[octopod.x][octopod.y] = octopod;

	cons.innerHTML = "Can you defeat your enemy?";
	
	redrawCoordinates();
}

function canvasBackground()
{
	context.fillStyle = "#212121";
	context.fillRect(0, 0, 176, 264);
}

function barrier(y)
{
	for (i=0; i<mapWidth; i++) {
		var f = new fence();
		f.x = i;
		f.y = y;
		coordinates[f.x][f.y] = f;
	}
	redrawCoordinates();
}

function RNG(maxNum)
{
	return Math.floor(Math.random()*maxNum);
}

function rollDice(maxDie)
{
	return Math.floor(Math.random()*maxDie + 1);
}

function randomBarrier()
{
	var f = new fence();
	f.x = RNG(mapWidth);
	f.y = RNG(mapHeight);
	if (coordinates[f.x][f.y] == 0) {
		coordinates[f.x][f.y] = f;
	}
	redrawCoordinates();
	
}

function redrawCoordinates() {
	canvasBackground();
	
	for (var i=0; i < mapWidth; i++) {
		for (var j=0; j < mapHeight; j++) {
			if (coordinates[i][j] != 0) {
				context.drawImage(coordinates[i][j].image, i*xSize, j*ySize);
			}
		}
	}
}



window.onload = autoLoader;
//canvas.setAttribute("tabindex", 0);

btnAction.onclick = randomBarrier;
