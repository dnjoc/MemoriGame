window.addEventListener('load', () => {
    if (localStorage.getItem("usuarioLog") == null) {
        mostrarBoton();        
    } else {
        showUsername(localStorage.getItem("usuarioLog"));
        botonComenzar()
       
    }
});

let imgFerraris = [];
let selecciones = [];
var countTimer;
var cont = 0;
var fallido = 0;
var acierto = 0;
var aux = 0;
generarTablero();

function cargarImagenes() {
    imgFerraris = [
        '<img src="https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmVycmFyaXxlbnwwfHwwfHx8MA%3D%3D" alt=""></img>',

        '<img src="https://images.unsplash.com/photo-1615060363505-de228e3f7d82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZlcnJhcml8ZW58MHx8MHx8fDA%3D" alt=""></img>',

        '<img src="https://images.unsplash.com/photo-1583057273362-77fcf33d3da0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZlcnJhcml8ZW58MHx8MHx8fDA%3D" alt=""></img>',

        '<img src="https://images.unsplash.com/photo-1632441730372-d8509de481d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZlcnJhcml8ZW58MHx8MHx8fDA%3D" alt=""></img>',

        '<img src="https://images.unsplash.com/photo-1617654112329-c446806d40e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZlcnJhcml8ZW58MHx8MHx8fDA%3D" alt=""></img>',

        '<img src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmVycmFyaXxlbnwwfHwwfHx8MA%3D%3D" alt=""></img>',

        '<img src="https://images.unsplash.com/photo-1595951280326-8ffa79bdfbc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGZlcnJhcml8ZW58MHx8MHx8fDA%3D" alt=""></img>',

        '<img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmVycmFyaXxlbnwwfHwwfHx8MA%3D%3D" alt=""></img>',
    ]
}
function validarInputTexto(input) {
    if (input.value == '') {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        input.focus();
        return true;
    } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return false;
    }
}
function validarUsuario(form) {
    var inputUsuario = document.getElementById("errorUsuario");
    if (validarInputTexto(form.usernamec)) {
        inputUsuario.innerText= `Debe ingresar su nombre de usuario`;
        return false;
    } else {
        inputUsuario.style.display = "none";
        localStorage.setItem("usuarioLog", document.getElementById('usernamec').value);
        score();
        window.location.href = "index.html";
        return true;
    }
}
function tiempoJuego(aux) {
    let timeLS = localStorage.getItem("tiempoRecord");
    console.log("tiempo al final del juego");
    console.log(timeLS);
    if (timeLS > aux) {
        localStorage.setItem("tiempoRecord", aux);
    }
}
function generarTablero() {
    mostrarRecord();
    cargarImagenes();
    selecciones = []
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    for (let i = 0; i < 16; i++) {
        tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${imgFerraris[0]}
                </div>
                <div class="cara superior">
                    <h1>Dnjoc</h1>
                </div>
            </div>
        </div>        
        `)
        if (i % 2 == 1) {
            imgFerraris.splice(0, 1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML = tarjetas.join(" ")
    contadorTiempo();
    cambiarUser();
}
function generarTablero2() {
    cambiarMensajes();
    resetContadores();
    generarTablero();
}
function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i)
   
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }
    if (selecciones.length == 2) {
        deseleccionar(selecciones)
        selecciones = []
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        var jugada = document.getElementById("jugadas")
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"
           // alert("Fallaste, sigue intentando");
            fallido++;
            jugada.innerHTML = `
            <h2 style="color: yellow;">Intento Fallido</h2>        
            `;
            document.getElementById("fallido").innerHTML = `Intentos Fallidos: ${fallido} `;
        }else{
            trasera1.style.background = "#008f39"
            trasera2.style.background = "#008f39"
            acierto++;
            //alert("Excelente acabas de acertar un par");
            jugada.innerHTML = `
            <h2 style="color: green;">Acertaste.!</h2>        
            `;
            document.getElementById("aciertos").innerHTML = `Intentos Acertados: ${acierto} `;
        }
    }, 1000);
}
function score() {
    if (localStorage.getItem("tiempoRecord") == null) {
        localStorage.setItem("tiempoRecord", 86400);
    }
}
function showUsername(name) {
    let title = document.getElementById("username");
    title.innerText = `Bienvenid@ ${name}`;
}
function mostrarBoton() {
    document.getElementById("iniciarSesionB").style.display = "inline-block";
    document.getElementById("cambiarUsuario").style.display = "none";
    document.getElementById("comenzarJuego").style.display = "none";
    document.getElementById("nuevoJuego").style.display = "none";
}
function botonComenzar() {
    document.getElementById("iniciarSesionB").style.display = "none";
    document.getElementById("cambiarUsuario").style.display = "none";
    document.getElementById("comenzarJuego").style.display = "inline-block";
    document.getElementById("nuevoJuego").style.display = "none";
}
function cambiarUser() {
    document.getElementById("iniciarSesionB").style.display = "none";
    document.getElementById("cambiarUsuario").style.display = "inline-block";
    document.getElementById("comenzarJuego").style.display = "none";
    document.getElementById("nuevoJuego").style.display = "none";
}
function nuevoJuego() {
    document.getElementById("iniciarSesionB").style.display = "none";
    document.getElementById("cambiarUsuario").style.display = "inline-bloc";
    document.getElementById("comenzarJuego").style.display = "none";
    document.getElementById("nuevoJuego").style.display = "inline-block";
}

function ocultarUsuario() {
    document.getElementById("username").style.display = "none";
    document.getElementById("tablero").style.display = "none";
    document.getElementById("mejorTiempo").style.display = "none";
    document.getElementById("tiempoJuego").style.display = "none";
}
function cambiarMensajes() {
    document.getElementById("jugadas").innerHTML = "";
    document.getElementById("aciertos").innerHTML = "";
    document.getElementById("fallido").innerHTML = "";
}
function resetContadores() {
    fallido = 0;
    acierto = 0;
    cont = 0;
}
function mostrarRecord() {
    let infoLS = localStorage.getItem("tiempoRecord");
    console.log(infoLS);
    if (infoLS < 86400) {
        var record = document.getElementById("mejorTiempo");
        record.innerText = `Mejor Tiempo: ${infoLS} seg`;
    }
    
}
function contadorTiempo() {
     countTimer = window.setInterval(() => {
        cont++;
        console.log(cont);
        var mConteo = document.getElementById("tiempoJuego");
        mConteo.innerText = `Tiempo de juego: ${cont} seg`;
        if (acierto == 8) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Felicidades, Haz ganado el Juego!",
                showConfirmButton: true,
  customClass: {
    popup: 'swal2-custom-popup'
  }
            });
            var aux = cont;
            tiempoJuego(aux);
            nuevoJuego();
            clearInterval(countTimer);
            clearTimeout(timer);
            tiempoJuego();
        }
    }, 1000)
    
}


function limpiarYCerrar() {
    localStorage.clear();
    window.location.href = "index.html";
    document.getElementById("mejorTiempo").innerHTML = "";
    document.getElementById("tiempoJuego").innerHTML = "";
    cambiarMensajes();
    ocultarUsuario();
    mostrarBoton();
}