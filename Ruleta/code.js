let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 1000);

// declarar shit
var jugadores = ["1", "2", "ass", "asd", "asd", "as", "asdsda"]
var colors = ['blue', 'red', 'purple', 'white', 'black']

// container div
var containerDiv = document.getElementById('container');

// creacion de los triangulos letsgoooo

console.log(jugadores.length);
for (let i = 0; i < jugadores.length; i++) {
	console.log(i);


	const triangulo = document.createElement("div");
	triangulo.innerHTML = jugadores[i];
	document.getElementById('container').appendChild(triangulo);
	// triangulo.classList.add("mystyle");
	// var triangulo = document.createElement('div');
	// triangulo.innerText = jugadores[i];
	// triangulo.id = jugadores[i];
	// triangulo = document.getElementById(jugadores[i]);
	triangulo.style.borderBottomColor = colors[i];
	console.log('cosicas -> '+250*((360/jugadores.length)/360*100)/25+', '+(360/jugadores.length)/360*100+', '+(360/jugadores.length)*(i));
	//triangulo.style.transform = 'translateX('+(360/jugadores.length)/360*100+'%) rotate('+(360/jugadores.length)*(i)+'deg)';
	triangulo.style.transform = 'translateX(-50%) rotate('+(360/jugadores.length)*(i)+'deg)';


	triangulo.style.borderLeft = 250*((360/jugadores.length)/360*100)/25+'px solid transparent';

	triangulo.style.borderRight = 250*((360/jugadores.length)/360*100)/25+'px solid transparent';
	triangulo.style.borderBottom = 250*((360/jugadores.length)/360*100)*25+'px solid transparent';


	// containerDiv.appendChild(triangulo);
	delete triangulo;

}

btn.onclick = function () {
	container.style.transform = "rotate(" + number + "deg)";
	number += Math.ceil(Math.random() * 1000);
}

