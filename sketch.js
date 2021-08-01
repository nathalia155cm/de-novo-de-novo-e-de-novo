/*

*/

//2D array
let obj = [];
let soma = [];

//dados
let five,six;

//movimentação
let mov = true;
let somaval = false;

//acesso ARRAY
let objeto; //objeto a ser modificado 
let variavel; //variavel a ser modificada 
let valor; //valor a ser somado

function setup()
{
  createCanvas(540,540, WEBGL); //canvas 3D
  frameRate(60);
 
  //MAGICA NÃO MEXER!!!!!!!
  for (let i = 0; i <=4; i++) //array 2D OBJETO e SOMA
    {
      obj[i] = []; 
      soma[i] = [];
      
      for (let j =0; j <= 5; j++) //valor
        {
          obj [i] = [j];
          soma [i] = [j];
        }
    }
  
  /* 
  Váriaveis:
  Váriaveis da ARRAY2D
  a primeira array [0,4] se refere ao objeto
  a segunda array [0,5] se refere a variavel
    [0-2] TRANSLATE
    [3-5] ROTATE
  */
  
  //váriáveis MESA
  obj[0][0] = 0;
  obj[0][1] = 50;
  obj[0][2] = -40;
  obj[0][3] = 0;
  obj[0][4] = 0;
  obj[0][5] = 0;
  
  //váriaveis MONITOR
  obj[1][0] = 0;
  obj[1][1] = -20;
  obj[1][2] = -50;
  obj[1][3] = 0;
  obj[1][4] = 0;
  obj[1][5] = 0;
  
  //variáveis TECLADO
  obj[2][0] = 0;
  obj[2][1] = 42;
  obj[2][2] = -30;
  obj[2][3] = 0;
  obj[2][4] = 0;
  obj[2][5] = 0;
  
  //variáveis DESKTOP
  obj[3][0] = -90;
  obj[3][1] = 120;
  obj[3][2] = 40;
  obj[3][3] = 0;
  obj[3][4] = 0;
  obj[3][5] = 0;
 
  //variáveis MOUSE
  obj[4][0] = 110;
  obj[4][1] = 40;
  obj[4][2] = -30;
  obj[4][3] = 0;
  obj[4][4] = 0;
  obj[4][5] = 0;
  
  //escolher num soma e prevenir o recuo
  do 
  {
    for (let i = 0; i <=4; i++) // SOMA
    { 
      for (let j =0; j <= 5; j++) //valor
        {
          soma[i][j] = random(-0.001,0.001);
        }
    }
    somaval = true;
  } while (!somaval)
  
}

function draw()
{

  /* 
  Quarto branco:
  Enquanto o mouse esta apertado a sala fica branca
  Quando solto a sala volta a ser preta e se movimentar
  */
  
  if(mouseIsPressed)
    {
      background(255);
      stroke(0);
      fill(255);
      mov = false;
    }
  else
    {
      background(0);
      stroke(255);
      fill(0);
      mov = true;
    }
  strokeWeight(1);
  
  //CUBO 
  push()
  strokeWeight(1);
  noFill();
  box(3*width/5); //X,Y,Z tem o mesmo tamanho
  pop();
  
  
  /*
  Construção do espaço:
  TRANSLATE: Faz o objeto navegar pelo espaço, localização
  PUSH/POP: Guarda e depois reseta a função translate e rotate
  BOX:caixas /x,y,z/ 
  >>>Entre o push e o pop todas as funções etão vinculadas
  */
  
  //MESA
  push(); 
  rotateX(obj[0][3]); //PF X
  rotateY(obj[0][4]); //PF Y
  rotateZ(obj[0][5]); //PF Z
  translate(obj[0][0],obj[0][1],obj[0][2]); //LOCALIZAÇÃO
  box(270,10,135);
  translate(-width/4,54,-5);
  box(5,117,width/4);
  translate(width/2,0);
  box(5,117,width/4);
  pop();
  
  //MONITOR
  push();
  rotateX(obj[1][3]); //PF X
  rotateY(obj[1][4]); //PF Y
  rotateZ(obj[1][5]); //PF Z
  translate(obj[1][0],obj[1][1],obj[1][2]); //LOCALIZAÇÃO
  box(128,72,30); //cima
  translate(0,50,-5);
  box(10,25,10); //esq
  translate(0,13,0);
  box(40,3,30); //dir
  pop();
  
  
  
  //TECLADO
  push();
  rotateX(obj[2][3]); //PF X
  rotateY(obj[2][4]); //PF Y
  rotateZ(obj[2][5]); //PF Z
  translate(obj[2][0],obj[2][1],obj[2][2]); //LOCALIZAÇÃO
  box(width/3,3,50);
  pop();
  
  //DESKTOP - gabinete
  push();
  rotateX(obj[3][5]); //PF X
  rotateY(obj[3][4]); //PF Y
  rotateZ(obj[3][3]); //PF Z
  translate(obj[3][0],obj[3][1],obj[3][2]); //LOCALIZAÇÃO
  box(40,50,60);
  pop();

  //MOUSE
  push();
  rotateX(obj[4][5]); //PF X
  rotateY(obj[4][4]); //PF Y
  rotateZ(obj[4][3]); //PF Z
  translate(obj[4][0],obj[4][1],obj[4][2]); //LOCALIZAÇÃO
  box(14,10,20);
  pop();
  
  //PF
  push()
  fill('red');
  stroke('red');
  sphere(1.5);
  pop();
  
  if (mov)
    {
      dados();
    }

  

}

function dados()
{
  /* 
  Movimentação:
  - Localização - translate
  - Ponto de fuga/ Linha do horizonte - rotate /x y z/   
  
  REFERENTE A ARRAY obj[][]
  
  UM objeto se movimenta por "turno"
  são 5 objetos no total
  
  0 - mesa
  1 - monitor
  2 - teclado 
  3 - desktop
  4 - mouse
  
  */
  let numf = [0,1,2,3,4]
  five = random(numf); //D5- dado de objeto 
  
  /*
  O objeto sorteado se modifica em uma das possibilidades
  
  0 -  Translate X - +-0.001
  1 -  Translate Y - +-0.001
  2 -  Translate Z - +-0.001
  3 - PF/LH - eixo X - rotateX +-0.0001
  4 - PF/LH - eixo Y - rotateY +-0.0001
  5 - PF/LH - eixo Z - rotateZ +-0.0001
  */
  
  let nums = [0,1,2,3,4,5];
  six = random(nums);
  
  //VALOR SOMAR

  
  obj[five][six] += soma[five][six];
   
  redraw();
}

