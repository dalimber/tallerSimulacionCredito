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
    capacidadPagoInt=parseFloat(capacidadPago);
    cuotaMensualInt=parseFloat(cuotaMensual);
    if (capacidadPagoInt>cuotaMensualInt) 
        {return true;} 
    else {return false;}   
}
