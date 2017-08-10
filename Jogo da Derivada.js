var x, y; // Variáveis para posição do jogador
var posX = [], posY = []; // Variáveis para posições dos objetos
var tiro; // Variável auxiliar para criação do tiro
var tiros = []; // Vetor que armazena todos os tiros
var vida = 3; // Variável para as vidas do jogador
var pontuação = 0; // Variável para pontuação do jogador
var nível = 0; // Variável para armazenar o nível de dificuldade do jogo
var imgObstaculo; // Imagens das derivadas
var imgObstaculo2; // Imagens das derivadas
var imgObstaculo3; // Imagens das derivadas
var n = 1; // Variável auxiliar para as imagens das derivadas
var m = 1;
var e = 1;
var s = 1;
var aux = 21;
var aumentarNivel = true;
var tela = 1;
var risada = true;

function preload(){
	 imgJogador = loadImage("Imagens/jogador.jpg");
	 imgTiro = loadImage("Imagens/tiro.png");
	 
	 imgObstaculo = loadImage("Imagens/x^2.png");
	 imgObstaculo2 = loadImage("Imagens/2x.png");
	 imgObstaculo3 = loadImage("Imagens/2.png");
	
	 imgObstaculo4 = loadImage("Imagens/x^3.png");
	 imgObstaculo5 = loadImage("Imagens/3x^2.png");
	 imgObstaculo6 = loadImage("Imagens/6x.png");
	 imgObstaculo7 = loadImage("Imagens/6.png");
	 
	 imgObstaculo8 = loadImage("Imagens/e^x.png");
	 
	 imgObstaculo9 = loadImage("Imagens/sen(x).png");
	 imgObstaculo10 = loadImage("Imagens/cos(x).png");
	 imgObstaculo11 = loadImage("Imagens/-sen(x).png");
	 imgObstaculo12 = loadImage("Imagens/-cos(x).png");
	
	 somJogo = loadSound("Sound/musicaJogo.mp3");
	 somRisada = loadSound("Sound/risadaMaligna.mp3");

	}


