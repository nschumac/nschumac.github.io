let score = 0;

let direction = "WEST";

const randomNumber = (max, min) =>
{
	return Math.floor((Math.random() * max) + min);
}

let game;

const randomSnack = () =>
{
	let snack = document.getElementById("snack");
	let num = game[randomNumber(game.length - 1, 0)];
	snack.style.top = num.x + "px";
	snack.style.left = num.y + "px";
}

let snake = [ {x: 640,y: 360}, {x: 640 - 25,y: 360 }, {x: 640 - 50 ,y: 360} ]
let snake1 = [ {x: 640,y: 360}, {x: 640 - 25,y: 360 }, {x: 640 - 50 ,y: 360} ]

const endgame = () =>
{
	alert("Your final Score is: " + score);
	document.getElementById("startbtn").style.display = "initial";
}

let is_alive =true;

document.addEventListener("keydown", event =>
{
	if (event.key == "w")
		direction = "NORTH";
	else if (event.key == "a")
		direction = "WEST";
	else if (event.key == "s")
		direction = "SOUTH"
	else if (event.key == "d")
		direction = "EAST"
});

const moveSnake = () =>
{
	let i;
	for ( i = snake.length - 1; i > 0; i--)
	{
		snake[i].x = snake[i - 1].x;
		snake[i].y = snake[i - 1].y;
	}
	if (direction == "WEST")
		snake[0].x -= 25;
	if (direction == "EAST")
		snake[0].x += 25;
	if (direction == "NORTH")
		snake[0].y -= 25;
	if (direction == "SOUTH")
		snake[0].y += 25;
	if (snake[0].x < 0 || snake[0].x + 25 > 1280 || snake[1].y < 0 || snake[1].y + 25 > 720)
		is_alive = false;
}

const drawSnake = () =>
{
	let node = document.getElementsByClassName("c-gameSnakeBody");
	while (node[0])
		node[0].parentNode.removeChild(node[0]);

	for (let i = 0; i < snake.length; i++)
	{
		let newSnake = document.createElement("span");
		newSnake.setAttribute('class', "c-gameSnakeBody");
		newSnake.style.left = snake[i].x + "px";
		newSnake.style.top = snake[i].y + "px";
		newSnake.style.zIndex = 2;
		document.getElementById("gamesection").appendChild(newSnake);
	}
}


const gameloop = () =>
{
	if (is_alive)
	{
		setTimeout(function onTick()
		{
			moveSnake();
			let snack = document.getElementById("snack");
			if (parseInt(snack.style.left) > snake[0].x && parseInt(snack.style.left) < (snake[0].x + 25) && parseInt(snack.style.top) > snake[0].y  && parseInt(snack.style.top)  < (snake[0].y + 25))
			{

				randomSnack();
				snake.push({x: snake[snake.length - 1].x + 25, y: snake[snake.length - 1].y})
				score++;
			}
			drawSnake();
			gameloop();		
		}, 100)
	}
	else
	{
		endgame();
		snake = JSON.parse(JSON.stringify(snake1));
	}
}


const start = ()=>
{
	for (let i = 0; i < 720; i += 20)
	{
		for (let j = 0;j < 1280; j += 20)
		{
			game.push({x:j, y:i});
		}
	}
	document.getElementById("startbtn").style.display = "none";
	is_alive = true;
	randomSnack();
	gameloop();
	game = {};
}


