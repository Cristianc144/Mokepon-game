const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const botonMascotaJugador = document.getElementById("boton-mascota")
const sectionReiniciar = document.getElementById("reiniciar")

const botonReiniciar =document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionResultado = document.getElementById("resultado") // Con esto le digo a js que meta la frase en la sección de "mensajes" en html
const ataqueDelJuagador = document.getElementById("ataque-del-juagador")
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo")

const sectionMensajes = document.getElementById("resultado") // Con esto le digo a js que meta la frase en la sección de "mensajes" en html
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaque = document.getElementById('contenedor-ataques')

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let mokepones = []
let ataqueEnemigo = []
let opcionDeMokepones
let radioHipodoge
let radioCapipepo 
let radioRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua 
let botonTierra 
let jugador
let enemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let botones = []
let ataquesJugador = []
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.webp'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth -20


const anchoMaximoDeMapa = 400

if (anchoDelMapa > anchoMaximoDeMapa) {
    anchoDelMapa = anchoMaximoDeMapa - 20
}
alturaQueBuscamos = anchoDelMapa*600/800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

// Creamos una clase:

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

// creamos objetos con la clase Mokepon:

let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.webp',5, './assets/hipodoge.webp')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.webp')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.webp')

let hipodogeEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.webp',5, './assets/hipodoge.webp')
let capipepoEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.webp')
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.webp')


// Creamos objetos para el vector ataques:
hipodoge.ataques.push(
    {nombre: '💧', id:"boton-agua"},
    {nombre: '💧', id:"boton-agua"},
    {nombre: '💧', id:"boton-agua"},
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '🌱', id:"boton-tierra"},
)

hipodogeEnemigo.ataques.push(
    {nombre: '💧', id:"boton-agua"},
    {nombre: '💧', id:"boton-agua"},
    {nombre: '💧', id:"boton-agua"},
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '🌱', id:"boton-tierra"},
)


capipepo.ataques.push(
    {nombre: '🌱', id:"boton-agua"},
    {nombre: '🌱', id:"boton-agua"},
    {nombre: '🌱', id:"boton-agua"},
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '💧', id:"boton-tierra"},
)

capipepoEnemigo.ataques.push(
    {nombre: '🌱', id:"boton-agua"},
    {nombre: '🌱', id:"boton-agua"},
    {nombre: '🌱', id:"boton-agua"},
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '💧', id:"boton-tierra"},
)

ratigueya.ataques.push(
    {nombre: '🔥', id:"boton-agua"},
    {nombre: '🔥', id:"boton-agua"},
    {nombre: '🔥', id:"boton-agua"},
    {nombre: '💧', id:"boton-fuego"},
    {nombre: '🌱', id:"boton-tierra"},
)

ratigueyaEnemigo.ataques.push(
    {nombre: '🔥', id:"boton-agua"},
    {nombre: '🔥', id:"boton-agua"},
    {nombre: '🔥', id:"boton-agua"},
    {nombre: '💧', id:"boton-fuego"},
    {nombre: '🌱', id:"boton-tierra"},
)

