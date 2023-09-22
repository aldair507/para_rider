let btn = document.getElementById("calcular");

btn.addEventListener("click", () => {
  let nombre = document.getElementById("nombre").value;
  let identificacion = document.getElementById("identificacion").value;
  console.log("nombre:", nombre);
  console.log("identificacion:", identificacion);

  // Llamar a calcularNota después de obtener los valores de las notas
  
});

function minota(nota1, nota2, nota3, callback) {
  let arraynota = [nota1, nota2, nota3];
  let notadefinitiva = calcular(arraynota);
  callback(notadefinitiva);
}

function calcular(notadefinitiva) {
  let suma = 0;
  notadefinitiva.forEach((notas) => (suma += notas));
  suma = suma / notadefinitiva.length;
  return suma;
}

function mostar(notadefinitiva) {
  console.log("notadefinitiva:",notadefinitiva);
}

function calcularNota(callback) {
  let nota1 = parseFloat(document.getElementById("nota1").value);
  let nota2 = parseFloat(document.getElementById("nota2").value);
  let nota3 = parseFloat(document.getElementById("nota3").value);

  minota(nota1, nota2, nota3, callback);
}

function minotaCallback(notadefinitiva) {
  console.log("SE ESTA EJECUTANDO...")
  setTimeout(() => {
    mostar(notadefinitiva);
  }, 3000);
}