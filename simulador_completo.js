
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let montoDisponible=0;
  let capacidadPago=0;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

//Funcion para ocultar secciones
function ocultarSecciones() 
{
  let seccionParametros=document.getElementById("parametros").classList.remove("activa");
  let seccionClientes=document.getElementById("clientes").classList.remove("activa");
  let seccionCredito=document.getElementById("credito").classList.remove("activa");
  let seccionContacto=document.getElementById("contacto").classList.remove("activa");
}
//Funcion para activar seccion de parametros
function mostrarSeccion(id) 
{
  ocultarSecciones();
  let seccion=document.getElementById(id).classList.add("activa");
}

//CONFIGURAR TASA
function guardarTasa() 
{
  let cmpTasa=recuperarInt("tasaInteres");
  if (cmpTasa>=10&&cmpTasa<=20) 
    {
      mostrarTexto("mensajeTasa","Tasa configurada correctamente: "+cmpTasa+"%");
      tasaInteres=cmpTasa;
    }
  else {mostrarTexto("mensajeTasa","La tasa debe estar entre 10% y 20%");}
}


//ADMINISTRACION DE CLIENTES
//1. Crear y listar clientes
function guardarCliente() 
{
  let cmpTxtCedula=recuperaraTexto("txtCedula");
  clienteSeleccionado=buscarCliente(cmpTxtCedula);

  let cmpTxtNombre=recuperaraTexto("txtNombre");
  let cmpTxtApellido=recuperaraTexto("txtApellido");
  let cmpTxtIngreso=recuperarFloat("txtIngresos");
  let cmpTxtEgresos=recuperarFloat("txtEgresos");
    let cmpTxtEmail=recuperaraTexto("txtEmail");
  let validacion=actualizarEstadoBoton();
  /*let validacion=false;*/
  if (validacion!=false)
    {
      alert ("ValidCION CORRCTA");
      if (clienteSeleccionado==null) 
      {
        //Crear Objeto
        let cliente={};
        //Ingresar datos de input a objeto
        cliente.cedula=cmpTxtCedula;
        cliente.nombre=cmpTxtNombre;
        cliente.apellido=cmpTxtApellido;
        cliente.ingresos=cmpTxtIngreso;
        cliente.egresos=cmpTxtEgresos;
        cliente.email=cmpTxtEmail;
        console.log(cliente);
        //Agregar Objeto a arreglo
        clientes.push(cliente);
        console.log(clientes);
      }
      else
      {
        clienteSeleccionado.nombre=cmpTxtNombre;
        clienteSeleccionado.apellido=cmpTxtApellido;
        clienteSeleccionado.ingresos=cmpTxtIngreso;
        clienteSeleccionado.egresos=cmpTxtEgresos;
        clienteSeleccionado.email=cmpTxtEmail;
      }
    }
    else {alert("VALIDACION INCORRECTA")}
  limpiar();
  pintarClientes();
}

function pintarClientes() 
{
  let cmpTabla=document.getElementById("tablaClientes");
  let arregloARecorrer;
  let codigoTabla='';
  for (let index = 0; index < clientes.length; index++) 
    {
      arregloARecorrer=clientes[index];
      codigoTabla+='<tr><td>'+arregloARecorrer.cedula+'</td>'+
          '<td>'+arregloARecorrer.nombre+'</td>'+
          '<td>'+arregloARecorrer.apellido+'</td>'+
          '<td>'+arregloARecorrer.ingresos+'</td>'+
          '<td>'+arregloARecorrer.egresos+'</td>'+
          '<td>'+arregloARecorrer.email+'</td>'+
          '<td>'+
            `<button onclick="seleccionarCliente('`+arregloARecorrer.cedula+`');">Actualizar</button>`+
            `<button onclick="eliminarCliente('`+arregloARecorrer.cedula+`');">Eliminar</button>`+
          '</td></tr>';
    }
  cmpTabla.innerHTML=codigoTabla;
}

//BUSCAR Y ACTUALIZAR
function buscarCliente(cedula) 
{
  let clienteEncontrado=null;
  let arregloARecorrer;
  for (let index = 0; index < clientes.length; index++) 
    {
    arregloARecorrer=clientes[index];
      if (cedula==arregloARecorrer.cedula) 
        {
          alert("Cliente si existe");
          clienteEncontrado=arregloARecorrer;
        }
    }
    return clienteEncontrado;
}

function seleccionarCliente(cedula) 
{
  let clienteSeleccionado=buscarCliente(cedula);
  mostrarTextoEnCaja("txtCedula",clienteSeleccionado.cedula);
  mostrarTextoEnCaja("txtNombre",clienteSeleccionado.nombre);
  mostrarTextoEnCaja("txtApellido",clienteSeleccionado.apellido);
  mostrarTextoEnCaja("txtIngresos",clienteSeleccionado.ingresos);
  mostrarTextoEnCaja("txtEgresos",clienteSeleccionado.egresos);
  mostrarTextoEnCaja("txtEmail",clienteSeleccionado.email);
}
function limpiar() 
{
  mostrarTextoEnCaja("txtCedula","");
  mostrarTextoEnCaja("txtNombre","");
  mostrarTextoEnCaja("txtApellido","");
  mostrarTextoEnCaja("txtIngresos","");
  mostrarTextoEnCaja("txtEgresos","");
  mostrarTextoEnCaja("txtEmail","");
}
function eliminarCliente(cedula) 
{
  clienteSeleccionado=buscarCliente(cedula);
  let confirmarElimminar=confirm("¿Deseas eliminar el cliente?");
  if (confirmarElimminar==true) 
    {
      clientes.splice(clienteSeleccionado,1);
      pintarClientes();
    } 
  else 
    {alert("El usuario NO se elimino");}
}