//Agregamos los objetos al vector "mokepones"
mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none' // Ocultamos la sección seleccionar-ataque
    sectionVerMapa.style.display = 'none'

    // para cada objeto del vector mokepones: se pone el codigo de html con los parametros dados de nombre y foto y al final se aplica el innerHTML para que se escriba la info en HTML.
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones;

        radioHipodoge = document.getElementById("Hipodoge");
        radioCapipepo = document.getElementById("Capipepo");
        radioRatigueya = document.getElementById("Ratigueya");
    })

    sectionReiniciar.style.display = 'none' // Ocultamos la sección reiniciar
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador); // Para que escuche un click del boton seleccionar mascota

    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse") // con esto se vincula al servidor creado en index.js
        .then(function (res){
            if (res.ok){ // se pregunta si el servidor arranca bien
                res.text() // lo que estamos esperando es que nos devuelva un texto
                    .then(function (respuesta){ 
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador(){
    
    //sectionSeleccionarAtaque.style.display = 'flex' // Con block se vuelve a mostrar la sección seleccionar-ataque
    sectionSeleccionarMascota.style.display = 'none' // Ocultamos la sección seleccionar-mascota
   

    if (radioHipodoge.checked == true){
        spanMascotaJugador.innerHTML = radioHipodoge.id
        mascotaJugador = radioHipodoge.id

    } else if(radioCapipepo.checked == true){
        spanMascotaJugador.innerHTML = radioCapipepo.id
        mascotaJugador = radioCapipepo.id

    } else if(radioRatigueya.checked == true){
        spanMascotaJugador.innerHTML = radioRatigueya.id
        mascotaJugador = radioRatigueya.id

    } else{
        alert("SELECCIONA TU MASCOTA");
    }

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,{
        method: "post",
        Headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques =mokepones[i].ataques
        }        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="botones BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaque.innerHTML += ataquesMokepon
    })
     botonFuego = document.getElementById("boton-fuego")
     botonAgua = document.getElementById("boton-agua")
     botonTierra = document.getElementById("boton-tierra")
     botones = document.querySelectorAll('.BAtaque') // se seleccionan las clases de html con ese nombre
     
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) =>{
            if (e.target.textContent === '🔥') {
                ataquesJugador.push('FUEGO')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'  // Se cambia el color del botón
                boton.disabled = true
            } else if(e.target.textContent === '💧'){
                ataquesJugador.push('AGUA')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'  // Se cambia el color del botón
                boton.disabled = true
            } else{
                ataquesJugador.push('TIERRA')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'  // Se cambia el color del botón
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(){
    let ataqueAleatorio = aleatorio(0, mokepones.length-1)
    spanMascotaEnemigo.innerHTML = mokepones[ataqueAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[ataqueAleatorio].ataques
    secuenciaAtaque()
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length-1)
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push("FUEGO")
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push("AGUA")
    }else{
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if (ataquesJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataquesJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){

    for (let index = 0; index < ataquesJugador.length; index++) {
        if (ataquesJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")  
        } else if (ataquesJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA'){
            indexAmbosOponentes(index, index)
            victoriasJugador++
            crearMensaje("GANASTE")
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataquesJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO'){
            indexAmbosOponentes(index, index)
            victoriasJugador++
            crearMensaje("GANASTE")
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataquesJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA'){
            indexAmbosOponentes(index, index)
            victoriasJugador++
            crearMensaje("GANASTE")
            spanVidasJugador.innerHTML = victoriasJugador
        } else{
            indexAmbosOponentes(index, index)
            victoriasEnemigo++
            crearMensaje("PERDISTE")
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}

function revisarVidas(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto fue un EMPATE!! ")
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("Felicitaciones, GANASTE ")
    }else{
        crearMensajeFinal("PERDISTE WEY")
    }
}

function crearMensaje(resultado){
    let parrafoAtaqueJugador = document.createElement('p') // Se crea una seccion tipo parrafo para html
    let parrafoAtaqueEnemigo = document.createElement('p')

    sectionResultado.innerHTML = resultado 
    parrafoAtaqueJugador.innerHTML = indexAtaqueJugador // Se ingresa la info del parrafo
    parrafoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJuagador.appendChild(parrafoAtaqueJugador)
    ataqueDelEnemigo.appendChild(parrafoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    sectionReiniciar.style.display = 'flex' // Mostramos la sección reiniciar
    sectionMensajes.innerHTML = resultadoFinal + " FIN DE JUEGO"
}

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}

function enviarPosicion(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos);
                })
        }
    })    
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
    
        default:
            break;
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obetnerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function reiniciarJuego(){
    location.reload() // Se reinicia la pagina web
}

function obetnerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }        
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}


window.addEventListener('load', iniciarJuego); // permite compilar el js cuando se cargue todo el html