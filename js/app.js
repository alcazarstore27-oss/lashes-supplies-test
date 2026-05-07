const guardarBtn = document.getElementById("guardarBtn");
const tablaBody = document.getElementById("tablaBody");
const buscador = document.getElementById("buscador");

// CARDS
const totalCard = document.getElementById("totalCard");
const pendienteCard = document.getElementById("pendienteCard");
const proveedorCard = document.getElementById("proveedorCard");
const chinaCard = document.getElementById("chinaCard");
const transitoCard = document.getElementById("transitoCard");
const miamiCard = document.getElementById("miamiCard");
const aduanaCard = document.getElementById("aduanaCard");
const entregadoCard = document.getElementById("entregadoCard");

// CARGAR
document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
});

// BUSCADOR
buscador.addEventListener("keyup", buscarRegistros);

// GUARDAR
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

// COLOR ESTADO
function obtenerClaseEstado(estado){

    switch(estado){

        case "Pendiente":
            return "estado-pendiente";

        case "Proveedor":
            return "estado-proveedor";

        case "En China":
            return "estado-china";

        case "En tránsito":
            return "estado-transito";

        case "En Miami":
            return "estado-miami";

        case "En Aduana":
            return "estado-aduana";

        case "Entregado":
            return "estado-entregado";

        default:
            return "";
    }

}

// AGREGAR FILA
function agregarFila(registro){

    const claseEstado = obtenerClaseEstado(registro.estado);

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${registro.rastreo}</td>

        <td>${registro.contenido}</td>

        <td>
            <select 
                class="${claseEstado}"
                onchange="cambiarEstado(${registro.id}, this.value)"
            >

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

    actualizarCards();

}

// ACTUALIZAR CARDS
function actualizarCards(){

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    totalCard.textContent = registros.length;

    pendienteCard.textContent = registros.filter(r => r.estado === "Pendiente").length;

    proveedorCard.textContent = registros.filter(r => r.estado === "Proveedor").length;

    chinaCard.textContent = registros.filter(r => r.estado === "En China").length;

    transitoCard.textContent = registros.filter(r => r.estado === "En tránsito").length;

    miamiCard.textContent = registros.filter(r => r.estado === "En Miami").length;

    aduanaCard.textContent = registros.filter(r => r.estado === "En Aduana").length;

    entregadoCard.textContent = registros.filter(r => r.estado === "Entregado").length;

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

    cargarDatos();

}

// ELIMINAR
function eliminarRegistro(id){

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    registros = registros.filter(registro => registro.id !== id);

    localStorage.setItem("registros", JSON.stringify(registros));

    cargarDatos();

}

// BUSCAR
function buscarRegistros(){

    const texto = buscador.value.toLowerCase();

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    let filtrados = registros.filter(registro => {

        return (
            registro.rastreo.toLowerCase().includes(texto) ||
            registro.contenido.toLowerCase().includes(texto) ||
            registro.proveedor.toLowerCase().includes(texto)
        );

    });

    tablaBody.innerHTML = "";

    filtrados.forEach(registro => {
        agregarFila(registro);
    });

}

// FILTRAR POR ESTADO
function filtrarPorEstado(estado){

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    tablaBody.innerHTML = "";

    if(estado === "TODOS"){

        registros.forEach(registro => {
            agregarFila(registro);
        });

        return;
    }

    let filtrados = registros.filter(registro => registro.estado === estado);

    filtrados.forEach(registro => {
        agregarFila(registro);
    });

}

// LIMPIAR
function limpiarFormulario(){

    document.getElementById("rastreo").value = "";
    document.getElementById("contenido").value = "";
    document.getElementById("proveedor").value = "";
    document.getElementById("observaciones").value = "";

}
