function minota(nota1,nota2,nota3){
      return new Promise((resolve, reject) => {
        let arraynota=[nota1,nota2,nota3];
        let notadefinitiva=calcular(arraynota);
    
        if(isNaN(notadefinitiva)){
          reject("ingrese valores validos")
        } else {
          resolve(notadefinitiva)
        }
      });
    }
    
    function valores(){
    
      return new Promise((resolve, reject) => {
        let nombre=document.getElementById('nombre').value;
      console.log('nombre: '+nombre);
    
      let identificacion=document.getElementById('identificacion').value;
      console.log('identificacion:' +identificacion)
    
      resolve((nombre, identificacion))
      })
    }
    
    function calcular(notadefinitiva) {
      let suma = 0;
      notadefinitiva.forEach((nota) => (suma += nota));
      suma = suma / notadefinitiva.length;
      return suma;
    }
    
    function mostrar(notadefinitiva) {
      console.log('nota definitiva: ' + notadefinitiva);
      
    }
    
    
    
    function calcularNota() {
      let nota1 = parseFloat(document.getElementById("nota1").value);
      let nota2 = parseFloat(document.getElementById("nota2").value);
      let nota3 = parseFloat(document.getElementById("nota3").value);
      
    
      
      minota(nota1,nota2,nota3)
      .then((notadefinitiva)=>{
        console.log("se esta ejecutando ")
    
        return new Promise((resolve) => {
          setTimeout(()=>{
            resolve(notadefinitiva )
            valores()
          },3000)
        })
      })
      .then((notadefinitiva) => {
        mostrar(notadefinitiva)
        
      }).catch((err) => {
        console.log(err)
      });
    
     
    
    }
    