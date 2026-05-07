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

    // Obtener datos actuales
    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    // Agregar nuevo registro
    registros.push(registro);

    // Guardar nuevamente
    localStorage.setItem("registros", JSON.stringify(registros));

    // Agregar fila
    agregarFila(registro);

    // Limpiar formulario
    limpiarFormulario();

});

// FUNCION AGREGAR FILA
function agregarFila(registro){

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${registro.rastreo}</td>
        <td>${registro.contenido}</td>
        <td>${registro.estado}</td>
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
