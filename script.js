
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Erro ao registrar o Service Worker: ", err))
}

var jogadorAtual = 'X';
var tabuleiro = ['', '', '', '', '', '', '', '', ''];
var jogoAtivo = true;


window.onload = function() {
    iniciarJogo();
};

function iniciarJogo() {
    var celulas = document.querySelectorAll('.celula');
    
    for (var i = 0; i < celulas.length; i++) {
        celulas[i].addEventListener('click', function() {
            var index = this.getAttribute('data-index');
            
            if (tabuleiro[index] === '' && jogoAtivo) {
                tabuleiro[index] = jogadorAtual; //marca no tabuleiro
                this.textContent = jogadorAtual; //mostra na tela
                
                if (verificarVitoria()) {
                    alert('Jogador ' + jogadorAtual + 'ganhou');
                    jogoAtivo = false;
                } 
                
                else if (verificarEmpate()) {
                    alert('Deu velha');
                    jogoAtivo = false;
                } 
                
                else { //continua o jogo
                    
                    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'; //troca o jogador
                    
                    document.getElementById('jogador').textContent = 'Vez do: ' + jogadorAtual; //atualiza o display
                }
            }
        });
    }
}

function verificarVitoria() {
    
    var combinacoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linha
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // coluna
        [0, 4, 8], [2, 4, 6]             // diagonais
    ];
    
    for (var i = 0; i < combinacoes.length; i++) {
        var a = combinacoes[i][0];
        var b = combinacoes[i][1];
        var c = combinacoes[i][2];
        
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return true;
        }
    }
    return false;
}

function verificarEmpate() {
    
    for (var i = 0; i < tabuleiro.length; i++) { //verifica se todas as posições estão preenchidas
        if (tabuleiro[i] === '') {
            return false;
        }
    }
    return true;
}

function reiniciarJogo() {
    
    jogadorAtual = 'X';
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogoAtivo = true; //reseta todas as variáveis
    
    var celulas = document.querySelectorAll('.celula');
    for (var i = 0; i < celulas.length; i++) {
        celulas[i].textContent = ''; //limpa o tabuleiro
    }
    
   
    document.getElementById('jogador').textContent = 'Vez do: X'; //atualiza o display
}