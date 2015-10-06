var tracking = false;
var scan = false;
var metadeDosDedos = [];
var gestureID;
var banco = '{ "Eixos (X,Y,Z)" : [';

//função da distância da palma      
function calcDistancia(A, B) {
	return Math.sqrt(Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2) + Math.pow(A[2] - B[2], 2));
}

//função do botão para pausar e continuar o tracking
function iniciar(){	
	if (document.getElementById("Start").innerHTML === "Start") {
		document.getElementById("Start").innerHTML = "Stop";
		tracking = true;
	}
	else {
		document.getElementById("Start").innerHTML = "Start";
		scan = false;
	}
}

function gravar(){
	document.getElementById("dados").href = "http://localhost:8080/?s=" + banco + "]}";
	banco = '{ "Eixos (X,Y,Z)" : [';
	var dataehora = new Date();
	//document.getElementById("aviso").innerHTML = "Última captura feita às:  " + dataehora.getHours() + 'h' + dataehora.getMinutes() + 'min' + '<br>Pronta para Download!';
}

function atualizarDados(hand) {
	document.getElementById("palmPosition").innerHTML = hand.palmPosition;
	gestureID = 0;
	
	for (var i = 0; i < 5; i++){
		document.getElementById("finger" + i).innerHTML = hand.fingers[i].dipPosition;
		document.getElementById("distance" + i).innerHTML = calcDistancia(hand.fingers[i].dipPosition, hand.palmPosition);
		banco += "Dedo" + i + ":" + hand.fingers[i].dipPosition + ",";
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

function objetoDados(hand) {
	var Obj = {
		timeStamp: 0,
		gesture: "Nenhum nome",
		palmPosition: 0,
		fingersPosition: [],
		fingersDistance: [],
	}	
	
	
	Obj.timeStamp = Date.now();
	
	console.log(hand);
	console.log(hand.fingers[0].dipPosition[0]);
	
	for (var i = 0; i < 5; i++){
		for (var j = 0; j < 3; j++)
			//Obj.fingersPosition[i][j] = hand.fingers[i].dipPosition[j];
			
		
		Obj.fingersDistance[i] = calcDistancia(hand.fingers[i].dipPosition, hand.palmPosition);
		Obj.palmPosition[i] = hand.palmPosition[i];
	}
	
	console.log(Obj);
		
	return Obj;
}

function analizarGesto() {
	document.getElementById("gid").innerHTML = gestureID;
	var name = document.getElementById("gn");
	var image = document.getElementById("gimg");
	
	switch (gestureID){
		case 1:
			name.innerHTML = "OK";
			image.src = "http://www.nocturnar.com/comunidad/attachments/ok-jpg.62283/";
			break;
		case 10:
			name.innerHTML = "ONE";
			image.src = "https://s3-sa-east-1.amazonaws.com/leroy-production//uploads/img/products/numero_para_residencia_numero_1_14_5_cmx10_cm_cromado_bemfixa_87963701_0001.jpg_600x600.jpg";
			break;
		case 110:
			name.innerHTML = "TWO";
			image.src = "https://s3-sa-east-1.amazonaws.com/leroy-production//uploads/img/products/numero_para_residencia_numero_2_14_5_cmx10_cm_cromado_bemfixa_87963715_0001.jpg_600x600.jpg";
			break;
		case 1110:
			name.innerHTML = "THREE";
			image.src = "https://s3-sa-east-1.amazonaws.com/leroy-production//uploads/img/products/numero_para_residencia_numero_3_14_5_cmx10_cm_cromado_bemfixa_87963722_0001.jpg_600x600.jpg";
			break;
		case 11110:
			name.innerHTML = "FOUR";
			image.src = "https://s3-sa-east-1.amazonaws.com/leroy-production//uploads/img/products/numero_para_residencia_numero_4_14_5_cmx10_cm_cromado_bemfixa_87963736_0001.jpg_600x600.jpg";
			break;
		case 11111:
			name.innerHTML = "FIVE";
			image.src = "https://s3-sa-east-1.amazonaws.com/leroy-production//uploads/img/products/numero_para_residencia_numero_5_14_5_cmx10_cm_cromado_bemfixa_87963743_0001.jpg_600x600.jpg";
			break;
		default:
			name.innerHTML = "Não Reconhecido";
			image.src = "";
	}
}

function calibrar(hand) {
	for (var i = 0; i < 5; i++){
		metadeDosDedos[i] = calcDistancia(hand.fingers[i].dipPosition, hand.palmPosition) / 1.25;	//Um quarto da distancia
	}
	
	tracking = false;
	scan = true;
}

//Tem que preparar o readwrite para aceitar todas as propriedades que estou enviando
function enviarDB(obj){
	var str = 'timeStamp=' + obj.timeStamp + '&gesture=' + obj.gesture;
	
	for (var i = 0; i < 5; i++){
		for (var j = 0; j < 3; j++)
			str += '&fingersPosition=' + Obj.fingersPosition[i][j];
		
		str += '&fingersDistance=' + Obj.fingersDistance[i];
		str += '&palmPosition=' + Obj.palmPosition[i];
	}
	
	/*
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			str += p + '=' + obj[p] + '&';		//Talvez o & extra que fique no final atrapalhe.
		}
	}*/
	
	console.log(str);
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "http://localhost:8080/save", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(str);
	iniciar();
}

//main function para o tracking
Leap.loop(function(frame) {
	frame.hands.forEach(function(hand) {
		if (tracking){
			calibrar(hand);
		}
			
		if (scan) {
			atualizarDados(hand);
			analizarGesto();
			console.log("Analisei o Gesto");
			//document.getElementById("aviso").innerHTML = objetoDados(hand);
			
			enviarDB(objetoDados(hand));
		}		
	}
)});
