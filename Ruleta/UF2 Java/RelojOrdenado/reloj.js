function mostrarHora() {
	var fecha = new Date();
	var horas = fecha.getHours();
	var minutos = fecha.getMinutes();
	var segundos = fecha.getSeconds();

	// Agregar un cero delante de los números menores a 10
	horas = (horas < 10 ? "0" : "") + horas;
	minutos = (minutos < 10 ? "0" : "") + minutos;
	segundos = (segundos < 10 ? "0" : "") + segundos;

	// Mostrar la hora en el formato "hh:mm:ss"
	var horaActual = horas + ":" + minutos + ":" + segundos;
	document.getElementById("reloj").innerHTML = horaActual;
}

// Actualizar la hora cada segundo
setInterval(mostrarHora, 1000);