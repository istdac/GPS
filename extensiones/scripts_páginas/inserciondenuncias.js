document.querySelector('#boton-enviar').addEventListener('click',(event)=>{
    const hechos = document.querySelector('#descripcion-abuso').value;
    const idEscuela = document.querySelector('#escuela').value;
    const ACCIONTOMADA = document.querySelector('#acciones-tomadas').value;
    const SERVICIOADD = document.querySelector('#servicio-externo').value;
    const INFOTIPOSVIOLENCIA = document.querySelector('#informacion-violencia').value;
    const MECANISMOSDENUNCIAS = document.querySelector('#mecanismos-violencia').value;
    const TEMPORALIDAD = document.querySelector('#temporalidad').value;
    const ZONA = document.querySelector('#zona-incidente').value;
    const NIVELGRAVEDAD = document.querySelector('#gravedad-asunto').value;
    const TIPOVIOLENCIA = document.querySelector('#tipo-violencia').value;
    const SUCEDIOALGO = document.querySelector('#sucedió-algo').value;

    if(hechos=="" || idEscuela == "" || ACCIONTOMADA == "" || SERVICIOADD == "" || INFOTIPOSVIOLENCIA == "" || MECANISMOSDENUNCIAS == "" || TEMPORALIDAD == "" ||
        ZONA == "" || NIVELGRAVEDAD == "" || TIPOVIOLENCIA == "" || SUCEDIOALGO == ""){
            alert("Por lo menos uno de los campos se encuentra vacío, porfavor revise todo y vuelva a intentar");
            return;
    }
    
    funcionallamar();
})
document.querySelector('#nombresAbusador').addEventListener('focusin',(event)=>{insertarDenunciante();});
document.querySelector('#tipo-violencia').addEventListener('focusin',(event)=>{insertarAbusador();});
document.querySelector('#sucedió-algo').addEventListener('focusin',(event)=>{if(checadorD && checadorA){actualizaridDenuncianteYAbusador()}});
document.querySelector('#sucedió-algo').addEventListener('focusout',(event)=>{console.log("Denunciante: "+idDenuncianteRecuperado); console.log("Agresor: "+idAbusadorRecuperado);});



var idDenuncianteRecuperado;
var idAbusadorRecuperado;
var checadorD = false;
var checadorA = false;


function insertarDenunciante() {
    const nombreDenunciante = document.querySelector('#nombreDenunciante');
    const contacto = document.querySelector('#contacto');
    const sexo = document.querySelector('#sexoDenunciante');
    const edad = document.querySelector('#edadDenunciante');
    const rol = document.querySelector('#rolDenunciante');

    if (nombreDenunciante.value == "" || contacto.value == "" || sexo.value == "" || edad.value < 1){
        alert ("Por favor llene todos los datos del Denunciante")
        return;
    }

    let datos = {
        nombreDenunciante:nombreDenunciante.value,
        contacto:contacto.value,
        sexo:sexo.value,
        edad:edad.value,
        rol:rol.value
    }
    
    checadorD = true;
    
    let url = "http://localhost:3000/denunciante/";

    const xhttp = new XMLHttpRequest();
    xhttp.open('post',url,true);

    xhttp.setRequestHeader('Content-type','application/json');
    
    xhttp.send(JSON.stringify(datos));

    //console.log(datos);
}

function setidAbusadorRecuperado(valor) {
    idAbusadorRecuperado = valor;
}

function setidDenuncianteRecuperado(valor){
    idDenuncianteRecuperado = valor;
}

function recuperarIdDenunciante() {

    const nombreDenunciante = document.querySelector('#nombreDenunciante');
    const contacto = document.querySelector('#contacto');
    const sexo = document.querySelector('#sexoDenunciante');
    const edad = document.querySelector('#edadDenunciante');
    const rol = document.querySelector('#rolDenunciante');

    let url = "http://localhost:3000/denunciante/"+nombreDenunciante.value+"&"+contacto.value+"&"+sexo.value+"&"+edad.value+"&"+rol.value;

    const xhttp = new XMLHttpRequest();
    xhttp.open('get',url,true);

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let datos = JSON.parse(this.responseText);
            
            for(let item of datos){
                setidDenuncianteRecuperado(item.idDenunciante);
            }
        }
    }

    xhttp.send();
}

function insertarAbusador() {
    const nombres = document.querySelector('#nombresAbusador');
    const apellidoPat = document.querySelector('#ap');
    const apellidoMat = document.querySelector('#am');
    const sexo = document.querySelector('#sexoAbusador');
    const rol = document.querySelector('#rol-abusador');

    if(nombres.value == "" || apellidoPat.value == "" || apellidoMat.value == "" || sexo.value == ""){
        alert("Porfavor Ingrese todos los Datos del Agresor");
        return;
    }

    let url = "http://localhost:3000/abusador/";

    let datos = {
        nombres:nombres.value,
        apellidoPat:apellidoPat.value,
        apellidoMat:apellidoMat.value,
        sexo:sexo.value,
        rol:rol.value
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open('post',url,true);

    xhttp.setRequestHeader('Content-type','application/json');
    
    xhttp.send(JSON.stringify(datos));

    checadorA = true;

    //console.log(datos);
}

function recuperarIdAbusador(){

    const nombres = document.querySelector('#nombresAbusador');
    const apellidoPat = document.querySelector('#ap');
    const apellidoMat = document.querySelector('#am');
    const sexo = document.querySelector('#sexoAbusador');
    const rol = document.querySelector('#rol-abusador');

    let url = "http://localhost:3000/abusador/"+nombres.value+"&"+apellidoPat.value+"&"+apellidoMat.value+"&"+sexo.value+"&"+rol.value;

    const xhttp = new XMLHttpRequest();

    xhttp.open('get',url,true);

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let datos = JSON.parse(this.responseText);
            
            for(let item of datos){
                setidAbusadorRecuperado(item.idAbusador);
            }

        }
    }

    xhttp.send();
}

