let cantidad
let meses
let total
let pagos
let interes
let insertar
let prestamos=[]



class Prestamo{
    constructor(cantidad, meses, total, pagos){
        this.cantidad=cantidad
        this.meses=meses
        this.total=total 
        this.pagos=pagos
    }
    
}



if(localStorage.getItem('storagePrestamos')){
    prestamos = JSON.parse(localStorage.getItem('storagePrestamos'))
} else{
    localStorage.setItem('storagePrestamos', JSON.stringify(prestamos))
}



const formulario = document.getElementById('idForm') 
const botonTareas = document.getElementById('btn-tareas')
const divPrestamos = document.getElementById('div-prestamos')



formulario.addEventListener('submit',(event) =>{	
	event.preventDefault()	
    cantidad = parseFloat((document.getElementById('idMonto').value))
	meses = parseFloat((document.getElementById('idMeses').value))
    
    totales()

    if((cantidad >=1000 && cantidad <=50000) && (meses >=1 && meses <=12)){
        const prestamo1 = new Prestamo(cantidad, meses, total, pagos)
        prestamos.push(prestamo1)
        localStorage.setItem('storagePrestamos', JSON.stringify(prestamos))
    }

    formulario.reset()
    insertarDatos()
})



function totales(){
    if((meses <= 3) && (cantidad >= 1000 && cantidad <=50000)){
        interes = 0.10
        total = cantidad + (cantidad * interes)
        pagos = parseFloat((total / meses).toFixed(2))  
    }

    else if((meses >3 && meses <= 6) && (cantidad >= 1000 && cantidad <=50000)) {
        interes = 0.25
        total = cantidad + (cantidad * interes)
        pagos = parseFloat((total / meses).toFixed(2))
    }

    else if((meses >6 && meses <= 12) && (cantidad >= 1000 && cantidad <=50000)) {
        interes = 0.50
        total = cantidad + (cantidad * interes)
        pagos = parseFloat((total / meses).toFixed(2))
    } 
}



function insertarDatos(){
    if((meses >=1 && meses <= 12) && (cantidad >= 1000 && cantidad <=50000)){
        prestamos.forEach(dato => {
        resultado.innerHTML =`
        <p>El prestamo solicitado es de: ${dato.cantidad} pesos a pagar en ${dato.meses} meses, 
        por lo que usted pagará un total de ${dato.total} pesos en cuotas de ${dato.pagos} mensuales</p>`
})} else if((meses >12) || (cantidad <1000 || cantidad >50000)) {
        resultado.innerHTML =`
        <p>Los datos ingresados no son correctos, intentelo nuevamente</p>`
}
}



botonTareas.addEventListener('click', () =>{
    let prestamoStorage = JSON.parse(localStorage.getItem('storagePrestamos'))
    divprestamos.innerHTML=""
    prestamoStorage.forEach((dato, indice) => {
        divprestamos.innerHTML+=`
            <div class="row" id='prestamo${indice}'>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Cotizacion de ${dato.cantidad}$ pesos</h5>
                            <p>El prestamo solicitado es de: ${dato.cantidad} pesos a pagar en ${dato.meses} meses, 
                            por lo que usted pagará un total de ${dato.total} pesos en cuotas de ${dato.pagos} mensuales</p>
                            <a href="#" class="btn btn-danger" id="btn-eliminar">Eliminar</a>
                        </div>
                    </div>
                </div>
            </div>
        
            <br>
            `
        })


    prestamoStorage.forEach((dato,indice) => {
    document.getElementById(`prestamo${indice}`).lastElementChild.lastElementChild.lastElementChild.lastElementChild.addEventListener("click",()=>{ 
    document.getElementById(`prestamo${indice}`).remove()
    prestamos.splice(indice,1)
    localStorage.setItem('storagePrestamos',JSON.stringify(prestamos))
    })
     
     })
})




