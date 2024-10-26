$();
let jugadores = [];
let puntajes = {};
let rondas = 0;
let tiempoPorRonda = 0;
let rondaActual = 0;
let referencias = [];
let propiedadActual = "";
let propiedadSeleccionada = "";
let desempate = false;

// Cargar las referencias desde el JSON
async function cargarReferencias() {
  try {
    const response = await fetch("referencias.json");
    referencias = await response.json();
  } catch (error) {
    console.error("Error al cargar las referencias:", error);
  }
}

function configurar() {
  $("#configuracion").parent("div").show();
  $("#instrucciones").hide();
  $("#jugar").hide();
}

function instrucciones() {
  $("#jugar").toggle($("#instrucciones").is(":visible"));
  $("#instrucciones").slideToggle();
  $("#configuracion").parent("div").hide();
}

// Iniciar el juego con la configuración ingresada
function iniciarJuego() {
  const jugadoresInput = document.getElementById("jugadoresInput").value.trim();
  jugadores = jugadoresInput
    .split(/\s*,\s*/)
    .map((nombre) => nombre.replace(/\s+/g, "_"));
  rondas = parseInt($("#rondasInput").val());
  tiempoPorRonda = parseInt($("#tiempoInput").val());

  if (jugadores.length < 2) {
    // alert("Debes ingresar al menos dos jugadores.");
    $("#jugadoresInput").addClass("is-invalid");
    $("#feedback-jugadores").addClass("invalid-feedback");
    $("#feedback-jugadores").html("Debes ingresar al menos dos jugadores.");
    $("#feedback-jugadores").show();
    return;
  } else {
    $("#configuracion").hide();
    $("#jugadoresInput").removeClass("is-invalid");
    $("#feedback-jugadores").removeClass("invalid-feedback");
    $("#feedback-jugadores").hide();
    jugadores.forEach((jugador) => (puntajes[jugador.trim()] = 0));

    cargarReferencias().then(() => {
      siguienteRonda();
    });
    $("#juego").show();
  }
}

// Mostrar la siguiente ronda
function siguienteRonda() {
  if (rondaActual < rondas) {
    rondaActual++;
    mostrarReferenciaAleatoria(desempate);
  } else {
    mostrarGanador();
  }
}

// Mostrar una referencia aleatoria y permitir seleccionar la propiedad
function mostrarReferenciaAleatoria(desempate) {
  $("#juego").hide();
  $("#ronda").hide();
  $("#referencia").hide();
  $("#puntajes").hide();
  $("#botonSiguienteRonda").hide();
  const referencia =
    referencias[Math.floor(Math.random() * referencias.length)];
  const propiedades = ["frase"];

  // Crear botones para seleccionar la propiedad
  propiedades.forEach((prop) => {
    if (desempate) {
      $("#ronda").html(
        `<h2>Ronda de desempate</h2>
          <button class="btn btn-primary" onclick="mostrarPropiedad('${prop}', '${referencia[prop]}', '${referencia.escritura}', '${desempate}')">Comenzar</button>`
      );
    } else {
      $("#ronda").html(
        `<h2>Ronda ${rondaActual} de ${rondas}</h2>
        <button class="btn btn-primary" onclick="mostrarPropiedad('${prop}', '${referencia[prop]}', '${referencia.escritura}', '${desempate}')">Comenzar</button>`
      );
    }
  });
  $("#juego").show();
  $("#ronda").show();
}

// Mostrar la propiedad seleccionada y el temporizador
function mostrarPropiedad(propiedad, valor, escritura, desempate) {
  $("#ronda button").hide();
  $("#escritura").hide();
  propiedadActual = propiedad;
  if (desempate) {
    $("#ronda h2").text(`Ronda ${rondaActual} de ${rondas}`);
  } else {
    $("#ronda h2").text(`Ronda de Desempate`);
  }
  $("#escritura").text(`${escritura}`);
  $("#frase").text(`${valor}`);
  $("#contador h1").html(`${tiempoPorRonda}<br><small>segundos</small>`);
  $("#puntajes").hide();
  $("#referencia").show();
  $("#contador").show();
  $("#btnTiempo").show();
}

