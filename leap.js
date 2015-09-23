var tracking = false;
var entra = true;
var vetor = [];
var posdedo = [];
var salvar;

/*var c = document.getElementById("mao");
var ctx = c.getContext("2d");

function makeALine(ponto1, ponto2){  
  ctx.clearRect(0, 0, c.width, c.height); 
  ctx.moveTo(c.width/2, c.height/2);
  ctx.lineTo(ponto1[0] - ponto2[0], ponto1[1] - ponto2[1]);
  ctx.stroke();
}*/

function salva(){
	var obj = JSON.parse(salvar);
}

//função da distância da palma      
    function dist(A, B) {
      return Math.sqrt(Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2) + Math.pow(A[2] - B[2], 2));
    }
//função para capturar os dados iniciais da mão
function gravar(){
  entra = false;
  
}

//função do botão para pausar e continuar o tracking
function iniciar(){
  tracking = !tracking;
  if (!tracking) {
    document.getElementById("pause").innerHTML = "Continuar o Tracking";
  } else {
    setTimeout(function () {gravar()}, 500);
    document.getElementById("pause").innerHTML = "Pausar o Tracking";
  }
}

//main function para o tracking
Leap.loop(function(frame) {
  frame.hands.forEach(function(hand) {
 
 //captura inicial de cada dedo jogando para variáveis individuais 
   if (entra){
     salvar = '{ "frames" : [';
     
     for (var conta = 0; conta < 5; conta++){
       vetor[conta] = dist(hand.fingers[conta].dipPosition, hand.palmPosition);       
       salvar += 'Dedo' + conta + ': ' + vetor[0] + ', ';
    } 
     
    salvar += ']}'
   }
//inicia o tracking quando clicar no botão
    if (tracking) {
//posição da palma na tabela      
    document.getElementById('mensagem').innerHTML = '';
      
    document.getElementById('xpalma').innerHTML = hand.palmPosition[0];
    document.getElementById('ypalma').innerHTML = hand.palmPosition[1];
    document.getElementById('zpalma').innerHTML = hand.palmPosition[2];
    
    var string = '<p>';
//tipo da mão      
   if (hand.type == 'right') {
       string += '<br> Mão Direita';
    } else {
       string += '<br> Mão Esquerda';
    }
         
      
 //teste para saber qual dedo      
    for (var dedo = 0; dedo < 5; dedo++) {
      var X = hand.fingers[dedo].dipPosition;
      var Y = hand.palmPosition; 
      
      switch (dedo) {
        case 0:
          string += '</br></br>Polegar:</br>';
          break;
        case 1:
          string += '</br></br>Indicador:</br>';
          break;
        case 2:
          string += '</br></br>Médio:</br>';
          break;
        case 3:
          string += '</br></br>Anelar:</br>';
          break;
        case 4:
          string += '</br></br>Mínimo:</br>';
          break;
      };
      
 //     makeALine(X, Y);

//teste para saber qual eixo
      for (var eixo = 0; eixo < 3; eixo++) {
        switch (eixo) {
          case 0:
            string += '  Eixo X: ';
            break;
          case 1:
            string += '  Eixo Y: ';
            break;
          case 2:
            string += '  Eixo Z: ';
            break;
        }
        
        string += hand.fingers[dedo].dipPosition[eixo];
      }
      
 //chama função da distância
        if (eixo == 3) {
            string += '<br> Distância da Palma: ' + dist(X, Y);
        }
      
        if (dist(X,Y) < (vetor[dedo] / 1.25)){
            string += '<br>Dedo Dobrado';
            posdedo[dedo]=false;
        } else {
            string += '<br>Dedo Levantado';
            posdedo[dedo]=true;
    }
        if (!posdedo[0] && posdedo[1] && !posdedo[2] && !posdedo[3] && !posdedo[4])
             document.getElementById('numero').src = "https://s3-sa-east-1.amazonaws.com/leroy-production//uploads/img/products/numero_para_residencia_numero_1_14_5_cmx10_cm_cromado_bemfixa_87963701_0001.jpg_600x600.jpg";
       else if (!posdedo[0] && posdedo[1] && posdedo[2] && !posdedo[3] && !posdedo[4])
        document.getElementById('numero').src = "https://s3-sa-east-1.amazonaws.com/leroy-production//uploads/img/products/numero_para_residencia_numero_2_14_5_cmx10_cm_cromado_bemfixa_87963715_0001.jpg_600x600.jpg";
      else if (!posdedo[0] && posdedo[1] && posdedo[2] && posdedo[3] && !posdedo[4])
          document.getElementById('numero').src = "https://s3-sa-east-1.amazonaws.com/leroy-production//uploads/img/products/numero_para_residencia_numero_3_14_5_cmx10_cm_cromado_bemfixa_87963722_0001.jpg_600x600.jpg";
      else if (!posdedo[0] && posdedo[1] && posdedo[2] && posdedo[3] && posdedo[4])
          document.getElementById('numero').src = "https://s3-sa-east-1.amazonaws.com/leroy-production//uploads/img/products/numero_para_residencia_numero_4_14_5_cmx10_cm_cromado_bemfixa_87963736_0001.jpg_600x600.jpg";
      else if (posdedo[0] && posdedo[1] && posdedo[2] && posdedo[3] && posdedo[4])
        document.getElementById('numero').src = "https://s3-sa-east-1.amazonaws.com/leroy-production//uploads/img/products/numero_para_residencia_numero_5_14_5_cmx10_cm_cromado_bemfixa_87963743_0001.jpg_600x600.jpg";
      else if (!posdedo[0] && !posdedo[1] && posdedo[2] && !posdedo[3] && !posdedo[4])
        document.getElementById('numero').src = "http://4.bp.blogspot.com/-n_FrLJLCPFw/TrLDdGgOZUI/AAAAAAAAAVI/Fnus7W8ZCuw/s1600/angry_baby.jpg";
        else 
          document.getElementById('numero').src = " ";
    }
//fecha a string e imprime toda
    string += '</p>';
    document.getElementById('Visualizar').innerHTML = string;
    }
  })
});