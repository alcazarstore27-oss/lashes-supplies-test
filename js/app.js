const guardarBtn = document.getElementById("guardarBtn");
const tablaBody = document.getElementById("tablaBody");

// Cargar datos al iniciar
document.addEventListener("DOMContentLoaded", cargarDatos);

// Evento guardar
guardarBtn.addEventListener("click", guardarRegistro);

// FUNCION GUARDAR
function guardarRegistro(){

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

    const nuevoRegistro = {
        id: Date.now(),
        rastreo,
        contenido,
        estado,
        fecha,
        proveedor,
        observaciones
    };

    // Obtener registros actuales
    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    // Agregar nuevo
    registros.push(nuevoRegistro);

    // Guardar
    localStorage.setItem("registros", JSON.stringify(registros));

    // Mostrar en tabla
    agregarFila(nuevoRegistro);

    // Limpiar formulario
    limpiarFormulario();
}

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

    registros.forEach(registro => {
        agregarFila(registro);
    });

}

// FUNCION ELIMINAR
function eliminarRegistro(id){

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    registros = registros.filter(registro => registro.id !== id);

    localStorage.setItem("registros", JSON.stringify(registros));

    tablaBody.innerHTML = "";

    cargarDatos();
}

// FUNCION LIMPIAR
function limpiarFormulario(){

    document.getElementById("rastreo").value = "";
    document.getElementById("contenido").value = "";
    document.getElementById("proveedor").value = "";
    document.getElementById("observaciones").value = "";

}
