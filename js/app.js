const guardarBtn = document.getElementById("guardarBtn");
const tablaBody = document.getElementById("tablaBody");

// CARGAR DATOS
document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
});

// GUARDAR REGISTRO
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

    cargarDatos();

    limpiarFormulario();

});

// AGREGAR FILA
function agregarFila(registro){

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${registro.rastreo}</td>

        <td>${registro.contenido}</td>

        <td>
            <select onchange="cambiarEstado(${registro.id}, this.value)">
                <option value="Pendiente" ${registro.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>

                <option value="Proveedor" ${registro.estado === "Proveedor" ? "selected" : ""}>Proveedor</option>

                <option value="En China" ${registro.estado === "En China" ? "selected" : ""}>En China</option>

                <option value="En tránsito" ${registro.estado === "En tránsito" ? "selected" : ""}>En tránsito</option>

                <option value="En Miami" ${registro.estado === "En Miami" ? "selected" : ""}>En Miami</option>

                <option value="En Aduana" ${registro.estado === "En Aduana" ? "selected" : ""}>En Aduana</option>

                <option value="Entregado" ${registro.estado === "Entregado" ? "selected" : ""}>Entregado</option>
            </select>
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

// CARGAR DATOS
function cargarDatos(){

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    tablaBody.innerHTML = "";

    registros.forEach(registro => {
        agregarFila(registro);
    });

}

// CAMBIAR ESTADO
function cambiarEstado(id, nuevoEstado){

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    registros = registros.map(registro => {

        if(registro.id === id){
            registro.estado = nuevoEstado;
        }

        return registro;

    });

    localStorage.setItem("registros", JSON.stringify(registros));

}

// ELIMINAR
function eliminarRegistro(id){

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    registros = registros.filter(registro => registro.id !== id);

    localStorage.setItem("registros", JSON.stringify(registros));

    cargarDatos();

}

// LIMPIAR FORMULARIO
function limpiarFormulario(){

    document.getElementById("rastreo").value = "";
    document.getElementById("contenido").value = "";
    document.getElementById("proveedor").value = "";
    document.getElementById("observaciones").value = "";

}
