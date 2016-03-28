var weka = require('C:/Users/lab14/Documents/GitHub/LeapNode-IFSUL/Leap-Node/node_modules/node-weka/lib/weka-lib.js');
var arff = require('node-arff');
var ARFF; 
 
arff.load('C:/Users/lab14/Documents/GitHub/LeapNode-IFSUL/houses.arff', function(err, data) {
  if (err) {
    return console.error(err);
  }
  else {
	  ARFF = data.mode;
  }
})
 
//See Weka Documentation 
var options = {
  //'classifier': 'weka.classifiers.bayes.NaiveBayes', 
  'classifier': 'weka.classifiers.functions.SMO',
  'params'    : ''
};
 
var testData = {	
	houseSize		: 2983,
	lotSize			: 9365,
	bedrooms		: 5,
	granite 		: 0,
	bathroom		: 1,
	sellingPrice	: 230000
};
 
weka.classify(ARFF, testData, options, function (err, result) {
  if (err)
	  console.log(err);
  console.log(result); //{ predicted: 'yes', prediction: '1' } 
  
});