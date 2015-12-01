var obj = {
	a : 1,
	b : [1, 2, 3, 4, 5]
}

var obj2 = {
	a : 2,
	b : [1, 2, 3, 4, 5]
}

var obj3 = {
	a : 3,
	b : [1, 2, 3, 4, 5]
}

var obj4 = {
	a : 4,
	b : [1, 2, 3, 4, 5]
}

var array = []
array.push(obj);
array.push(obj2);
array.push(obj3);
array.push(obj4);

function btClick(){
	var b = [true, true, true, false, false];
	var i = [1, 1, 1, 0, 0];
	var f = [1.0, 1.0, 1.0, 0.0, 0.0]
	sumB = 0, sumI = 0, sumF = 0;
	
	for (var cont = 0; cont < 5; cont++){
		sumB += b[cont];
		sumI += i[cont];
		sumF += f[cont];
	}
	
	sumB /= 5;
	sumI /= 5;
	sumF /= 5;
	
	document.getElementById("teste").innerHTML = sumB + "</br>" + sumI + "</br>" + sumF;
}

/*function btClick(){
	var arr1 = [];
	var arr2 = [];
	
	for (i = 0; i < array.length; i++){
		for (j in array[i]){
			if (typeof(array[i][j]) === "number"){
				arr1.push(j);
				arr1.push(array[i][j]);	
			}
			else if (typeof(array[i][j]) === "object"){
				for (k = 0; k < array[i][j].length; k++) {
					arr1.push(j + " " + k);
					arr1.push(array[i][j][k]);
				}
			}
		}
		arr2.push(arr1);
		arr1 = [];
	}
	
	document.getElementById("teste").innerHTML = average(arr2);
}*/

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
	
	return arr
}