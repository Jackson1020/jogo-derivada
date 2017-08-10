function Tiro(x, y) { // Construtor da classe "Tiro"
	this.x = x; // A posição x de cada tiro recebe a posição x em que o jogador se encontra
	this.y = y; // A posição y de cada tiro recebe a posição y em que o jogador se encontra
	this.r = 8; // O raio de cada tiro é 8 (o tiro é um círculo)
	this.show = function() { // Função que desenha o tiro
		noStroke();
		fill(255,255,255);
		image(imgTiro, this.x,this.y);
    }
    this.move = function() { // Função que move o tiro
		this.y -= 8;
	}
	this.destroy = function() { // Função que destrói o tiro
		this.x = -1000; // Faz o tiro ir para uma posição que não aparece na tela
		this.y = -1000; // Faz o tiro ir para uma posição que não aparece na tela
		
	}
}
