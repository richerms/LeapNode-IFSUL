var synaptic = require('synaptic'),
    Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;
	
function Perceptron(input, hidden, output)
{
    // create the layers
    var inputLayer = new Layer(input);
    var hiddenLayer = new Layer(hidden);
    var outputLayer = new Layer(output);

    // connect the layers
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    // set the layers
    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

//Meu código a partir daqui
	
exports.loadTest = function(req, res, next) {
	console.log("My synaptic middleware is runing");
	return next();
};

exports.XORTest = function() {
	console.log("XOR Test Initiated");
	
	var myPerceptron = new Perceptron(2,3,1),
	    myTrainer = new Trainer(myPerceptron);

	myTrainer.XOR(); 

	/*myPerceptron.activate([0,0]); 
	myPerceptron.activate([1,0]); 
	myPerceptron.activate([0,1]); 
	myPerceptron.activate([1,1]); */
	var res = myPerceptron.activate[1,0];
	console.log(res);
}