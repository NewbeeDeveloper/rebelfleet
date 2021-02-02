console.log(ax);
var ax = 'Test';
const escuadras = [

{ id:"xwingRow", 
img:"img/xwing.png",
descripcion:"El caza estelar T-65 Ala-X de Incom era el principal caza estelar multipropósito de la Alianza Rebelde y sus gobiernos sucesores. Conocido por su versatilidad y rendimiento de combate excepcional, fue uno de los favoritos entre los pilotos Rebeles y de la Nueva República.", 
imagen: "img/xwing.png", 
nombre: "X-Wing", 
escuadras: 0, 
tokens: 100 , 
saldo:0
},

{ id:"ywingRow",
img:"img/ywing.png", 
descripcion:"Encargado por la República Galáctica durante las Guerras Clon, muchos Alas-Y sobrevivientes continuarían sirviendo con la Alianza para Restaurar la República durante la Guerra Civil Galáctica.", 
imagen: "img/ywing.png", 
nombre: "Y-Wing", 
escuadras: 0, 
tokens: 150 , 
saldo:0
},

]

let listDel;
let editInp;
let tokens = 1000;
let countTokens;

document.getElementById('credits').innerHTML = `Credits: ${tokens}`;
document.getElementById("message").addEventListener("click", e => e.target.innerHTML = '');

const navCont =document.getElementById('naves');

var tab = document.getElementById("shipInv");

let rowCount = 0;
let row;

escuadras.forEach( e => {	

	if(rowCount == 0){
		row = document.createElement('div');
		row.classList.add('row');
	}

	let enlistar = document.createElement("a");

	enlistar.textContent = 'Enlistar Escuadra ( 5 Naves )';

	let id = e.id.charAt(0) + 'btn';

	enlistar.id = e.id;
	enlistar.classList.add( 'nbtn');

	let desc     = document.createElement("p");
	desc.classList.add('card-title');

	desc.textContent = e.descripcion;

	let title    = document.createElement("h5");
	title.classList.add('card-title');

	title.textContent = e.nombre;

	let cBody    = document.createElement("div");
	cBody.classList.add('card-body');

	cBody.appendChild(title);
	cBody.appendChild(desc);
	cBody.appendChild(enlistar);

	let cImg     = document.createElement("img");
	cImg.classList.add('card-img-top');
	cImg.src = e.imagen;

	let card     = document.createElement("div");
	card.classList.add('card');

	card.appendChild(cImg);
	card.appendChild(cBody);

	let column    = document.createElement("div");
	column.classList.add('col-6', 'col-lg-6', 'text-center');

	column.appendChild(card);

	row.appendChild(column);
	navCont.appendChild(row);

	if(rowCount < 2){
		rowCount++;
	}else{
		rowCount = 0;
	}
	
});


function addCart(){
	//console.log(this);
	var row;

	if(tab.childNodes[3].rows.length == 0){
		insertar(this.id,1);
	}else{

		if(document.getElementById('l_'+this.id)){
			console.log('Count:',this.id);
			count(this.id);
		}else{
			console.log(this.id);
			insertar(this.id,1);
		}
	}
}

function count(id){

	let row,
	fName,
	index,
	sum   = 0,
	saldo = 0;

	index = escuadras.findIndex(nave => nave.id == id);

	escuadras[index].saldo = escuadras[index].saldo + escuadras[index].tokens;

	if(balance(escuadras[index].tokens)){	
		//console.log('count-balane:')
		fName = `inp_${id}`;
		row   = document.getElementById('l_'+id);
				//console.log(row.cells 	);
		document.getElementById(fName).value = parseInt(document.getElementById(fName).value) + 1 ;
		row.cells[3].innerHTML = parseInt(row.cells[3].innerHTML) + escuadras[index].tokens ;
	}else{
		//console.log('insertar - count-balane2:', countTokens)
		escuadras[index].saldo = escuadras[index].saldo - escuadras[index].tokens;
	}
}

function insertar(id,inicial){

	let line = tab.childNodes[3].insertRow(),
	index,
	sum = 0,
	escuadrasAux = 0,
	fName;

	index = escuadras.findIndex(nave => nave.id == id);
	fName = `del_${id}`;

	if(inicial){
		
		escuadras[index].saldo = escuadras[index].tokens;
		if(!balance(escuadras[index].tokens)){
			escuadras[index].saldo = escuadras[index].tokens - escuadras[index].tokens;	
			//console.log('insertar - balance', countTokens);
			return;
		}
	}

	line.insertCell(0); 
	line.insertCell(1); 
	line.insertCell(2); 
	line.insertCell(3); 
	line.insertCell(4); 

	line.id = 'l_'+id

	line.cells[4].id = fName;

	listDel = document.getElementById(fName).addEventListener("click", () =>  { 
		let parent;
		parent = document.getElementById(fName).parentElement;
		parent.remove();
		//console.log(escuadras[index].saldo);
		countTokens = countTokens + escuadras[index].saldo;
		escuadras[index].saldo = 0;	
		document.getElementById('credits').innerHTML = `Credits: ${countTokens}`;		
	});


	line.cells[0].innerHTML = `<img src='${escuadras[index].imagen}' width='100px'/>`;
	line.cells[1].innerHTML = escuadras[index].nombre;
	line.cells[2].innerHTML = `<input id="inp_${id}" type="number" value="${escuadras[index].escuadras = 1}" min="0" value="0" step="1" onkeydown="return false" />`;
	line.cells[3].innerHTML = escuadras[index].tokens  ;
	line.cells[4].innerHTML = `<img src='img/icon-red.png' width='32px'/>`;

	//document.getElementById('credits').innerHTML = `Credits: ${tokens}`;

	editInp = document.getElementById(`inp_${id}`).addEventListener("input", (e) =>{	

		escuadras[index].saldo = escuadras[index].tokens * e.data;

		if(balance(escuadras[index].tokens)){
			line.cells[3].innerHTML  = parseInt(escuadras[index].tokens) * e.data;
		}else{
			document.getElementById(`inp_${id}`).value = e.data - 1;
			escuadras[index].saldo = escuadras[index].saldo - escuadras[index].tokens;
		}
	});
}

function balance(pTokens){

	let sum;

	sum = escuadras.reduce((sum,tipo) => sum += tipo.saldo, 0);

	countTokens = tokens - sum;

	//console.log('Balance.func:',countTokens);

	if(countTokens >= 0){
		document.getElementById('credits').innerHTML = `Credits: ${countTokens}`;
		document.getElementById('message').innerHTML = '';

		return true;
	}else{

		countTokens = countTokens + pTokens;
		//console.log('Balance.func:',countTokens);
		document.getElementById('message').innerHTML = 'No cuentas con suficientes créditos';
		return false;
	}

}
//document.querySelectorAll('a').addEventListener('click', addCart); 

document.querySelectorAll('.nbtn').forEach(item => {
	item.addEventListener('click', addCart)
})
