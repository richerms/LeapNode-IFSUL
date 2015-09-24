# LeapNode-IFSUL Campus Pelotas
#### Claus Tessmann, Leroi Oliveira, Richer Magalhães

  Como estudantes da Eletrônica, amantes de programação e participantes do projeto de pesquisa relacionado à LIBRAS,
desenvolvemos o código disponível neste repositório, o qual utiliza o sensor LEAPMotion (e suas devidas bibliotecas)
como parte da estrutura.

  A intenção do código é identificar gestos estáticos utilizando as funcionalidades do sensor. Apesar deste código ser
assíncrono criamos uma ordem de execução do programa, para facilitar a explicação do mesmo, esta ordem será listada abaixo
e detalhada a seguir.

1. Servidor e Arquivos para Execução 
2. Calibração dos Valores Máximos da Mão Aberta
3. Inicialização do Tracking - Exibição dos Valores
4. Cálculo Simples dos Valores Adquiridos
5. Identificação e Exibição dos Gestos em cima dos Valores Calculados
6. Salvar os Dados da Captura em um arquivo .JSON (não finalizado)


//Servidor para Execução

   A princípio o site CodePen era utilizado para a criação e visualização do código, diretamente online, mas devido a 
necessidade de algumas funcionalidades extras, precisou-se de um servidor. Então passamos a usar o Notepad++ como editor
de texto e o Node.js para abrigar o servidor, onde podemos carregar os arquivos .html e .js tranquilamente, além de
salvar dados capturados no formado desejado. Os códigos estarão disponíveis para teste diretamente em um servidor aberto
logo em seguida, e será disponibilizado aqui.
   Os arquivos para execução completa do código estão disponíveis também aqui pelo GitHub, os essenciais são "olanode.js",
o qual executa o servidor e carrega os demais arquivos, "leap.html", com a apresentação e estrutura básica do código,
e "leap.js", com os cálculos, testes e o código em geral.


//Calibração dos Valores Máximos da Mão Aberta:

   O processo de leitura do sensor (Leap.loop) é iniciado, o código começa a executar o cálculo da distância entre a ponta
de cada dedo e a palma da mão. Quando o botão "Iniciar o Tracking" é pressionado, esses valores são jogados para um vetor
que separa os dedos de 0 a 4, do polegar ao mínimo.


//Inicialização do Tracking - Exibição dos Valores

   Após clicar no botão "Iniciar o Tracking", algumas informações e valores aparecem na tela, sendo atualizadas
constantemente. Incluindo o Tipo da Mão (Direita/Esquerda), valores dos eixos X, Y e Z da Palma da Mão e, para cada dedo,
as seguintes informações: Nome do Dedo, Posição dos Eixos X, Y e Z da ponta do dedo, Distância entre a ponta do dedo
e a palma da mão e a Posição do Dedo (Levantado/Dobrado). Este botão possibilita também a aparição da imagem de acordo
com o gesto feito, esta fica em um quadrado logo à direita dos dados.


//Cálculo Simples dos Valores Adquiridos

   Assim como os Valores Máximos da Mão Aberta são calculados, os valores que estiverem no loop do tracking também serão.
Esse cálculo é executado por uma função (dist(X,Y)), a qual pega os valores dos três eixos da ponta dos dedos e da palma
da mão, e atribui a eles a fórmula da distância entre dois pontos em um plano 3D. Essa distância resultante será usada
também para sabermos quando um dedo está levantado ou dobrado. 
A distância de calibração, que estava salva no vetor, é dividida então por 1,25**, para afinar os cálculos e determinar 
a partir de que valores de distância o dedo será considerado dobrado. 

**_Valor adquirido por cálculo de porcentagem, uma média observando os valores iniciais (com o dedo esticado ao máximo)
e finais (com o dedo mais próximo o possível da palma da mão) exibidos pelo eixo X do aplicativo "Visualizer" do
próprio sensor)._


//Identificação e Exibição dos Gestos em cima dos Valores Calculados

   Com os valores meramente tratados, a separação dos dedos por nome e a função "dedo levantado/dobrado" em
funcionamento, conseguimos distinguir gestos simples e estáticos. Lógico que com uma precisão baixa devido a falta
de um tratamento mais adequado dos valores. Mesmo assim foi implementado um novo vetor, preenchido no mesmo laço
da função "dedo levantado/dobrado", o qual trabalhava com variáveis booleanas de acordo com a posição:
-levantado = true;
-dobrado = false.
   Como teste utilizamos a exibição de números. Podemos considerar esse teste como uma identificação de gestos, já que
necessita-se de dedos específicos para reproduzir as imagens. Utilizamos o vetor booleano, onde, por exemplo,
o número é exibido quando os dedos indicador e médio estão com a variável em true e os demais com a variável em false.
As imagens aparecem no quadrado à direita dos dados, e (por enquanto) são carregadas diretamente da internet.


//Salvar os Dados da Captura em um arquivo .JSON (não finalizado)

   Uma das ideias finais deste projeto em particular é armazenar os dados capturados em uma linguagem que possa ser
carregada e executada facilmente por outros códigos/programas, como o LeapRecorder, disponível pelo desenvolvedor.
A estrutura está praticamente feita, precisamos apenas uni-la com o código principal e executar os testes.

<-- Obrigado pela atenção, curiosidade e disponibilidade para ler sobre o projeto. Estamos abertos para opiniões, dicas,
cobaias e também para tirar dúvidas. Caso tiver algum interesse ou pergunta, envie um e-mail para um de nós:
* Desenvolvedores:
  * Claus Tessmann - clausrt@hotmail.com
  * Richer Magalhães - richerms@hotmail.com
* Orientador:
  * Leroi Oliveira - leroioliveira@gmail.com
//IFSUL Campus Pelotas - UFPEL -->
