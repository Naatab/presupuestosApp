let presupuesto = 0;
const gastos = [];

const inputPresupuesto = document.getElementById("inputPresupuesto");
const formCalcular = document.getElementById("formCalcular");
const tablaGastos = document.getElementById("tablaGastos").getElementsByTagName("tbody")[0];
const sumaGastos = document.querySelector(".sumaGastos");
const presupuestoElement = document.querySelector(".presupuesto");
const presupuestoMenosGastos = document.querySelector(".presupuestoMenosGastos");
const inputNombreGasto = document.getElementById("inputNombreGasto");
const inputCantidadGasto = document.getElementById("inputCantidadGasto");
const botonGasto = document.getElementById("botonGasto");
const cardGastos = document.querySelector(".sumaGastos");

formCalcular.addEventListener("submit", function (event) {
  event.preventDefault();
  presupuesto = parseInt(inputPresupuesto.value);
  presupuestoElement.textContent = `$${presupuesto}`;
  actualizarSaldo();
  formCalcular.reset();
});

function eliminarGasto(index) {
  gastos.splice(index, 1);
  tablaGastos.deleteRow(index);
  actualizarTotalGastos();
}

function actualizarTotalGastos() {
  const totalGastos = gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
  const totalGastosEntero = Math.floor(totalGastos);
  cardGastos.textContent = `$ ${totalGastosEntero}`;
  
  actualizarSaldo();
}

botonGasto.addEventListener("click", (e) => {
  e.preventDefault();

  const nombreGasto = inputNombreGasto.value;
  const cantidadGasto = parseInt(inputCantidadGasto.value);

  const gasto = {
    nombre: nombreGasto,
    cantidad: cantidadGasto,
  };

  gastos.push(gasto);

  const nuevaFila = tablaGastos.insertRow();

  const celdaNombreGasto = nuevaFila.insertCell();
  celdaNombreGasto.textContent = gasto.nombre;

  const celdaCantidadGasto = nuevaFila.insertCell();
  celdaCantidadGasto.textContent = `$ ${Math.floor(gasto.cantidad)}`;

  const celdaEliminar = nuevaFila.insertCell();
  const botonEliminar = document.createElement("button");
  botonEliminar.innerHTML = '<i class="fas fa-trash"></i>';
  celdaEliminar.appendChild(botonEliminar);

  botonEliminar.addEventListener("click", () => {
    const filaIndex = nuevaFila.rowIndex - 1;
    eliminarGasto(filaIndex);
  });

  inputNombreGasto.value = "";
  inputCantidadGasto.value = "";

  actualizarTotalGastos();
});

function actualizarSaldo() {
  const totalGastos = gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
  const saldo = presupuesto - totalGastos;
  presupuestoMenosGastos.textContent = `$ ${saldo}`;

  if (saldo < 0) {
    presupuestoMenosGastos.classList.add('rojo');
  } else {
    presupuestoMenosGastos.classList.remove('rojo');
  }
}
