var w = window.innerWidth;

var dch = document.querySelector("#dch");
var izq = document.querySelector("#izq");

var slides = document.querySelectorAll(".miSlider .diapos li");
var slidesA = Array.prototype.slice.call(slides, 0);
slidesA.reverse();
var slidesN = slidesA.length;

//ver el siguiente slide
var caja = document.createElement("UL");
var contenidoIntermedio = slidesA.slice((slidesN-2),(slidesN-1));
var contenido = contenidoIntermedio[0].cloneNode(true);

//ver el slide anterior
var cajaI = document.createElement("UL");
var contenidoIntermedioI = slidesA.slice(0,1);
var contenidoI = contenidoIntermedioI[0].cloneNode(true);

function inicia(){

	slidesA.forEach(function(valor,item,array) {

		slidesA[item].style.zIndex = item+1;
		slidesA[item].classList.add("item"+item);//
		dch.style.zIndex= slidesN+1;
		izq.style.zIndex= slidesN+1;
	})

	if(w > 1024){
		//ver el siguiente slide
		dch.appendChild(caja);
		caja.setAttribute("class","slideSiguiente");
		caja.style.zIndex= 0;
		caja.appendChild(contenido);

		//ver el slide anterior
		izq.appendChild(cajaI);
		cajaI.setAttribute("class","slideAnterior");
		cajaI.style.zIndex= 0;
		cajaI.appendChild(contenidoI);

	}
	

}

inicia();

//flecha derecha
function avanza(){

	slidesA[slidesN-1].classList.add("oculta");

	if(w > 1024){
		//slider siguiente
		var li = document.querySelector(".slideSiguiente li");
		li.classList.add("saleIzq");
	}




	setTimeout(function(){

		var duplicado = slidesA.slice((slidesN-1),(slidesN))
		slidesA.pop();
		slidesA.unshift(duplicado[0]);
		
		slidesA.forEach(function(valor,item,array) {

			slidesA[item].style.zIndex = item+1;
			slidesA[item].classList.remove("oculta");

		})
		
		if(w > 1024){
			//slider siguiente
			document.querySelector(".slideSiguiente").removeChild(li);
			var contenidoIntermedio = slidesA.slice((slidesN-2),(slidesN-1));
			var contenido = contenidoIntermedio[0].cloneNode(true);
			caja.appendChild(contenido);
			contenido.setAttribute("class","entraIzq");
		}



	},1000)

}

dch.addEventListener("click", avanza);

//flecha izquierda
function retrocede(){

	var duplicado = slidesA.slice(0,1)//duplico el item0
	slidesA.shift();//elimino el item0
	slidesA.push(duplicado[0])

	if(w > 1024){
		//slider anterior
		var liI = document.querySelector(".slideAnterior li");
		liI.classList.add("saleIzqI");
	}


	slidesA.forEach(function(valor,item,array) {

		slidesA[item].style.zIndex = item+1;

	})

	slidesA[slidesN-1].classList.add("muestra");

	setTimeout(function(){

		slidesA[slidesN-1].classList.remove("muestra");

		if(w > 1024){
			//slider anterior
			document.querySelector(".slideAnterior").removeChild(liI);
			var contenidoIntermedioI = slidesA.slice(0,1);
			var contenidoI = contenidoIntermedioI[0].cloneNode(true);
			cajaI.appendChild(contenidoI);
			contenidoI.setAttribute("class","entraIzqI");
		}

	},1000);



}

izq.addEventListener("click", retrocede)



if(w > 1024){
	//mostrar próximo slide
	function mostrarAvanza(){
		caja.classList.add("mostrar");
		var mrgDch = dch.offsetWidth;
		document.querySelector(".slideSiguiente").style.right = mrgDch + "px";
	}
	dch.addEventListener("mouseenter", mostrarAvanza);

	function ocultarAvanza(){
		caja.classList.remove("mostrar");
		document.querySelector(".slideSiguiente").style.right =  "0px";
	}
	dch.addEventListener("mouseleave",ocultarAvanza);

	//mostrar el slide anterior
	function mostrarAtras(){
		cajaI.classList.add("mostrar");
		var mrgIzq = izq.offsetWidth;
		document.querySelector(".slideAnterior").style.left = mrgIzq + "px";
	}
	izq.addEventListener("mouseenter", mostrarAtras);

	function ocultarAtras(){
		cajaI.classList.remove("mostrar");
		document.querySelector(".slideAnterior").style.left =  "0px";
	}
	izq.addEventListener("mouseleave",ocultarAtras);
}