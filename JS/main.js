let balance = 0;
let transferencias = [];


admin = {
    username: 'admin@billetera.com',
    password: 'admin123'
}


let isLogin = false;


function login (){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email === 'admin@billetera.com' && password === 'admin123') {
        window.location.href = 'menu.html';
        isLogin = true;
    } else {
        alert('Credenciales incorrectas');
    }
}

function logout() {
    window.location.href = 'login.html';
    isLogin = false;
}




function cargarSaldo() {
    const almacenado = localStorage.getItem('balance');
    if (almacenado === null) {
        balance = 0;
        guardarSaldo();
    } else {
        const numero = Number(almacenado);
        balance = isNaN(numero) ? 0: numero;
    }
}


function guardarSaldo() {
    localStorage.setItem('balance', String(balance));
}


function obtenerSaldo() {
    return balance;
}


function mostrarSaldo() {
    const formato = balance.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP'
    });

    const elemento = document.getElementById('balance');
    if (elemento) {
        elemento.textContent = formato; 
    }

    const current = document.getElementById('currentBalance');
    if (current) {
        current.textContent = formato; 
    }
}


function depositar(monto) {
    if (isNaN(monto) || monto <= 0) {
        alert('Ingresa un monto valido');
        return;
    }

    balance += monto;
    guardarSaldo();
    mostrarSaldo();
    alert('Deposito realizado con exito');

    registrarTransferencia('deposito', monto, 'contacto');
}


function retirar(monto) {
    if (isNaN(monto) || monto <= 0) {
        alert('Ingresa un monto valido');
        return;
    }

    if (monto > balance) {
        alert('Saldo insuficiente');
        return;
    }

    balance -= monto;
    guardarSaldo();
    mostrarSaldo();
    alert('Retiro realizado con exito');

    registrarTransferencia('retiro', monto, 'contacto');
}


function registrarTransferencia(tipo, monto, contacto) {
    transferencias.push({
        tipo: tipo,
        monto: monto,
        contacto: contacto,
        fecha: new Date()
    });
    guardarTransferencias();
}


function guardarTransferencias() {
    localStorage.setItem('transferencias', JSON.stringify(transferencias));
}


function cargarTransferencias() {
    const almacenado = localStorage.getItem('transferencias');
    if (almacenado === null) {
        transferencias = [];
    } else {
        transferencias = JSON.parse(almacenado); // Convertir el JSON de vuelta a un array
    }
}


function obtenerTransferencias(numeroTransacciones) {
  
  const lista = [...transferencias];

  if (typeof numeroTransacciones === 'number') {
    return lista.slice(0, numeroTransacciones);
  }

  return lista;
}



function mostrarTransferencias() {
    const tbody = document.getElementById('transferenciasList');
    if (tbody === null) {
    return; 
    }
    tbody.innerHTML = '';
   
  
    const listaTransferencias = obtenerTransferencias();


    listaTransferencias.forEach(tx => {
        const tr = document.createElement('tr'); 

    //columna fecha 
    const tdfecha = document.createElement('td');
    tdfecha.textContent = new Date(tx.fecha).toLocaleDateString('es-CL'); 
    tdfecha.classList.add('text-end'); 

    //columna tipo de transaccion
    const tdtipo = document.createElement('td');
    tdtipo.textContent = tx.tipo; 
    tdtipo.classList.add('text-end'); 

    //columna contacto 
    const tdcontacto = document.createElement('td');
    tdcontacto.textContent = tx.contacto; 
    tdcontacto.classList.add('text-end'); 

    //columna monto
    const tdmonto = document.createElement('td');
    if (tx.tipo === 'deposito') {
        tdmonto.textContent = `+${tx.monto}`;
        tdmonto.classList.add('text-success');
    } else if (tx.tipo === 'retiro') {
        tdmonto.textContent = `-${tx.monto}`;
        tdmonto.classList.add('text-danger');
    }
    tdmonto.classList.add('text-end'); 

    //agregar las celdas a la fila
    tr.appendChild(tdfecha);
    tr.appendChild(tdtipo);
    tr.appendChild(tdcontacto);
    tr.appendChild(tdmonto);

    tbody.appendChild(tr);
    

    });
        
    
}

function mostrarUltimosMovimientos() {
    const lastTransactions = document.getElementById('last-transactions-table');
    const lista = obtenerTransferencias(4);
    lastTransactions.innerHTML = '';

    if (lastTransactions) {
    
    console.log('lastTransactions:', lastTransactions);
    console.log('lista:', lista);

    
    lista.forEach(tx => {
        const tr = document.createElement('tr');
        
        // columna fecha 
        const tdfecha = document.createElement('td');
        tdfecha.textContent = new Date(tx.fecha).toLocaleDateString('es-CL'); 
        tdfecha.classList.add('text-end');

        // columna descripción (tipo)
        const tddescripcion = document.createElement('td');
        tddescripcion.textContent = tx.tipo; 
        tddescripcion.classList.add('text-end'); 

        // columna monto con formato y color según tipo
        const tdmonto = document.createElement('td');
        const valorFormateado = tx.monto.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });

        

        if (tx.tipo === 'deposito') {
            tdmonto.classList.add('text-success');
            tdmonto.textContent = `+${valorFormateado}`;
        } else if (tx.tipo === 'retiro') {
            tdmonto.classList.add('text-danger');
            tdmonto.textContent = `-${valorFormateado}`;
        }

        // agregar las celdas a la fila
        tr.appendChild(tdfecha);
        tr.appendChild(tddescripcion);
        tr.appendChild(tdmonto);

        lastTransactions.appendChild(tr);
    });
    }

    else {
        console.error('No se encontró el elemento last-transactions-table');
    }
}


                                             //eventos

document.addEventListener('DOMContentLoaded', function () {
    cargarSaldo();
    cargarTransferencias();
    mostrarSaldo();
    mostrarTransferencias();
    mostrarUltimosMovimientos();
});

// --evento listener para el formulario de deposito (deposit.html)--
const depositForm = document.getElementById('depositForm');
if (depositForm) {
    depositForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const input = document.getElementById('amount');
        const valorTexto = input.value;
        const monto = Number(valorTexto);

        depositar(monto);
    });
}

// --evento listener para el formulario de enviar dinero (sendmoney.html)--
const sendMoneyForm = document.getElementById('sendMoneyForm');
if (sendMoneyForm) {
    sendMoneyForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const input = document.getElementById('sendAmount');
        const valorTexto = input.value;
        const monto = Number(valorTexto);

        retirar(monto);
    });
}

// --event listener para el boton de retirar (tarjeta derecha en sendmoney.html)--
const withdrawForm = document.getElementById('withdrawForm');
const withdrawButton = document.getElementById('withdraw-button');
if (withdrawForm && withdrawButton) {
    withdrawButton.addEventListener('click', function (e) {
        e.preventDefault();

        const input = document.getElementById('withdrawAmount');
        const valorTexto = input.value;
        const monto = Number(valorTexto);

        retirar(monto);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', login);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});
