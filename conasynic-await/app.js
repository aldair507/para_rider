// 



const miDiv = document.getElementById('midiv');
const tabla = document.getElementById('tabla');
const btnAbrirModal = document.getElementById('abrirmodal');
const btnCerrarModal = document.getElementById('cerrarmodal');

let arregloDatos = [];

btnAbrirModal.addEventListener('click', () => {
    miDiv.classList.remove('cerrar');
    miDiv.classList.add('modal');
});

btnCerrarModal.addEventListener('click', () => {
    miDiv.classList.add('cerrar');
});

const establecerTabla = datos => {
    tabla.innerHTML = '';
    let encabezado = document.createElement('thead');
    encabezado.innerHTML = `<th>Identificación</th>
    <th>Nombre</th>
    <th>Nota 1</th>
    <th>Nota 2</th>
    <th>Nota 3</th>
    <th>Nota Definitiva</th>
    <th>Acciones</th>`;
    arregloDatos.forEach((e, i) => {
        let editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        let guardarBtn = document.createElement('button');
        guardarBtn.textContent = 'Guardar';
        let eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        editarBtn.addEventListener('click', () => editar(i));
        guardarBtn.addEventListener('click', () => guardar(i));
        let fila = document.createElement('tr');
        let Cidentificacion = document.createElement('td');
        Cidentificacion.innerHTML = `<td><input type='text' id='input1_${i}' value = ' ${e.identificacion}' disabled = ""></td>`;
        let Cnombre = document.createElement('td');
        Cnombre.innerHTML = `<td><input type='text' id='input2_${i}' value = '${e.nombre}' disabled = ""></td>`;
        let Cnota1 = document.createElement('td');
        Cnota1.innerHTML = `<td><input type='number' id='input3_${i}' value = '${e.nota[0]}' disabled = ""></td>`;
        let Cnota2 = document.createElement('td');
        Cnota2.innerHTML = `<td><input type='number' id='input4_${i}' value = '${e.nota[1]}' disabled = ""></td>`;
        let Cnota3 = document.createElement('td');
        Cnota3.innerHTML = `<td><input type='number' id='input5_${i}' value = '${e.nota[2]}' disabled = ""></td>`;
        let CNdefinitiva = document.createElement('td');
        CNdefinitiva.innerHTML = `<td><input type='number' id='input6_${i}' value = '${e.def}' disabled></td>`;
        fila.appendChild(Cidentificacion);
        fila.appendChild(Cnombre);
        fila.appendChild(Cnota1);
        fila.appendChild(Cnota2);
        fila.appendChild(Cnota3);
        fila.appendChild(CNdefinitiva);
        fila.appendChild(editarBtn);
        fila.appendChild(guardarBtn);
        fila.appendChild(eliminarBtn);
        encabezado.appendChild(fila);
        tabla.appendChild(encabezado);
        eliminarBtn.onclick = () => eliminar(e.ideli);
    });
};

function eliminar(id) {
    console.log('Borrado', id);
    arregloDatos = arregloDatos.filter(el => e.ideli !== id);
    establecerTabla();
}

function editar(i) {
    let input1 = document.getElementById(`input1_${i}`);
    let input2 = document.getElementById(`input2_${i}`);
    let input3 = document.getElementById(`input3_${i}`);
    let input4 = document.getElementById(`input4_${i}`);
    let input5 = document.getElementById(`input5_${i}`);
    let elementosInput = [input1, input2, input3, input4, input5];
    elementosInput.forEach(e=> {
        e.disabled = false;
    });
    return new Promise((resolve, reject) => {
        resolve(elementosInput.map(e => e.value));
    });
}

const guardar = async (i) => {
    try {
        const nuevosValores = await editar(i);
        arregloDatos[i].identificacion = nuevosValores[0];
        arregloDatos[i].nombre = nuevosValores[1];
        arregloDatos[i].nota[0] = parseFloat(nuevosValores[2]);
        arregloDatos[i].nota[1] = parseFloat(nuevosValores[3]);
        arregloDatos[i].nota[2] = parseFloat(nuevosValores[4]);
        const nuevaDefinitiva = (arregloDatos[i].nota[0] + arregloDatos[i].nota[1] + arregloDatos[i].nota[2]) / 3;
        arregloDatos[indice].def = nuevaDefinitiva;
        nuevosValores.forEach((valor, i) => {
            let input = document.getElementById(`input${i + 1}_${i}`);
            input.value = valor;
            input.disabled = true;
        });
        establecerTabla();
    } catch (error) {
        console.log("Error al guardar", error);
    }
};

const obtenerDatos = () => {
    return new Promise((resolve, reject) => {
        establecerTabla('¿Quieres calcular?');
        setTimeout(() => {
            resolve(true);
        }, 100);
    });
};

const mostrarDatos = async (notas, identificacion, nombre) => {
    try {
        establecerTabla("Esperando autorización...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        let suma = 0;
        notas.forEach(nota => {
            suma += nota;
        });
        suma = suma / notas.length;
        let objeto = {
            ideli: Date.now(),
            identificacion: identificacion,
            nombre: nombre,
            nota: notas,
            def: suma
        };
        arregloDatos = [...arregloDatos, objeto];
        return { jugador: suma };
    } catch (error) {
        console.error(error);
        return { jugador: 0 };
    }
};

const boton = async (nota1, nota2, nota3, identificacion, nombre) => {
    try {
        const permitido = await obtenerDatos();
        if (permitido) {
            const usuario = await mostrarDatos([nota1, nota2, nota3], identificacion, nombre);
            establecerTabla(usuario.jugador);
        }
    } catch (error) {
        console.log(error);
    }
};
