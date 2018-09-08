//Variables
// Board
const board= document.getElementById('board'); 
// Board-Size var
let boardCol= 16;
let boardRow= 16;
let boardTable= boardCol * boardRow;
// Colores
const colorBase= '#4169e1'; // Basico
let colorHover= '#4169e1'; // Para dibujar al pasar
let borderColor= "#708090"; // color del borde
// Opacidad
let opaHover= 5;
// Bordes
let isBorder= true;
let borde= `0.05em solid ${borderColor}`;

// Funciones
// Para Cambiar el tamaño
const changeSize= (colRow) => {
	boardCol= colRow;
	boardRow= colRow;
	boardTable= boardCol * boardRow;
	fillBoard(); // llama a la función que dibuja el Board
}
// Borrar Bloques
const eraseBlock = () => {
	const child= board.querySelectorAll(".block");
	for(let i=0; i<child.length; i++ ){
		board.removeChild(child[i]);
	}
};
// Para cambiar de colores
const changeColor = (color) => {
	colorHover= color;
}
const changeColorBorder = (color) => {
	borderColor= color;
	borde= `0.05em solid ${borderColor}`;
}
// Para cambiar la opacidad del bloque
const changeOpa = (opacity) => {
	const newOpacity= opacity*10;
	if (newOpacity>-10 && newOpacity<=10)
		opaHover= newOpacity;
};
// Dibujar Bordes
const conBordes = () => {
	const bloques= board.querySelectorAll(".block");
	bloques.forEach(actual => {
			actual.style.border= borde;
	});
}
// borrar Bordes
const sinBordes = () => {
	const bloques= board.querySelectorAll(".block");
	bloques.forEach(actual => {
			actual.style.border= "none";
	});
}
// Para dibujar el Board
const fillBoard = () => {
	// Pone la estructura de COL y ROW
	board.style.gridTemplateColumns= `repeat(${boardCol}, 1fr`;
	board.style.gridTemplateRows= `repeat(${boardCol}, 1fr`;
	// Dibuja los bloques
	for (let i=0; i<boardTable; i++) {
		//Crea el Bloque, los identifica y le da Clase
		const block= document.createElement('DIV');
		block.id= `id_${i}`;
		block.className= 'block';
		// Para Cambiar de Color y Opacidad
		block.onmouseenter = () => { 
			const bloque= document.getElementById(`id_${i}`); // Identifica el Bloque
			bloque.style.background= colorHover; // Cambia de Color
			let opa= (bloque.style.opacity*10+opaHover)/10; //Calcula la nueva Opacidad
			// Controla que no pase niveles aceptables
			if (opa>1) opa= 1; 
			else if (opa<=0) opa= 0.1;
			// Cambia Opacidad
			bloque.style.opacity= opa;
		};
		// FIN - Agregar Evento
		//Agrega al Board
		board.appendChild(block);
	}
	// FIN de LLenar el Board
}
// Dibuja el Board por primera vez
fillBoard();

// Eventos / Botones
// Contenido cargado
document.addEventListener('DOMContentLoaded', () => {
	//Reset Tamaño a 16
	document.getElementById('resetSize').onclick = () => {
		// Borra los Bloques
		eraseBlock();
		// Ajusta el valor en el Boton
		document.getElementById('newSize').value= 16;
		// Cambia el Board
		changeSize(16);
	};
	// Cambiar la cantidad de Bloques
	document.getElementById('newSize').onchange = () => {
		//Borrar los block anteriores
		eraseBlock();
		//Agrega block nuevos
		changeSize(document.getElementById('newSize').value);
	};
	//Reset Color a Base
	document.getElementById('resetColor').onclick = () => {
		board.querySelectorAll(".block").forEach(actual => {
			actual.style.background= colorBase;
			actual.style.opacity= 0.5;
		});
	};
	//Cambiar de Color
	document.getElementById('newColor').onchange = () => {
		changeColor(document.getElementById('newColor').value);
	};
	//Cambiar de Opacidad
	document.getElementById('newOpa').onchange = () => {
		const value= document.getElementById('newOpa').value;
		changeOpa(value);
		document.getElementById('showOpa').innerText= value; // Cambia el indicador
	};
	//Cambiar bordes
	document.getElementById('newBorders').onclick = () => {
		if (isBorder) sinBordes(); // Saca los Bordes
		else conBordes(); // Pone los Bordes
		isBorder= !isBorder;
	};
	//Cambia de color el borde
	document.getElementById('colorBorders').onchange = () => {
		changeColorBorder(document.getElementById('colorBorders').value);
		conBordes();
	};
});