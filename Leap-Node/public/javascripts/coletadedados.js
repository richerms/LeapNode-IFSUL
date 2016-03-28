var scan = false
  , gestureID
  , r = 0
  , enviar = false
  , b = true
  , flag = true
  ;


function calcDistancia(A, B) {
	return Math.sqrt(Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2) + Math.pow(A[2] - B[2], 2));
}

//função do botão para pausar e continuar o tracking
function iniciar(){	
	if (document.getElementById("Start").innerHTML === "Start") {
		document.getElementById("Start").innerHTML = "Stop";
		document.getElementById("Gesture").innerHTML = "Open";		
		changeImage();
		scan = true;
	}
	else {
		document.getElementById("Start").innerHTML = "Start";
		scan = false;
		changeImage(true);
	}
}

function next(){
	scan = true;
}

function changeImage(test = false){
	var img = document.getElementById("gimg"),
		gesture = document.getElementById("Gesture");
	
	if (test) {
		r = 0;
		img.src = "images/gesture-open.jpg";
		gesture.innerHTML = "Open Hand";
		return
	}
	
	switch (r){
		case 10: 
			img.src = "images/gesture-close.jpg";
			gesture.innerHTML = "Closed Hand";
			break;
		case 11:
			location.replace("/done.ejs");
			break;
		default:
			img.src = "images/gesture-" + r + ".jpg";
			gesture.innerHTML = "" + r;			
	};
	
	r++;
}

function atualizarDados(hand) {
	document.getElementById("palmPosition").innerHTML = hand.palmPosition;
	gestureID = 0;
	
	for (var i = 0; i < 5; i++){
		document.getElementById("finger" + i).innerHTML = hand.fingers[i].dipPosition;
		document.getElementById("distance" + i).innerHTML = calcDistancia(hand.fingers[i].dipPosition, hand.palmPosition);
		document.getElementById("handtype").innerHTML = hand.type;

		if (!hand.fingers[i].extended){
			document.getElementById("state" + i).innerHTML = "DOWN";
		}
		else {
			gestureID += Math.pow(10, i);
			document.getElementById("state" + i).innerHTML = "UP";
		}
	}
}

function enviarDB(data) {	
	var str = "timestamp=" + data[1] + "&name=" + data[3] + "&gesture=" + data[5];
	
	for (var i = 6; i < data.length; i += 2)
		str += "&" + data[i] + "=" + data[i + 1];
	
	console.log(str)
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/save_row", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(str);
	
    if (xhttp.readyState == 4 && xhttp.status == 200) {
     // document.getElementById("aviso").innerHTML = xhttp.responseText;
    }
}

function average(vector){
	var sum;
	var arr = [];
	var vectorLength = vector.length;
	var objectLength = vector[0].length;
	
	for (o = 0; o < objectLength; o++){
		sum = 0;
		for (a = 0; a < vectorLength; a++)
			//if (typeof(vector[a][o]) === "string"){
			if (o % 2 === 0){
				arr.push(vector[a][o]);
				o++
				a = -1	//Para que na proxima volta do laço continue sendo a = 0
			}
			else{
				sum += vector[a][o]
			}
		sum /= vectorLength
		arr.push(sum)
	}
	
	//TimeStamp do hand mais preciso e o nome do usuario e do gesto
	arr[1] = vector[0][1]
	arr[3] = vector[0][3]
	arr[5] = vector[0][5]
	
	return arr
}

var hands = [];

function getHand(hand){
	var vector = [];
	
	vector.push('timeStamp');
	vector.push(Date.now());
	vector.push('name');
	vector.push(document.getElementById('nome').value);
	vector.push('gesture');
	vector.push(document.getElementById("Gesture").innerHTML);
	
	for (var j = 0; j < 3; j++){
		vector.push('palmPos'+ j);
		vector.push(hand.palmPosition[j]);
	}
	
	for (var i = 0; i < 5; i++)
		for (var j = 0; j < 3; j++){
			vector.push('f' + i + 'Pos' + j);
			vector.push(hand.fingers[i].dipPosition[j]);
		}
		
	for (var i = 0; i < 5; i++)	{
		vector.push('DisFin' + i + 'Palm');
		vector.push(calcDistancia(hand.fingers[i].dipPosition, hand.palmPosition));
	}
	
	for (var i = 0; i < 5; i++)
		for (var j = 0; j < 5; j++)
			if (i != j){
				vector.push('DisFin' + i + 'Fin' + j);
				vector.push(calcDistancia(hand.fingers[i].dipPosition, hand.fingers[j].dipPosition));
			}
	
	for (var i = 0; i < 3; i++){
		vector.push('HandDir' + i);
		vector.push(hand.direction[i]);
	}
	
	for (var i = 0; i < 5; i++)
		for (var j = 0; j < 3; j++){
			vector.push('fin' + i + 'dir' + j);
			vector.push(hand.fingers[i].direction[j]);
		}
	
	for (var i = 0; i < 5; i++){
		vector.push('fin' + i + 'ext')
		vector.push(hand.fingers[i].extended)
	}
	
	vector.push('confidence')
	vector.push(hand.confidence)
	
	//Não preciso agora saber qual das mãos está sendo analizada, sempre será a direita
	//vector.push('type');
	//vector.push(hand.type);
	
	hands.push(vector)
}

var firstFrame;
//main function para o tracking
Leap.loop(function(frame) {
	if (!scan){
		firstFrame = frame.id;
		hands = []
	}
	var currentFrame = frame.id;
	
	frame.hands.forEach(function(hand) {
		if (scan) {
			atualizarDados(hand);
			getHand(hand);
			console.log('First ' + firstFrame)
			console.log('Current ' + currentFrame)
			if (currentFrame >= firstFrame + 120){	//Numero de Frames 
				var size = hands[0].length;
				hands.sort(function(a, b){ 
					return parseFloat(b[size - 1]) - parseFloat(a[size - 1]);
				});
				
				//document.getElementById("aviso").innerHTML = hands[0] + "</br>" + hands[hands.length - 1] + "</br>";
				//document.getElementById("aviso").innerHTML += average(hands);
				
				var vec = []
				
				for (var i = 0; i < 10; i++)
					vec.push(hands[i])
				
				enviarDB(average(vec));
				changeImage();
				scan = false;
			}
		}	
	}
)});
