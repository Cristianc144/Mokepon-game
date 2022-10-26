const express = require("express") // Importo la libreria express
const cors = require("cors") // importo la librería cors

const app = express()

app.use(cors())
app.use(express.json()) // habilitamos la capacidad de recibir contenido post en formato .json
const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }
    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }
    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }
}


class Mokepon{
    constructor(nombre){
        this.nombre = nombre
    }
}


// EL .get sirve para solicitar información al servidor (sacar datos del servidor)
app.get("/unirse", (req, res) =>{
    const id = `${Math.random()}` // El id para el jugador
    const jugador = new Jugador(id) // Se le asigna un id a la variable jugador
    jugadores.push(jugador) // se inyecta el dato del jugador en la lista de todos los juagdores
    res.setHeader("Access-Control-Allow-Origin", "*") // Permitir todos los origenes para hacer peticiones en nuestro servidor, pero PUEDE SER INSEGURO con * ya que representa TODOS LOS ORIGENES
    res.send(id) // se envía la información del ID
})

// el post sirve para guardar recursos en el servidor
app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""  // se carga el id del jugador en jugadorId
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)

    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId===jugador.id)

    if (jugadorIndex >=0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores); // se imprime en la consola la lista de jugadores
    console.log(jugadorId); // se imprime el id del jugador actual
    res.end() // para terminar la petición
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x =req.body.x || 0
    const y = req.body.y || 0
    if (jugadorIndex >=0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }
    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)
    res.send((
        enemigos
    ))
})
 
app.listen(8080, () =>{
    // para imprimir en el terminal
    console.log("Servidor funcionando");
})