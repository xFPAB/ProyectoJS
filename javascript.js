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
// LLAMO A ESA FUNCION //
calcular_intentos()

// UNA VEZ INGRESADO A LA PAGINA COMO **ADMINISTRADOR** SIMULO UNA CARGA DE 3 OBJETOS, LUEGO, SIMULO VENTA.

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
}

// INGRESO LOS PRODUCTOS

let lista_productos = [];

for (let i=0; i < 3; i++){
    let nombre = prompt("Nombre del producto")
    let precio = prompt("Precio del producto")
    let stock = prompt("Stock del producto")
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
}