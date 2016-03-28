i=4;

function contar(){
	document.getElementById("time").innerHTML = i;
	i--;
	if (i<0)
		location.replace("coletadedados.html");
}

setInterval(contar, 1000);