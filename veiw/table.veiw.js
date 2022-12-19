const getData = document.getElementById("actTabla");
const orgData = document.getElementById("orgTabla");
const fecData = document.getElementById("fecTabla");
const nuevoData = document.getElementById("nuevoData");
const tableBody = document.getElementById("table");
const exampleModal = document.getElementById('exampleModal');
const modalConfirm = document.getElementById('modalConfirm');



const ordenarListado = async (e) =>{
    let sortedData;
    let data = await listaPeliculas();
    if (e.target.id === "orgTabla") {
        sortedData = data.sort((a,b) => b.Titulo - a.Titulo);
    } else if (e.target.id === "fecTabla"){
        sortedData = data.sort((a,b) => b.Fecha - a.Fecha);
    }
    tableBody.innerHTML = "";
    displayData(sortedData);

}

const displayData = (inforPeliculas) =>{
    inforPeliculas.forEach(listado => {
        tableBody.innerHTML += `
        <tr>
            <td>${listado.Id}</td>
            <td>${listado.Titulo}</td>
            <td>${listado.Director}</td>
            <td>${listado.Fecha}</td>
            <td>${listado.rating}</td>
            <td><button type="button" class="btn btn-default" onclick="borrarPelicula(${listado.Id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg></button></td>
            <td><button type="button" class="btn btn-default" onclick="editPelicula(${listado.Id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg></button></td>
        </tr>
        `
    });
}

const listaPeliculas = async() =>{
    let url = "http://localhost:4000/api/movies";
     
    const res = await fetch(url);
    let data = await res.json();
    tableBody.innerHTML = "";
    displayData(data);
    return data;

}


const agregarData = async () => {
    let url = "http://localhost:4000/api/movies";
    const formData = new FormData(document.querySelector('#formCreate'));
  
    if(!formData.get('Titulo').length || !formData.get('Director') || !formData.get('Fecha') || !formData.get('rating')) {
      alert('Por favor llena todos los campos');
      return;
    }else{
        const producto = {
            Id: formData.get('Id'),
            Titulo: formData.get('Titulo'),
            Director: formData.get('Director'),
            Fecha: formData.get('Fecha'),
            rating: formData.get('rating')
    
        }
        console.trace(producto);
    
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(producto),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => {
            alertManager('error', error);
            document.querySelector('#formCreate').reset();
        })
        .then(response => { console.log(response);
            alertManager('success', response.message);
            listaPeliculas();
        })

    }
}

const editPelicula = async(Id) => {
    let data = await listaPeliculas();
    let producto = {};
    data.filter(prod => {
        if (prod.Id == Id) {
            producto = prod;
        }
    });


    document.querySelector('#formEdit #Id').value = listado.Id;
    document.querySelector('#formEdit #Titulo').value = listado.Titulo;
    document.querySelector('#formEdit #Director').value = listado.Director;
    document.querySelector('#formEdit #Fecha').value = listado.Fecha;
    document.querySelector('#formEdit #rating').value = listado.rating;

    console.log(producto);
    exampleModal();
}

const updateProduct = () => {
    let url = "http://localhost:4000/api/movies";
    const product = {
    Id: document.querySelector('#formEdit #Id').value,
    Titulo: document.querySelector('#formEdit #Titulo').value,
    Director: document.querySelector('#formEdit #Director').value,
    Fecha: document.querySelector('#formEdit #Fecha').value,
    rating: document.querySelector('#formEdit #rating').value,
  }
  if(!product.Titulo || !product.Director || !product.Fecha || !product.rating) {
    alert('Por favor llena todos los campos');
    return;
  }

  fetch(url, {
    method: 'PUT',
    body:JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(error => {
    alertManager('error', error);
  })
  .then(response => {
    alertManager('success', response.mensaje);
    listaPeliculas();
  });
  document.querySelector('#formEdit').reset();
}

exampleModal.addEventListener('show.bs.modal', event => {
  // Button that triggered the modal
  const button = event.relatedTarget
  // Extract info from data-bs-* attributes
  const recipient = button.getAttribute('data-bs-whatever')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  const modalTitle = exampleModal.querySelector('.modal-title')
  const modalBodyInput = exampleModal.querySelector('.modal-body input')

  modalTitle.textContent = `New message to ${recipient}`
  modalBodyInput.value = recipient
})


const borrarPelicula = async(Id) => {
    let url = "http://localhost:4000/api/movies";

    fetch(`${url}/${Id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .catch(error => {
      alertManager('error', error);
    })
    .then(response => {
      alertManager('success', response.mensaje);
      closeModalConfirm();
      getProducts();
      deleteId = null;
    })
  
  }
  
  const confirmDelete = (res) => {
    if(res){
      deleteProduct(deleteId);
    } else {
      closeModalConfirm();
    }
  }
const closeModalConfirm = () => {
  modalConfirm.style.display = 'none';
}

const alertManager = (typeMsg, message) => {
    const alert = document.querySelector('#alert');
  
    alert.innerHTML = message || 'Se produjo cambios';
    alert.classList.add(typeMsg);
    alert.style.display = 'block';
  
    setTimeout(() => {
      alert.style.display = 'none';
      alert.classList.remove(typeMsg);
    }, 3500);
  
}








getData.addEventListener('click', listaPeliculas);
orgData.addEventListener('click', ordenarListado);
fecData.addEventListener('click', ordenarListado);
nuevoData.addEventListener('click', agregarData);