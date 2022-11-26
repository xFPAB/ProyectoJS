// USO USUARIO ADMIN = "Francisco"
// Y CONTRASEÑA = "Alexelcapo"

let usuario;
let contrasena;
let usuario_intentos = 0;
let contrasena_intentos = 0;
// CREO UNA FUNCION PARA VALIDAR EL USUARIO Y CONTRASEÑA //
function validar_usuario(){
    usuario = prompt("Ingrese el usuario ADMIN.")
    if (usuario != "Francisco"){
        console.log("Disculpe, el usuario admin no es:", usuario)
        usuario_intentos = usuario_intentos + 1;
    }
    else if(usuario == "Francisco"){
        while(contrasena != "Alexelcapo"){
            contrasena = prompt("Ingrese la contraseña")
            if(contrasena != "Alexelcapo"){
                console.log("Disculpe, la contraseña no es:", contrasena);
                contrasena_intentos = contrasena_intentos + 1;
            }
        }
    }
}
// HAGO UN BUCLE PARA SOLICITAR USUARIO Y CONTRASENA HASTA Q SEA CORRECTO
while( usuario != "Francisco"){
    validar_usuario()
}
// HAGO UNA FUNCION PARA CALCULAR LOS INTENTOS REALIZADOS //
function calcular_intentos(){
    if(usuario_intentos >= 1){
        console.log("Tengo miedo admin, pusieron el usuario erroneo", usuario_intentos, "veces")
        if(contrasena_intentos <= 0){
            console.log("Por suerte, ingresaron la contraseña correctamente!")
        }
        else if(contrasena_intentos >= 1){
            console.log("Y encima, ingresaron mal la contraseña", contrasena_intentos,"veces")
        }
    }
    else if( usuario_intentos <= 0){
        console.log("Bienvenido, admin!")
        if(contrasena_intentos >= 1){
            console.log("Aunque sos medio tonto para ingresar mal la contraseña", contrasena_intentos, "veces..")
        }
    }
}
let preciofinal = document.getElementById("preciofinal");
// LLAMO A ESA FUNCION //
calcular_intentos()
let tabla = document.getElementById("carrito");
let anadir_al_carrito = document.getElementById("anadir_al_carrito")
// CREO ARRAY DE CARRITO //
let carrito = []

// ELIJO EL BOTON COMPRA Y LUEGO LO ESCUCHO PARA QUE SI HACE ALGO LO VEA //
let btn_compra = document.querySelectorAll(".botonCompra")

for (let boton of btn_compra){
    boton.addEventListener("click", agregar_a_carrito)
}
// LE AGREGO FUNCIONALIDAD AL BOTON //
function agregar_a_carrito(e){
    let padre = e.target.parentNode;
    let abuelo = padre.parentNode;

    let nombre_producto = padre.querySelector("h5").textContent;
    let precio_producto = padre.querySelector("span").textContent
    let img_producto = abuelo.querySelector("img").src

    let producto = {
        nombre : nombre_producto,
        precio : precio_producto,
        img: img_producto,
        cantidad: 1
    }
    carrito.push(producto)
}
// MUESTRO CAMBIOS EN HTML DEL CARRITO //
function genera_producto(producto){
    let carrito_nuevo = JSON.parse(localStorage.getItem("Carrito"))
    tabla.innerHTML = ""
    carrito_nuevo.forEach(producto => {
        let {nombre, cantidad, precio} = producto
        let fila = document.createElement('tr')
        fila.classList.add('contieneproducto')
        fila.innerHTML =`<td>${nombre}</td>
                        <td>${cantidad}</td>
                        <td>${precio}</td>
                        <td><button class="btn btn-danger borrar_elemento">Borrar</td>`
                        tabla.append(fila)
    });

    let btn_borrar = document.querySelectorAll(".borrar_elemento")

    for(let boton of btn_borrar){
        boton.addEventListener("click", borrar_producto)
    }

}
// LE DOY USO AL BOTON "BORRAR" QUE CREE ANTES
function borrar_producto(e){

    let abuelo = e.target.parentNode.parentNode;
    abuelo.remove();
}
// SELECCIONO EL BOTON DEL CARRITO PARA DARLE USO //
let btn_carrito = document.getElementById("mostrar_carrito")
// CREO UNA FUNCION QUE ME MUESTRE Y OCULTE EL CARRITO//
function ver_carrito(){
    genera_producto()

    if (tabla.style.display != "none"){
        tabla.style.display = "none";
    }
    else{
        tabla.style.display="block"
    }
}
// ESCUCHO EL BOTON Y LE DOY LA FUNCION QUE CREE ANTES
btn_carrito.addEventListener("click", ver_carrito)

