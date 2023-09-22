const midiv = document.getElementById('midiv');
const tabla = document.getElementById('tabla');

const abrirmodal = document.getElementById('abrirmodal');
const cerrarmodal = document.getElementById('cerrarmodal');

let array = [];

abrirmodal.addEventListener('click', () => {
    midiv.classList.remove('cerrar');
    midiv.classList.add('modal');
});

cerrarmodal.addEventListener('click', () => {
    midiv.classList.add('cerrar');
});

const settext = data => {
    return new Promise((resolve, reject) => {
        tabla.innerHTML = '';
        let head = document.createElement('thead');
        head.innerHTML = `<th>Identificacion</th>
        <th>Nombre</th>
        <th>Nota 1</th>
        <th>Nota 2</th>
        <th>Nota 3</th>
        <th>Nota definitiva</th>
        <th>Funciones</th>`;
        array.forEach((e, i) => {
            console.log(e);
            let editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            let guardarBtn = document.createElement('button');
            guardarBtn.textContent = 'Guardar';
            let eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            editarBtn.addEventListener('click', () => {
                editar(i).then(() => {
                    resolve();
                });
            });
            guardarBtn.addEventListener('click', () => {
                guardar(i).then(() => {
                    resolve();
                });
            });

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
            CNdefinitiva.innerHTML = `<td><input type='number' id='input6_${i}' value = '${e.definitiva}' disabled></td>`;
            fila.appendChild(Cidentificacion);
            fila.appendChild(Cnombre);
            fila.appendChild(Cnota1);
            fila.appendChild(Cnota2);
            fila.appendChild(Cnota3);
            fila.appendChild(CNdefinitiva);
            fila.appendChild(editarBtn);
            fila.appendChild(guardarBtn);
            fila.appendChild(eliminarBtn);
            head.appendChild(fila);
            tabla.appendChild(head);
            eliminarBtn.onclick = ()=>{
                elimar(e.ideli)
            }
        });
    });
};

function elimar (id){
    console.log('borrado', id);
    array = array.filter(e => e.ideli !== id);
    settext();
    }
    function editar(i) {
        let input1 = document.getElementById(`input1_${i}`);
        let input2 = document.getElementById(`input2_${i}`);
        let input3 = document.getElementById(`input3_${i}`);
        let input4 = document.getElementById(`input4_${i}`);
        let input5 = document.getElementById(`input5_${i}`);
    
        let arr = [input1, input2, input3, input4, input5];
    
        arr.forEach(e => {
            e.disabled = false;
        });
    
        return new Promise((resolve, reject) => {
            resolve(arr.map(e => e.value));
        });
    }
    const guardar = (i) => {
        editar(i).then(nvalor => {
            array[i].identificacion = nvalor[0];
            array[i].nombre = nvalor[1];
            array[i].nota[0] = parseFloat(nvalor[2]);
            array[i].nota[1] = parseFloat(nvalor[3]);
            array[i].nota[2] = parseFloat(nvalor[4]);
    
            
            const nuevadefinitiva = (array[i].nota[0] + array[i].nota[1] + array[i].nota[2]) / 3;
            array[i].definitiva = nuevadefinitiva; 
    
            nvalor.forEach((valor, e) => {
                let input = document.getElementById(`input${e + 1}_${i}`);
                input.value = valor;
                input.disabled = true;
            });
    
            settext();
        });
    };
    
    
    const getdata = () =>{
        return new Promise((resuleve,rechaza)=>{
        settext('¿Quieres Calcular?')
        setTimeout(()=>{
            resuleve(true);},100) 
        })
    }
    

    const showdata = (notas,identificacion,nombre) =>{
           
        
       

        return new Promise((resuleve,rechaza)=>{
        settext('Esperando Autorizacion');
        setTimeout(()=>{
            let suma = 0;
            
            notas.forEach(nota =>{ suma += nota;
               
            });
            suma = suma / notas.length;
            console.log(suma)
            
            let objeto = {
                ideli: Date.now(),
                identificacion:identificacion,
                nombre:nombre,
                nota:notas,
                definitiva: suma
            }

            array = [...array,objeto]
          

            
            resuleve({jugador:suma});
        },100)
    })
    }

    const boton =(nota1,nota2,nota3,identificacion,nombre)=>{
        getdata().then(permitido=>{
            if(permitido){
               return showdata([nota1,nota2,nota3],identificacion,nombre);
                }
            
    }).then(user=>{
        settext(user.jugador);
       
    });

}