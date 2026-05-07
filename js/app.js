const guardarBtn = document.getElementById("guardarBtn");
const tablaBody = document.getElementById("tablaBody");

guardarBtn.addEventListener("click", () => {

    const rastreo = document.getElementById("rastreo").value;
    const contenido = document.getElementById("contenido").value;
    const estado = document.getElementById("estado").value;
    const fecha = document.getElementById("fecha").value;
    const proveedor = document.getElementById("proveedor").value;

    if(rastreo === "" || contenido === ""){
        alert("Completa los campos obligatorios");
        return;
    }

    const nuevaFila = `
        <tr>
            <td>${rastreo}</td>
            <td>${contenido}</td>
            <td>${estado}</td>
            <td>${fecha}</td>
            <td>${proveedor}</td>
        </tr>
    `;

    tablaBody.innerHTML += nuevaFila;

    // Limpiar formulario
    document.getElementById("rastreo").value = "";
    document.getElementById("contenido").value = "";
    document.getElementById("proveedor").value = "";
    document.getElementById("observaciones").value = "";

});