function actualizaridDenuncianteYAbusador(){
    recuperarIdDenunciante();
    recuperarIdAbusador();
}

function verificarDatos(){
    
    const hechos = document.querySelector('#descripcion-abuso');
    const fechaDenuncia = new Date(Date.now());
    const cadenaFecha = (fechaDenuncia.getMonth()+1)+"-"+fechaDenuncia.getDate()+"-"+fechaDenuncia.getFullYear();
    const idEscuela = document.querySelector('#escuela');
    const ACCIONTOMADA = document.querySelector('#acciones-tomadas');
    const SERVICIOADD = document.querySelector('#servicio-externo')
    const INFOTIPOSVIOLENCIA = document.querySelector('#informacion-violencia');
    const MECANISMOSDENUNCIAS = document.querySelector('#mecanismos-violencia');
    const TEMPORALIDAD = document.querySelector('#temporalidad');
    const ZONA = document.querySelector('#zona-incidente');
    const NIVELGRAVEDAD = document.querySelector('#gravedad-asunto');
    const TIPOVIOLENCIA = document.querySelector('#tipo-violencia');
    const SUCEDIOALGO = document.querySelector('#sucedió-algo');

    let datos = {
        hechos:hechos.value,
        fechaDenuncia:cadenaFecha,
        idDenunciante:idDenuncianteRecuperado,
        idAbusador:idAbusadorRecuperado,
        idEscuela:idEscuela.value,
        ACCIONTOMADA:ACCIONTOMADA.value,
        SERVICIOADD:SERVICIOADD.value,
        INFOTIPOSVIOLENCIA:INFOTIPOSVIOLENCIA.value,
        MECANISMOSDENUNCIAS:MECANISMOSDENUNCIAS.value,
        TEMPORALIDAD:TEMPORALIDAD.value,
        ZONA:ZONA.value,
        NIVELGRAVEDAD:NIVELGRAVEDAD.value,
        TIPOVIOLENCIA:TIPOVIOLENCIA.value,
        SUCEDIOALGO:SUCEDIOALGO.value
    }

    //console.log(datos);
}

function insertarDenuncia(){
    try {
        const hechos = document.querySelector('#descripcion-abuso');
        const fechaDenuncia = new Date(Date.now());
        const cadenaFecha = (fechaDenuncia.getMonth()+1)+"-"+fechaDenuncia.getDate()+"-"+fechaDenuncia.getFullYear();
        const idEscuela = document.querySelector('#escuela');
        const ACCIONTOMADA = document.querySelector('#acciones-tomadas');
        const SERVICIOADD = document.querySelector('#servicio-externo')
        const INFOTIPOSVIOLENCIA = document.querySelector('#informacion-violencia');
        const MECANISMOSDENUNCIAS = document.querySelector('#mecanismos-violencia');
        const TEMPORALIDAD = document.querySelector('#temporalidad');
        const ZONA = document.querySelector('#zona-incidente');
        const NIVELGRAVEDAD = document.querySelector('#gravedad-asunto');
        const TIPOVIOLENCIA = document.querySelector('#tipo-violencia');
        const SUCEDIOALGO = document.querySelector('#sucedió-algo');

        let datos = {
            hechos:hechos.value,
            fechaDenuncia:cadenaFecha,
            idDenunciante:idDenuncianteRecuperado,
            idAbusador:idAbusadorRecuperado,
            idEscuela:idEscuela.value,
            ACCIONTOMADA:ACCIONTOMADA.value,
            SERVICIOADD:SERVICIOADD.value,
            INFOTIPOSVIOLENCIA:INFOTIPOSVIOLENCIA.value,
            MECANISMOSDENUNCIAS:MECANISMOSDENUNCIAS.value,
            TEMPORALIDAD:TEMPORALIDAD.value,
            ZONA:ZONA.value,
            NIVELGRAVEDAD:NIVELGRAVEDAD.value,
            TIPOVIOLENCIA:TIPOVIOLENCIA.value,
            SUCEDIOALGO:SUCEDIOALGO.value
        }

        let url = "http://localhost:3000/denuncias"
    
        const xhttp = new XMLHttpRequest();
        xhttp.open('post',url,true);
    
        xhttp.setRequestHeader('Content-type','application/json');
        
        xhttp.send(JSON.stringify(datos));
    
        //console.log(datos);
    } catch (error){
        console.log(error);
    }

   
}

function funcionallamar(){



    if(idDenuncianteRecuperado != undefined && idAbusadorRecuperado != undefined){
        insertarDenuncia();
        alert("Se ha registrado su Denuncia")
        checadorA = false;
        checadorD = false;
    } else {
        alert("Ocurrió un problema al revisar sus datos, porfavor verifique sus datos y vuelva a intentar")
    }

}