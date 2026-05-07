const guardarBtn = document.getElementById("guardarBtn");
const tablaBody = document.getElementById("tablaBody");

// Cargar datos guardados
document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
});

// Evento guardar
guardarBtn.addEventListener("click", () => {

    const rastreo = document.getElementById("rastreo").value;
    const contenido = document.getElementById("contenido").value;
    const estado = document.getElementById("estado").value;
    const fecha = document.getElementById("fecha").value;
    const proveedor = document.getElementById("proveedor").value;
    const observaciones = document.getElementById("observaciones").value;

    if(rastreo === "" || contenido === ""){
        alert("Completa los campos obligatorios");
        return;
    }

    const registro = {
        id: Date.now(),
        rastreo,
        contenido,
        estado,
        fecha,
        proveedor,
        observaciones
    };

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    registros.push(registro);

    localStorage.setItem("registros", JSON.stringify(registros));

    agregarFila(registro);

    limpiarFormulario();

});

// FUNCION AGREGAR FILA
function agregarFila(registro){

    let claseEstado = "";

    switch(registro.estado){

        case "Pendiente":
            claseEstado = "estado-pendiente";
            break;

        case "Proveedor":
            claseEstado = "estado-proveedor";
            break;

        case "En China":
            claseEstado = "estado-china";
            break;

        case "En tránsito":
            claseEstado = "estado-transito";
            break;

        case "En Miami":
            claseEstado = "estado-miami";
            break;

        case "En Aduana":
            claseEstado = "estado-aduana";
            break;

        case "Entregado":
            claseEstado = "estado-entregado";
            break;

    }

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${registro.rastreo}</td>
        <td>${registro.contenido}</td>
        <td>
            <span class="estado ${claseEstado}">
                ${registro.estado}
            </span>
        </td>
        <td>${registro.fecha}</td>
        <td>${registro.proveedor}</td>
        <td>
            <button onclick="eliminarRegistro(${registro.id})">
                Eliminar
            </button>
        </td>
    `;

    tablaBody.appendChild(fila);

}

// FUNCION CARGAR DATOS
function cargarDatos(){

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    tablaBody.innerHTML = "";

    registros.forEach(registro => {
        agregarFila(registro);
    });

}

// FUNCION ELIMINAR
function eliminarRegistro(id){

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    registros = registros.filter(registro => registro.id !== id);

    localStorage.setItem("registros", JSON.stringify(registros));

    cargarDatos();

}

// FUNCION LIMPIAR FORMULARIO
function limpiarFormulario(){

    document.getElementById("rastreo").value = "";
    document.getElementById("contenido").value = "";
    document.getElementById("proveedor").value = "";
    document.getElementById("observaciones").value = "";

}