let finalizarcompra = document.getElementById("finalizarcompra")
anadir_al_carrito.addEventListener("click",()=>{
    localStorage.setItem("Carrito",JSON.stringify(carrito))
    let suma=0;
     for (let i = 0; i < carrito.length; i++) {
        suma += parseInt(carrito[i].precio);
        } 
     console.log(suma);
    preciofinal.textContent = suma;
})

finalizarcompra.addEventListener("click",()=>{
    localStorage.clear();     
    Swal.fire({title: 'Gracias por su compra!!!',
             text:'Le llegara un mail de confirmacion de su producto',
                      icon: 'success',         
                      text:'volvera al inicio en 3 segundos'     })
                       setTimeout(() => {location.href = "./index.html"},3000)
})
fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&lang=es&units=metric&appid=476622cf2a51134857cb833b23424cfa")
    .then(response=>response.json())
    .then(data =>{
        console.log("Temperatura actual en Buenos Aires:", data.main.temp, "°")
    })
















/* // UNA VEZ INGRESADO A LA PAGINA COMO **ADMINISTRADOR** SIMULO UNA CARGA DE 3 OBJETOS, LUEGO, SIMULO VENTA.

class Productos{
    constructor(nombre,precio,stock){
        this.nombre=nombre;
        this.precio=precio;
        this.stock=stock;
    }
    get_datos(){
        console.log("Nombre del producto:", this.nombre)
        console.log("Subtotal", "$",this.precio)
        console.log("Total con IVA", "$",this.precio*1.21)
        console.log("---------------------------------")
    }

    get_stock(){
        if (this.stock < 2){
            return false
        }
        else{
            return true
        }
    }
    update_stock(unidades){
        this.stock = this.stock - unidades
    }
} */

/* // INGRESO LOS PRODUCTOS

let lista_productos = [];

for (let i=0; i < 3; i++){
    let nombre = prompt("Ingrese el nombre del producto")
    let precio = prompt("Ingrese el precio del producto")
    let stock = prompt("Ingrese el stock del producto")
    let producto= new Productos(nombre,precio,stock)
    lista_productos.push(producto);
}

// MUESTRO LA LISTA DE PRODUCTOS 
for(let producto of lista_productos){
    producto.get_datos();
}

// SIMULO COMPRA

let compra_usuario = prompt("Ingrese el nombre del producto que desea comprar")

function buscar_producto(producto){
    return producto.nombre == compra_usuario
}
function update_stock(cantidad){
    resultado_compra.stock - cantidad
}

let resultado_compra = lista_productos.find(buscar_producto)

if(resultado_compra != undefined){

    if(resultado_compra.get_stock()){
        let unidades = prompt("Cuantas unidades quiere?")
            if (unidades <= resultado_compra.stock){
                console.log("Felicidades, usted ha comprado", unidades, resultado_compra.nombre, "al precio de:","$", (resultado_compra.precio * unidades)*1.21)
                resultado_compra.update_stock(unidades)
                if(resultado_compra.stock == 0){
                    console.log("Te llevaste todas las", resultado_compra.nombre, "Que quedaban!")
                }
                else{
                    console.log("Nos quedaron", resultado_compra.stock)
                }
            }
            else{
                console.log("No tenemos suficiente stock, disculpe!, actualmente solo tenemos", resultado_compra.stock, "unidades de", resultado_compra.nombre)
            }

    }
    else{
        console.log("No tenemos stock, mil disculpas!")
    }
}
else{
    console.log("Hubo un error, intentelo de nuevo!")
} */