//PARTE 2
function buscarClienteCredito() 
{
  let cmpClienteCredito=recuperaraTexto("buscarCedulaCredito");
  let cmpMostrarCliente=document.getElementById("datosClienteCredito");
  clienteSeleccionado=buscarCliente(cmpClienteCredito);
  let codigoHtml="<h3>Datos del Cliente</h3>";
  if (clienteSeleccionado!=null) 
    {
      codigoHtml+='<p><strong>Cédula:</strong>'+clienteSeleccionado.cedula+
      '</p><p><strong>Nombre:</strong>'+clienteSeleccionado.nombre+
      '</p><p><strong>Apellido:</strong>'+clienteSeleccionado.apellido+
      '</p><p><strong>Ingresos:</strong>'+clienteSeleccionado.ingresos+
      '</p><p><strong>Egresos:</strong>'+clienteSeleccionado.egresos+'</p>'+
      '</p><p><strong>Email:</strong>'+clienteSeleccionado.email+'</p>';
      cmpMostrarCliente.innerHTML=codigoHtml;
    } 
  else {codigoHtml+="<p><h4>Cliente no existe</h4></p>";
          cmpMostrarCliente.innerHTML=codigoHtml;}
}

function calcularCredito() 
{
  montoDisponible=calcularDisponible(clienteSeleccionado.ingresos,clienteSeleccionado.egresos);
  capacidadPago=calcularCapacidadPago(montoDisponible);
  let cmpMontoCredito=recuperarFloat("montoCredito");
  let cmpPlazo=recuperarInt("plazoCredito");
  let interesSimple=calcularInteresSimple(cmpMontoCredito,tasaInteres,cmpPlazo);
  montoCalculado=calcularTotalPagar(cmpMontoCredito,interesSimple);
  cuotaCalculada=calcularCuotaMensual(montoCalculado,cmpPlazo);
  creditoAprobado=analizarCredito(capacidadPago,cuotaCalculada);

  //Mostrar resultados de credito
  let estadoCredito="";
  let cmpResultadoCredito=document.getElementById("resultadoCredito");
  if (creditoAprobado==false) 
    {
      estadoCredito="RECHAZADO";
      cmpResultadoCredito.className="rechazado";
    }
    else 
    {
      estadoCredito="APROBADO";
      cmpResultadoCredito.className="aprobado";
    }
  let codigoHtml='<strong>Capacidad de pago: </strong>'+capacidadPago+'<br>'+
                  '<strong>Total a pagar: </strong>'+montoCalculado+'<br>'+
                  '<strong>Cuota mensual: </strong>'+cuotaCalculada+'<br>'+
                  '<strong>RESULTADO: </strong>'+estadoCredito;
  cmpResultadoCredito.innerHTML=codigoHtml;
}

//VALIDACION DE DATOS
const validaciones = [
    {
        id: "txtCedula",
        patron: /^\d+$/,
        mensaje: "Solo números enteros"
    },
    {
        id: "txtNombre",
        patron: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        mensaje: "Solo letras"
    },
    {
        id: "txtApellido",
        patron: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        mensaje: "Solo letras"
    },
    {
        id: "txtIngresos",
        patron: /^\d+(\.\d+)?$/,
        mensaje: "Solo números"
    },
    {
        id: "txtEgresos",
        patron: /^\d+(\.\d+)?$/,
        mensaje: "Solo números"
    },
    {
        id: "txtEmail",
        patron: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        mensaje: "Solo letras"
    }
    /*,{
        id: "plazoCredito",
        patron: /^\d+$/,
        mensaje: "Solo números enteros"
    },
    {
        id: "montoCredito",
        patron: /^\d+(\.\d+)?$/,
        mensaje: "Solo números"
    },
    {
        id: "buscarCedulaCredito",
        patron: /^\d+$/,
        mensaje: "Solo números enteros"
    }*/
    
];
function iniciarValidaciones(){

    validaciones.forEach(function(campo){

        const input = document.getElementById(campo.id);

        input.onblur = function(){

            validarCampo(input,campo);

        };

    });

}

//====================================================
// VERIFICA SI TODOS LOS CAMPOS SON VÁLIDOS
//====================================================
function actualizarEstadoBoton()
{

    let formularioValido = true;

    validaciones.forEach(function(campo)
    {

        const input = document.getElementById(campo.id);

        const valor = input.value.trim();

        // Si está vacío
        if(valor === ""){
            formularioValido = false;
            return;
        }

        // Si no cumple el patrón
        if(!campo.patron.test(valor)){
            formularioValido = false;
        }

    });

    // Habilitar o deshabilitar botón
    btnGuardarCliente.disabled = !formularioValido;

}
function validarCampo(input, configuracion)
{
    // Obtener el texto del input sin espacios
    const valor = input.value.trim();

    // Guardar el placeholder original una sola vez
    if(!input.dataset.placeholderOriginal){
        input.dataset.placeholderOriginal = input.placeholder;
    }
if(valor === "" || !configuracion.patron.test(valor)){

    input.classList.add("input-error");

    input.value = "";

    input.placeholder = "Caracteres no permitidos";

    actualizarEstadoBoton();

    return false;
}

input.classList.remove("input-error");

input.placeholder = input.dataset.placeholderOriginal;

actualizarEstadoBoton();

return true;

}
//====================================================
// INICIAR EL MOTOR DE VALIDACIONES
//====================================================
document.addEventListener("DOMContentLoaded", function(){

    iniciarValidaciones();
    actualizarEstadoBoton();

});