var maos = []

function average (propriedade) {
	var soma = 0;
	
	for (i = 0; i < maos.length; i++)
		for(x in maos[i])
			if (x === propriedade){
				if (typeof(maos[i][propriedade]) === )
				
				soma += maos[i][propriedade]
			}
				
	
	return soma / maos.length
}

var Obj = {
	X: [50, 60, 20],
	Y: 0,
	Z: 0
},	Obj1 = {
	X: [50, 60, 20],
	Y: 1,
	Z: 1
},	Obj2 = {
	X: [50, 60, 20],
	Y: 2,
	Z: 2
},	Obj3 = {
	X: [50, 60, 20],
	Y: 3,
	Z: 3
};

maos[0] = Obj
maos[1] = Obj1
maos[2] = Obj2
maos[3] = Obj3

function A(){
	document.getElementById("average").innerHTML = average("X[0]")
}