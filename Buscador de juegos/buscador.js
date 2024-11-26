    function get(url) {
        return fetch(url)
               .then(response => response.json())
               .catch(error => {
                   console.error('Error al obtener los datos:', error);
                   throw error;
               });
    }
    
    function mostrarResultados(juegos) {
        const tablaResultados = document.getElementById('tablaResultados');
        tablaResultados.innerHTML = `
            <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Imagen</th>
            </tr>
        `;
    
        juegos.forEach(juego => {
            const row = tablaResultados.insertRow();
            const cellNombre = row.insertCell(0);
            const cellDescripcion = row.insertCell(1);
            const cellImagen = row.insertCell(2);
    
            cellNombre.textContent = juego.title;
            cellDescripcion.textContent = juego.short_description;
            cellImagen.innerHTML = `<img src="${juego.thumbnail}" alt="${juego.title}" width="100">`;
        });
    }
    
    function filtrarYOrdenarResultados(plataforma, categoria, orden) {
        let url = 'https://my-json-server.typicode.com/agustinruatta/fake_json_server_db/free_games';

        if (plataforma) {
            url += `?platform=${encodeURIComponent(plataforma)}`;
        }
    
        if (categoria) {
            if (plataforma) {
                url += `&genre=${encodeURIComponent(categoria)}`;
            } else {
                url += `?genre=${encodeURIComponent(categoria)}`;
            }
        }
        return get(url)
            .then(data => {
               
                if (orden === 'asc') {
                    data.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
                } else if (orden === 'desc') {
                    data.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                }
    
                return data;
            })
            .catch(error => {
                console.error('Error al filtrar y ordenar los datos:', error);
                throw error;
            });
    }
    
    document.addEventListener("DOMContentLoaded", function () {
        const btnBuscar = document.getElementById('btnBuscar');
        const selectPlataforma = document.getElementById('selectPlataforma');
        const selectCategoria = document.getElementById('selectCategoria');
        const selectOrden = document.getElementById('selectOrden');
    
        btnBuscar.addEventListener('click', function () {
            const plataformaSeleccionada = selectPlataforma.value;
            const categoriaSeleccionada = selectCategoria.value;
            const ordenSeleccionado = selectOrden.value;
    
            filtrarYOrdenarResultados(plataformaSeleccionada, categoriaSeleccionada, ordenSeleccionado)
                .then(data => {
                    mostrarResultados(data);
                })
                .catch(error => {
                    console.error('Error al obtener y mostrar los datos:', error);
                });
        });
    });
    
