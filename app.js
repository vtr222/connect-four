const botoes = document.querySelector('#container_botões');
const body = document.querySelector('body');
const ps = document.querySelector('p'); 

let rodada;
let canvas = document.querySelector('canvas');
let p = canvas.getContext('2d');

p.canvas.width = 700;
p.canvas.height = 500;


let tab = [];

function filltab() {
rodada = 0;
tab = [
//0  //1 //2 //3 //4 //5 //6 X
["-","-","-","-","-","-","-"], //0 Y
["-","-","-","-","-","-","-"], //1
["-","-","-","-","-","-","-"], //2
["-","-","-","-","-","-","-"], //3
["-","-","-","-","-","-","-"], //4
["-","-","-","-","-","-","-"], //5
];

}


function drawtab(tab) {

p.fillStyle = "#08567c";
p.fillRect(0,0,700,600);
p.fillStyle = "white";


for (let y=50; y<500; y+=80){
    for (let x=50; x<700; x+=100){
      p.beginPath();
      p.arc(x, y, 30, 0, 2 * Math.PI);
      p.fill();
    }
}


}

function newGame() {
	
	setTimeout( function() {
	filltab();
	drawtab();
	body.style.background =  'white';
    botoes.addEventListener('click', a); }, 3000)
	
}


function atualizaDados(vencedor){
let cor = vencedor === '#ffb835' ? "Vitória de Laranja" : "Vitória de Verde"
botoes.removeEventListener('click', a);
body.style.backgroundColor =  vencedor;
newGame();
}


function empate(rodada) {
botoes.removeEventListener('click', a);
newGame();
}

function vitoria(cores) {
  if (cores.includes("LLLL")) { atualizaDados("#ffb835"); return true }
  if (cores.includes("VVVV")) { atualizaDados("#5Fad56"); return true}
  return false;
}


function verificaJunte4(y, x) {
    let a, b;
    let verificador = "";
    //linha
        for(a = 0; a < 7; a++) { verificador += tab[y][a]; }
        if (vitoria(verificador)) {return true;}
    //coluna
        verificador = "";
        for(a = 0; a < 6; a++) { verificador += tab[a][x]; }
        if (vitoria(verificador)) {return true;}
    //diagonal direita
        a = x, b = y, verificador = "";
        while(b > 0 && a < 6  ) { b--; a++;} //Volta pro início da diagonal
        while(b < 6 && a > -1 ) {            //vai até o fim da diagonal e verifica as jogadas
        verificador += tab[b][a];
        b++; a--;
        }
        if (vitoria(verificador)) {return true;}
    //diagonal esquerda
        a = x, b = y, verificador = "";
        while(b > 0  && a > 0) { b--; a--;}
        while(b < 6 && a < 7 ) {
        verificador += tab[b][a];
        b++; a++;
        }
        if (vitoria(verificador)) {return true;}
}

function verificaColuna(x) {
let y = 5;
while (tab[y][x] !== "-" && y > -1) { y--;   if (y === -1) {return "vazia";}}
return y;
}

function draw(coluna, linha, cvx, cvy, wrongcolor){
  let color = wrongcolor === "#5Fad56" ? "#ffb835" : "#5Fad56";
  p.beginPath();
  p.arc(cvx, cvy, 30, 0, 2 * Math.PI);
  p.fillStyle = color;
  p.fill();
  p.stroke();

}

function jogo(coluna, linha, bola) {
  let cvx = 50 + (coluna * 100);
  let cvy = 50 + (linha * 80);
  let color = bola === "L" ? "#5Fad56" : "#ffb835";
  draw(coluna, linha, cvx, cvy, color);
  tab[linha][coluna] = bola;
  verificaJunte4(linha, coluna);
  if (rodada === 42) {empate();}
  console.log(tab);
}


botoes.addEventListener('click', a);

function a (event){
  event.preventDefault();
  const isButton = event.target.nodeName === 'SPAN';
  if (!isButton) {return;}
  let coluna = event.target.id;
  let linha = verificaColuna(coluna); if ( linha === "vazia") {return;}
  rodada++;
  let bola =  rodada%2 === 0 ? "V" : "L";
  jogo(coluna, linha, bola);
}
filltab();
drawtab();