// Iniciar el temporizador para la ronda
function iniciarRonda() {
  $("#btnTiempo").hide();

  let tiempoRestante = tiempoPorRonda;
  let progresoInicial = 100; // Progreso inicial de la barra
  const decremento = 100 / tiempoPorRonda; // Cuánto disminuye por segundo

  const timer = setInterval(() => {
    tiempoRestante--;
    $("#contador h1").html(function () {
      let segundos;
      if (tiempoRestante == 1) {
        segundos = "segundo";
      } else {
        segundos = "segundos";
      }
      return tiempoRestante + "<br><small>" + segundos + "</small>";
    });

    // Actualizar barra de progreso
    progresoInicial -= decremento;
    $("#barraProgreso").css("width", `${progresoInicial}%`);
    $("#barraProgreso").attr("aria-valuenow", progresoInicial);

    // Cambiar color según el progreso
    if (progresoInicial > 50) {
      $("#barraProgreso").removeClass("bg-warning", "bg-danger");
      $("#barraProgreso").addClass("bg-success");
    } else if (progresoInicial > 25) {
      $("#barraProgreso").removeClass("bg-success", "bg-danger");
      $("#barraProgreso").addClass("bg-warning");
    } else {
      $("#barraProgreso").removeClass("bg-success", "bg-warning");
      $("#barraProgreso").addClass("bg-danger");
    }

    if (tiempoRestante <= 0) {
      clearInterval(timer);
      $("#botonRespuesta").show();
    }
  }, 1000);
}

// Verificar las respuestas y asignar puntos
function verificarRespuestas() {
  $("#escritura").show();
  $("#contador").hide();
  let opcionesHTML = ``;
  let btnClass = [
    ["primary"],
    ["secondary"],
    ["success"],
    ["danger"],
    ["warning"],
    ["info"],
    ["light"],
  ];
  jugadores.forEach((jugador, index) => {
    opcionesHTML += `<div class="col" id="${jugador}">
    <div class="card border-${btnClass[index]} mb-3">
    <div class="card-header">${jugador}</div>
    <div class="card-body">
    <h5 class="card-title puntos-${jugador}">Puntos: ${puntajes[jugador]}</h5>
    <div class="btn-group btn-group-sm">
    <button class="btn btn-outline-success" id="add-${jugador}" onclick="asignarPunto('${jugador}')"><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
    <button class="btn btn-outline-danger" id="remove-${jugador}" onclick="quitarPunto('${jugador}')"><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
    </div>
    </div>
    </div>
    </div>
    `;
  });
  $("#puntajes").html(opcionesHTML);
  $("#puntajes").show();
}

// Mostrar la escritura correcta
function mostrarEscritura() {
  $("#botonRespuesta").hide();
  verificarRespuestas();
}

// Asignar el punto al jugador seleccionado
function asignarPunto(jugador) {
  puntajes[jugador]++;
  mostrarPuntajes();
  $("#botonSiguienteRonda").show();
}

// Eliminar el punto al jugador seleccionado
function quitarPunto(jugador) {
  puntajes[jugador]--;
  mostrarPuntajes();
  $("#botonSiguienteRonda").show();
}

// Mostrar los puntajes actuales
function mostrarPuntajes() {
  jugadores.forEach((jugador) => {
    $(`#${jugador}`)
      .find(".card-title")
      .text("Puntos: " + puntajes[jugador]);
  });
}

// Mostrar el jugador o equipo ganador
function mostrarGanador() {
  $("#referencia").hide();
  $("#contador").hide();
  $("#botonSiguienteRonda").hide();
  const maxPuntaje = Math.max(...Object.values(puntajes));
  const jugadoresEmpatados = jugadores.filter(
    (jugador) => puntajes[jugador] === maxPuntaje
  );
  if (jugadoresEmpatados.length > 1) {
    rondas++;
    desempate = true;
    // Hay empate
    $("#ronda").html(
      `Empate entre: ${jugadoresEmpatados.join(
        ", "
      )}<br><button class="btn btn-warning" onclick="siguienteRonda(${desempate})">Iniciar ronda de desempate</button>`
    );
  } else {
    $("#ronda").html(
      `Ronda ${rondaActual} de ${rondas}<br>
      Juego ganado por: 
      <strong class="text-primary">${jugadoresEmpatados[0]}</strong>
      con <strong class="text-success">${maxPuntaje} puntos</strong>`
    );
    verificarRespuestas();
    mostrarPuntajes();
    const borderClass = $(`#${jugadoresEmpatados[0]}`)
      .children(".card")
      .attr("class")
      .split(" ")
      .find((cls) => cls.startsWith("border-"));
    $(`#${jugadoresEmpatados[0]}`)
      .children(".card")
      .removeClass(borderClass)
      .addClass(`text-bg-${borderClass.replace("border-", "")}`);
    $(".btn-group").hide(300);
    $("#botonReiniciar").show();
    $("#ountaje").show();
  }
  $("#ronda").show();
}

// Reiniciar el juego para comenzar nuevamente
function reiniciarJuego() {
  jugadores = [];
  puntajes = {};
  rondaActual = 0;

  $("#configuracion").show();
  $("#juego").hide();
  $("#puntajes").show();
  $("#botonReiniciar").hide();
}
