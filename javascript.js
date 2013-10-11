
var canvas = document.getElementById("idCanvas");
var context = canvas.getContext("2d");

var cons = document.getElementById("idConsole");

var hero = new Image();
hero.src = "rogue.png";

var enemy = new Image();
enemy.src = "octopod.png"

var fence = new Image();
fence.src = "fence.png"

//This isn't ready
//var keys = document.getElementById("idKeyHandler");

var xSize = 16;
var ySize = 24;

//Dice variables


var btnAction = document.getElementById("idRandom");

var numberOfBarriers;

window.addEventListener("focus", function()
{
	keys.focus();
});

var coordinates = new Array(11);
for (var i =0; i <11; i++) {
	coordinates[i] = new Array(11);			
}

/*This turns coordinates into a multiplaction table,
 *each node stores its x index increased by one and its y index increased by one
 *since the first of each array is indexed as 0
 */

for (var i=0; i<11; i++) {
	for (var j=0; j<11; j++) {
		coordinates[i][j] = (i+1)*(j+1);
	}
}


/////////////////////////////////////////////////////////////////////
//This isn't ready yet, I don't think this is actually how you do it. You need createActor.prototype but I didn't have time to look it up
function createActor(name)
{
	this.desc = name;
	this.xPos = "default";
	this.yPos = "default";
	this.color = "default";
	this.maxHP = "default";
	this.armorClass = "default";
}

//This was trying to figure out how to instantiate a class, but it didn't work. Console.log prints undefined.
//var dudeguy = createActor("erik");
//console.log(dudeguy.desc);

function autoLoader()
{
	canvasBackground();
	heroLoader();
	enemyLoader();
	barrier();
	//Will make up to 15 barriers with random placement. No collision detection yet. 
	randomBarrier(RNG(15));
	//keys.focus();
}

function heroLoader()
{
	context.drawImage(hero, 0, 0);
	//For future reference, you can also size the images this way (16 x 24)
	//context.drawImage(hero, 0, 0, 16, 24);
	//context.drawImage(hero, 0, 0, xSize, ySize);
}

function enemyLoader()
{
	context.drawImage(enemy, 160, 240);
	cons.innerHTML = "Can you defeat your enemy?";
}

function canvasBackground()
{
	context.fillStyle = "#212121";
	context.fillRect(0, 0, 176, 264);
}

function barrier()
{
	for (i = 0; i < 240; i=i+16)
	{
		context.drawImage(fence, i, 120);
	}
}

/////////
// because the array (which here is 8x11, runs on values of 0-7 and 0-10,
// we don't need to add one to the randomization, if we are doing it to determine
// placement inside the matrix, random()*8 generates 0-7, the indexes of the array

//Changed the functions here so that you can roll die or just get a random number from 0 to maxNum
function RNG(maxNum)
{
	return Math.floor(Math.random()*maxNum);
	//On second thought, I think that assigning it a variable is superfluous unless we want to use that number for other arguments.
	//return dice; 
}

//They see me rollin'
function rollDice(maxDie)
{
	return Math.floor(Math.random()*maxDie + 1);
}

//Removed console.log(), I get it
//Now this function will do a random amount of barriers
function randomBarrier(length)
{
	for (var i = 0; i < length; i++)
	{
		placementX = RNG(11);
		placementY = RNG(11);
		context.drawImage(fence, placementX*xSize, placementY*ySize);
	}
	
}

//This is what I think we need for a keyhandler
//window.addEventListener('keydown', whatKey, true);


btnAction.onclick = randomBarrier;
window.onload = autoLoader;
