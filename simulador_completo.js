
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