var tracking = false;
var scan = false;
var metadeDosDedos = [];
var gestureID;
var r = -1;
var enviar = false;
var b = true;
var flag = true;

//função da distância da palma      
function calcDistancia(A, B) {
	return Math.sqrt(Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2) + Math.pow(A[2] - B[2], 2));
}

//função do botão para pausar e continuar o tracking
function iniciar(){	
	if (document.getElementById("Start").innerHTML === "Start") {
		document.getElementById("Start").innerHTML = "Stop";
		tracking = true;
		document.getElementById("Gesture").innerHTML = "Open";		
		document.getElementById("gimg").src = "img" + r + ".jpg";
		r++;
	}
	else {
		document.getElementById("Start").innerHTML = "Start";
		scan = false;
		r = -1;
		document.getElementById("gimg").src = "img" + r + ".jpg";
	}
}

function next(){
		enviar = true;
}

function save(){
	document.getElementById("gimg").src = "img" + r + ".jpg";
	
	var shyriu = document.getElementById("Gesture");

	switch (r){
		case 0: shyriu.innerHTML = "0";		r++;break
		case 1: shyriu.innerHTML = "1"; 	r++;break
		case 2: shyriu.innerHTML = "2"; 	r++;break
		case 3: shyriu.innerHTML = "3"; 	r++;break
		case 4: shyriu.innerHTML = "4"; 	r++;break
		case 5: shyriu.innerHTML = "5"; 	r++;break
		case 6: shyriu.innerHTML = "6"; 	r++;break
		case 7: shyriu.innerHTML = "7"; 	r++;break
		case 8: shyriu.innerHTML = "8"; 	r++;break		
		case 9: shyriu.innerHTML = "9";
				if (b){
					r=0;
					b = false;
					break 
				}
				else{
					r++;
					break 
				}
		case 10: shyriu.innerHTML = "Close"; r++;break
		case 11: location.replace("done.html");break
	}

}

function Data(){
	
}

function atualizarDados(hand) {
	document.getElementById("palmPosition").innerHTML = hand.palmPosition;
	gestureID = 0;
	
	for (var i = 0; i < 5; i++){
		document.getElementById("finger" + i).innerHTML = hand.fingers[i].dipPosition;
		document.getElementById("distance" + i).innerHTML = calcDistancia(hand.fingers[i].dipPosition, hand.palmPosition);
		document.getElementById("handtype").innerHTML = hand.type;
		if (calcDistancia(hand.fingers[i].dipPosition, hand.palmPosition) < metadeDosDedos[i]){
			document.getElementById("state" + i).innerHTML = "DOWN";
		}
		else {
			gestureID += Math.pow(10, i);
			document.getElementById("state" + i).innerHTML = "UP";
		}
	}
}

function objToString (obj) {
	var str = '';
				
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			str += p + '::' + obj[p] + '  ';
		}
	}
				
	return str;
}


//Existe uma função extend da classe finger que poderia executar essa função apenas para dedo em pé e dobrado.
function calibrar(hand) {
	for (var i = 0; i < 5; i++){
		metadeDosDedos[i] = calcDistancia(hand.fingers[i].dipPosition, hand.palmPosition) / 1.25;	//Um quarto da distancia
	}
	
	tracking = false;
	scan = true;
}

//Tem que preparar o readwrite para aceitar todas as propriedades que estou enviando
function enviarDB(hand){
	var str = 'timeStamp=' + Date.now() + '&nome=' + document.getElementById('nome').value + '&gesture=' + document.getElementById("Gesture").innerHTML;
	for (var j = 0; j < 3; j++)
		str += '&palmPosition'+ j + '=' + hand.palmPosition[j];
	
	for (var i = 0; i < 5; i++)
		for (var j = 0; j < 3; j++)
			str += '&fingers' + i + 'Position' + j + '=' + hand.fingers[i].dipPosition[j];
		
	for (var i = 0; i < 5; i++)	
		str += '&fingers' + i + 'PalmDistance=' + calcDistancia(hand.fingers[i].dipPosition, hand.palmPosition);
	
	for (var i = 0; i < 5; i++)
		for (var j = 0; j < 5; j++)
			if (i != j)
				str += '&distanceBetweenFinger' + i + 'AndFinger' + j + '=' + calcDistancia(hand.fingers[i].dipPosition, hand.fingers[j].dipPosition);
		
	console.log(str);
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "http://localhost:8080/save", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(str);
	
    if (xhttp.readyState == 4 && xhttp.status == 200) {
     // document.getElementById("aviso").innerHTML = xhttp.responseText;
    }
}

//main function para o tracking
Leap.loop(function(frame) {
	frame.hands.forEach(function(hand) {
		if (tracking){
			calibrar(hand);
		}
			
		if (scan) {
			atualizarDados(hand);
//			analizarGesto();
			console.log("Analisei o Gesto");
//			document.getElementById("aviso").innerHTML = objetoDados(hand);
		}	
		if (enviar){
			enviarDB(hand);
			enviar = false;
			save();
		}
	}
)});
