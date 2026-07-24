//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
function calcularDisponible(ingresos,egresos) 
{
    let disponible=ingresos-egresos;
    if (disponible>0) 
        {return disponible.toFixed(2);} 
    else { return 0;}
    
}
function calcularCapacidadPago(montoDisponible) 
{
    let capacidadPago=montoDisponible*0.3;
    return capacidadPago.toFixed(2);
}
function calcularInteresSimple(monto,tasa,plazoAnios) 
{
    let valorInteres= plazoAnios*monto*(tasa/100);
    return valorInteres;
}
function calcularTotalPagar(monto,interes) 
{
    const impuestoYSolca=100;
    let totalPagar=monto+interes+impuestoYSolca;
    return totalPagar;
}
function calcularCuotaMensual(totalPagar,plazoAnios) 
{
    const plazoMeses=plazoAnios*12;
    let cuotaMensual=totalPagar/plazoMeses;
    return cuotaMensual.toFixed(2);
}
function analizarCredito(capacidadPago,cuotaMensual) 
{
    if (capacidadPago>cuotaMensual) 
        {return true;} 
    else {return false;}   
}
//======================================================
// Muestra u oculta el mensaje de error de un input
//======================================================
function mostrarError(input,mensaje)
{

    // Buscar si ya existe un mensaje debajo del input
    let lblError=input.parentNode.querySelector(".mensajeError");


    // Si no existe, se crea
    if(lblError==null)
    {

        lblError=document.createElement("div");

        lblError.className="mensajeError";

        input.parentNode.appendChild(lblError);

    }


    //--------------------------------------------------
    // Existe error
    //--------------------------------------------------
    if(mensaje!="")
    {

        lblError.textContent=mensaje;

        lblError.classList.add("visible");

        input.classList.add("inputError");

    }
    //--------------------------------------------------
    // No existe error
    //--------------------------------------------------
    else
    {

        lblError.classList.remove("visible");

        input.classList.remove("inputError");

    }

}
function validarCampo(input,expresion,mensaje)
{

    const valor=input.value.trim();

    if(valor=="")
    {

        mostrarError(input,"Campo obligatorio");

        return false;

    }


    if(!expresion.test(valor))
    {

        mostrarError(input,mensaje);

        return false;

    }

    mostrarError(input,"");

    return true;

}
//======================================================
// Valida que un número entero se encuentre dentro
// de un rango determinado.
//======================================================
function validarRango(input, minimo, maximo)
{
    // Elimina espacios en blanco
    const valorTexto = input.value.trim();

    // Verifica que el campo no esté vacío
    if (valorTexto == "")
    {
        mostrarError(input, "Campo obligatorio.");
        return false;
    }

    // Convierte el texto a número
    const valor = Number(valorTexto);

    // Verifica que sea un número entero
    if (!Number.isInteger(valor))
    {
        mostrarError(input, "Debe ingresar un número entero.");
        return false;
    }

    // Verifica que esté dentro del rango permitido
    if (valor < minimo || valor > maximo)
    {
        mostrarError(input, `Debe ingresar un valor entre ${minimo} y ${maximo}.`);
        return false;
    }

    // Si todo es correcto, elimina el mensaje de error
    mostrarError(input, "");

    return true;
}