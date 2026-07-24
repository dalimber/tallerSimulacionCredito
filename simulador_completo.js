
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
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
    }
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
          '<td>'+
            `<button onclick="seleccionarCliente('`+arregloARecorrer.cedula+`')">Actualizar</button>`+
            '<button onclick="">Eliminar</button>'+
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
}
function limpiar() 
{
  mostrarTextoEnCaja("txtCedula","");
  mostrarTextoEnCaja("txtNombre","");
  mostrarTextoEnCaja("txtApellido","");
  mostrarTextoEnCaja("txtIngresos","");
  mostrarTextoEnCaja("txtEgresos","");
}

//PARTE 2
function buscarClienteCredito() 
{
  let cmpClienteCredito=recuperaraTexto("buscarCedulaCredito");
  let cmpMostrarCliente=document.getElementById("datosClienteCredito");
  let selecClienteCredito=buscarCliente(cmpClienteCredito);
  let codigoHtml="<h3>Datos del Cliente</h3>";
  if (selecClienteCredito!=null) 
    {
      codigoHtml+='<p><strong>Cédula:</strong>'+selecClienteCredito.cedula+
      '</p><p><strong>Nombre:</strong>'+selecClienteCredito.nombre+
      '</p><p><strong>Apellido:</strong>'+selecClienteCredito.apellido+
      '</p><p><strong>Ingresos:</strong>'+selecClienteCredito.ingresos+
      '</p><p><strong>Egresos:</strong>'+selecClienteCredito.egresos+'</p>';
      cmpMostrarCliente.innerHTML=codigoHtml;
    } 
  else {codigoHtml+="<p><h4>Cliente no existe</h4></p>";
          cmpMostrarCliente.innerHTML=codigoHtml;}
}

