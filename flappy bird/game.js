//Que tipo de canvas trabjare
var contexto = document.getElementById("lienzoJuego").getContext("2d")
//ancho
contexto.canvas.width = 300
//altura
contexto.canvas.height =530

/*objetos y datos del juego*/

//puntuacion
var score = 0

//velocidad
var FPS =60

//gravedad
var gravedad = 1.5

//obstaculos
var tuberias = new Array()
tuberias[0] = {
    x:contexto.canvas.width,
    y:0
}

//Personaje:Tiene como atributos la posicion inicial del mismo
var personaje = {
    x:50,
    y:150,
    w:50,
    h:50
}
//VARIABLES PUNTOS

var punto = new Audio()
punto.src = "audios/punto.mp3"


//VARIABLES IMAGENES

//personaje
var bird = new Image()
bird.src = "imagenes/bird.png"
//fondo
var background = new Image()
background.src = "imagenes/background.png"
//obstaculos
var tuberiaNorte = new Image()
tuberiaNorte.src = "imagenes/tuberiaNorte.png"

var tuberiaSur = new Image()
tuberiaSur.src = "imagenes/tuberiaSur.png"

//piso
var suelo = new Image()
suelo.src = "imagenes/suelo.png"


//Control
function presionar(){

    personaje.y-=35
}



setInterval(()=>
{    
    contexto.clearRect(0,0,300,700)
   
    //FONDO
    contexto.drawImage(background,0,0)
    contexto.drawImage(suelo,0,contexto.canvas.height - suelo.height)
    //PERSONAJE
    contexto.drawImage(bird,personaje.x,personaje.y)
    //OBSTACULOS
    for(var i = 0; i < tuberias.length ; i++){ 
        contexto.drawImage(tuberiaNorte,tuberias[i].x,tuberias[i].y)
        contexto.drawImage(tuberiaSur,tuberias[i].x,tuberias[i].y +  (tuberiaNorte.height + 80))
        tuberias[i].x--
       
        if(tuberias[i].y + tuberiaNorte.height < 80){
            tuberias[i].y = 0 
        }

        if(tuberias[i].x == 150){
            tuberias.push({
                x:contexto.canvas.width+40,
                y: Math.floor(Math.random()*tuberiaNorte.height) - tuberiaNorte.height
               
            })
          
        }
        if(personaje.x + bird.width >= tuberias[i].x &&
            personaje.x <= tuberias[i].x + tuberiaNorte.width &&
            (personaje.y <= tuberias[i].y + tuberiaNorte.height || 
                personaje.y + bird.height >= tuberias[i].y +  (tuberiaNorte.height + 80))
                || personaje.y + bird.height >= contexto.canvas.height - suelo.height){
            location.reload()
        }

        if(tuberias[i].x == personaje.x){
            score++
            punto.play()
            
        }

      

    }

//CONDICIONES

personaje.y += gravedad
contexto.fillStyle = "rgba(0,0,0,1)"
contexto.font = "25px Arial"
contexto.fillText("Score: "+score,10,contexto.canvas.height-40)


},1000/62)

window.addEventListener("keydown",presionar)








