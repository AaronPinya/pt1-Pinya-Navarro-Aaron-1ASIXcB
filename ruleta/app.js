async function fetchNamesFromFile() {
	try {
	  const response = await fetch('noms.txt');
	  const text = await response.text();
	  return text.split('\n');
	} catch (err) {
	  console.error('Error fetching names:', err);
	  return [];
	}
  }
  let names = [];

  function drawWheel() {
	// Draw the wheel with names onto the canvas
  }
  
  function spinWheel() {
	// Animate the wheel spinning
	// Choose a random name after the spinning stops
  }
  
  (async function init() {
	names = await fetchNamesFromFile();
	if (names.length === 0) {
	  alert('Error fetching names. Please make sure "noms.txt" is available.');
	  return;
	}
  
	drawWheel();
  
	const spinButton = document.getElementById('spinButton');
	spinButton.addEventListener('click', spinWheel);
  })();
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const wheelRadius = canvas.width / 2;
  let currentRotation = 0;
  
  function drawSegment(name, index, totalSegments) {
	const angle = (2 * Math.PI) / totalSegments;
	const startAngle = index * angle;
	const endAngle = (index + 1) * angle;
  
	// Draw the segment
	ctx.beginPath();
	ctx.moveTo(wheelRadius, wheelRadius);
	ctx.arc(wheelRadius, wheelRadius, wheelRadius, startAngle, endAngle);
	ctx.closePath();
	ctx.fillStyle = index % 2 === 0 ? '#f1c40f' : '#e67e22';
	ctx.fill();
	ctx.stroke();
  
	// Draw the name
	ctx.save();
	ctx.translate(wheelRadius, wheelRadius);
	ctx.rotate((startAngle + endAngle) / 2);
	ctx.fillStyle = '#fff';
	ctx.font = '18px Arial';
	ctx.textAlign = 'right';
	ctx.fillText(name, wheelRadius - 10, 0);
	ctx.restore();
  }
  
  function drawWheel() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  
	const totalSegments = names.length;
	names.forEach((name, index) => {
	  drawSegment(name, index, totalSegments);
	});
  }
  
  function spinWheel() {
	const spinDuration = 5; // 5 seconds
	const randomAngle = 360 * 4 + Math.random() * 360; // Spin 4 full rounds plus a random angle
  
	gsap.to(canvas, {
	  rotation: currentRotation + randomAngle,
	  duration: spinDuration,
	  ease: 'power3.out',
	  onUpdate: () => {
		currentRotation = gsap.getProperty(canvas, 'rotation');
		drawWheel();
	  },
	  onComplete: () => {
		const winningIndex = Math.floor(names.length * (1 - (currentRotation % 360) / 360));
		alert(`The winner is: ${names[winningIndex]}!`);
	  },
	});
  }
// Obtener el interruptor y la etiqueta de modo oscuro
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const darkModeLabel = document.querySelector('#dark-mode-label');

// Escuchar el evento de cambio en el interruptor
darkModeToggle.addEventListener('change', () => {
  // Agregar o quitar la clase 'dark-mode' del cuerpo del documento
  document.body.classList.toggle('dark-mode');

  // Actualizar el texto de la etiqueta de modo oscuro
  if (document.body.classList.contains('dark-mode')) {
    darkModeLabel.textContent = 'Modo claro';
    document.getElementById("wheelCanvas").style.color = "white";
    document.getElementById("arrow").style.color = "white";
    clockDisplay.style.color = "white";
  } else {
    darkModeLabel.textContent = 'Modo oscuro';
    document.getElementById("wheelCanvas").style.color = "#333";
    document.getElementById("arrow").style.color = "#333";
    clockDisplay.style.color = "#333";
  }
});



//audio
const goofySound = new Audio('./files/goofy.mp3');
let currentSound = null;

function spinWheel() {
  const spinDuration = 5; // 5 seconds
  const randomAngle = 360 * 4 + Math.random() * 360; // Spin 4 full rounds plus a random angle

  if (currentSound) {
    currentSound.pause();
  }
  currentSound = goofySound;
  currentSound.play();

  gsap.to(canvas, {
    rotation: currentRotation + randomAngle,
    duration: spinDuration,
    ease: 'power3.out',
    onUpdate: () => {
      currentRotation = gsap.getProperty(canvas, 'rotation');
      drawWheel();
    },
    onComplete: () => {
      const winningIndex = Math.floor(names.length * (1 - (currentRotation % 360) / 360));
      alert(`The winner is: ${names[winningIndex]}!`);
      if (currentSound) {
        currentSound.pause();
      }
      currentSound = sound2;
      currentSound.play();
    },
  });
}