function setup() {
	somJogo.setVolume(0.1);
	somJogo.play();
	createCanvas(640, 480); // Resolução da tela do jogo
	background(0);
	x = 320; //Posição inicial no eixo x do jogador
	y = 440; //Posição inicial no eixo y do jogador
	for(i=0;i<4;i++)
	{
		posX[i] = random(0,600); // Posição inicial no eixo x do objeto
		posY [i] = -100; // Posição inicial no eixo y do objeto
	}
	
}
	
	
function draw() {
	if(tela==1){
		fill(255, 255, 255);
		textSize(50);
		textFont ("Andalus")
		text(" JOGO DA\nDERIVADA", 200, 240);
		if (keyIsDown(ENTER)){
			tela = 2;
		}
	}
	
	if(tela==2){
	
	// -- Movimentação do Jogador --
	if (keyIsDown(LEFT_ARROW)) {
		if(x>30){ // Impede do jogador se mover pra fora da tela
			x-=10;
		}
    }
	if (keyIsDown(RIGHT_ARROW)) {
		if(x<(width-30)){ // Impede do jogador se mover pra fora da tela
			x+=10;
		}
    }
	
	// -- Movimentação do Objeto --
	for(i=0;i<4;i++){
		posY[i] = posY[i] + 2;
	}
	// -- Movimentação dos Tiros --
	
	for(i=0; i<tiros.length ; i++){ 
		tiros[i].move(); 
	}
	
	// -- Colisão entre objeto e jogador --
	for(j=0;j<4;j++){
		if(dist( x, y , posX[j], posY[j]) <= 50){ // Para quando a posição do obstáculo for igual ao do jogador, jogador perde 1 vida
			vida = vida -1;
			posY[j] = -random(height);
			posX[j] = random(0,600);		
		}
	}
	
	// -- Colisão entre objeto e tiro --
	
		for(i=0; i<tiros.length ; i++){
			for(j=0; j<4; j++){
			if(dist(posX[j],  posY[j] , tiros[i].x , tiros[i].y ) <= 40) { //Para quando o obstáculo for atingido, apareça em oputra posição aleatória
				if(j==0)
					n++;
				if(j==1)
					m++;
				if(j==3)
					s++
				
				pontuação = pontuação + 1;
				tiros[i].destroy();	
				if(n>3){
					n=1;
					posY[j] = -random(height);
					posX[j] = random(0,600);
				}
				if(m>4){
					m=1;
					posY[j] = -random(height);
					posX[j] = random(0,600);
				}
				if(s>4){
					s=1;
				}
			}
		}
	 }
  	
	
	// -- Pontuação e níveis --
	
	if(pontuação%20==0 && pontuação!=0 && aumentarNivel == true){ // Para que +1 seja incrementado no nível quando a pontuação for igual aos multiplos de 20
		nível = nível + 1;
		aumentarNivel = false;
	}
	if(pontuação==aux){
		aumentarNivel = true;
		aux+=20;
	}
	
	
	// -- Informações na tela --
	
	clear(); // Limpa a tela
	background(0); // Pinta a tela de preto
	textFont ("Andalus") // Tipo da fonte
	textSize(32); //Tamanho da fonte
	fill(255, 255, 255);
	text("Pontuação: " + pontuação, 10, 30);
	fill(255, 255, 255);
	text("Vidas: " + vida, 280, 30);
	fill(255, 255, 255);
	text("Nível: " + nível, 500, 30);
	
	if(vida<=0){
		tela = 3;
	}
	
	
	
	
	// -- Desenhos --
	imageMode(CENTER);
	image(imgJogador, x, y); // Desenha o jogador
	// ellipse(x, y, 60, 60); 
	for(i=0;i<4;i++){
	if(n==1 && i==0 ){                                   // Desenha as derivadas
		image(imgObstaculo, posX[i], posY[i]);
	}
	else if(n==2 && i==0){								// Desenha as derivadas
		image(imgObstaculo2, posX[i], posY[i]);
	}
	else if(n==3 && i==0){								// Desenha as derivadas
		image(imgObstaculo3, posX[i], posY[i]);
	}
	
	if(m==1  && i==1 ){                                   // Desenha as derivadas
		image(imgObstaculo4, posX[i], posY[i]);
	}
	else if(m==2 && i==1){								// Desenha as derivadas
		image(imgObstaculo5, posX[i], posY[i]);
	}
	else if(m==3  && i==1){								// Desenha as derivadas
		image(imgObstaculo6, posX[i], posY[i]);
	}
	else if(m==4  && i==1){								// Desenha as derivadas
		image(imgObstaculo7, posX[i], posY[i]);
	} 
	
	if(e==1 && i==2){                                   // Desenha as derivadas
		image(imgObstaculo8, posX[i], posY[i]);
	}
	
	if(s==1 && i==3 ){                                   // Desenha as derivadas
		image(imgObstaculo9, posX[i], posY[i]);
	}
	else if(s==2 && i==3){								// Desenha as derivadas
		image(imgObstaculo10, posX[i], posY[i]);
	}
	else if(s==3 && i==3){								// Desenha as derivadas
		image(imgObstaculo11, posX[i], posY[i]);
	}
	else if(s==4  && i==3){								// Desenha as derivadas
		image(imgObstaculo12, posX[i], posY[i]);
	} 
	
}
	for(i=0; i<tiros.length ; i++){ // Desenha os tiros
		tiros[i].show(); 
	}
	
	// -- Validações --
	for(i=0;i<4;i++){
		if (posY[i]>height){ // Se o objeto sair da tela, voltar lá pra cima
			posY[i] = -random(height);
			posX[i] = random(0,600);
		}
	}
	for(i=0; i<tiros.length ; i++){ 
		if(tiros[i].y < 0){ // Se o tiro sair da tela, ele deixa de existir
			tiros[i].destroy();
		}
	}
}
if(tela==3){
		somJogo.setVolume(0);
		somRisada.setVolume(0.4);
		if(risada==true){
			somRisada.play();
			risada = false;
	    }
		background(0);
		textSize(50);
		fill(255, 255, 255);
		text("REPROVADO!", 190, 260);
		textSize(20);
		fill(255, 255, 255);
		text("Aperte ENTER para pagar Cálculo I novamente", 150, 290);
		
		if (keyIsDown(ENTER)){
			vida = 3;
			nível = 1;
			pontuação = 0;
			x = 320;
			y = 440;
			n = 1;
			m = 1;
			e = 1;
			s = 1;
			for(i=0;i<4;i++)
			{
				posX[i] = random(0,600); // Posição inicial no eixo x do objeto
				posY [i] = -100; // Posição inicial no eixo y do objeto
			}
			for(i=0; i<tiros.length ; i++){ 
				tiros[i].destroy(); 
			}
			risada = true;
			somJogo.setVolume(0.1);
			somRisada.setVolume(0);
			tela = 2;
		}
	}
}

function keyPressed() { // Função para tecla pressionada
	if (keyCode == '32') { // '32' define que quando a barra de espaço for pressionda, o tiro começará a se mover 
	    tiro = new Tiro(x, y); // Cria uma nova instância do objeto "Tiro" e armazena na variável tiro
		tiros.push(tiro); // Joga a variável tiro dentro do vetor de tiros e aumenta o tamanho do vetor
	}
}


