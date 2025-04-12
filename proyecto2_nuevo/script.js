document.addEventListener('DOMContentLoaded', () => {
    const listaTareasCompletadas = document.getElementById('tareasCompletadas');
    const listaTareasPendientes = document.getElementById('tareasPendientes');
    const entradaTarea = document.getElementById('entradaTarea');

    // Función para obtener las tareas desde la API
    async function obtenerTareas() {
        try {
            const respuesta = await fetch('https://jsonplaceholder.typicode.com/todos');
            const tareas = await respuesta.json();
            mostrarTareas(tareas);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    }

    // Función para mostrar las tareas en las listas correspondientes
    function mostrarTareas(tareas) {
        tareas.forEach(tarea => {
            crearElementoTarea(tarea);
        });
    }

    // Función para crear un elemento de tarea
    function crearElementoTarea(tarea) {
        const li = document.createElement('li');
        li.textContent = tarea.title;

        // Botón para cambiar el estado de la tarea
        const botonAlternarEstado = document.createElement('button');
        botonAlternarEstado.textContent = tarea.completed ? 'Pendiente' : 'Completada';
        botonAlternarEstado.classList.add('alternar-estado');
        botonAlternarEstado.onclick = () => alternarEstadoTarea(li);

        // Botón para eliminar la tarea (CON CONFIRMACIÓN)
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarTarea(li);

        // Agregar botones al elemento de la tarea
        li.appendChild(botonAlternarEstado);
        li.appendChild(botonEliminar);

        // Agregar la tarea a la lista correspondiente
        if (tarea.completed) {
            li.classList.add('completada');
            listaTareasCompletadas.appendChild(li);
        } else {
            li.classList.add('pendiente');
            listaTareasPendientes.appendChild(li);
        }
    }

    // Función para agregar una nueva tarea
    window.agregarTarea = function agregarTarea() {
        const textoTarea = entradaTarea.value.trim();
        if (textoTarea !== "") {
            const nuevaTarea = {
                id: Date.now(),
                title: textoTarea,
                completed: false
            };
            crearElementoTarea(nuevaTarea);
            entradaTarea.value = "";
        } else {
            alert("Por favor, ingresa una tarea válida.");
        }
    };

    // Función para cambiar el estado de una tarea
    function alternarEstadoTarea(elementoTarea) {
        const estaCompletada = elementoTarea.classList.contains('completada');

        if (estaCompletada) {
            elementoTarea.classList.remove('completada');
            elementoTarea.classList.add('pendiente');
            listaTareasPendientes.appendChild(elementoTarea);
        } else {
            elementoTarea.classList.remove('pendiente');
            elementoTarea.classList.add('completada');
            listaTareasCompletadas.appendChild(elementoTarea);
        }

        const botonAlternarEstado = elementoTarea.querySelector('.alternar-estado');
        botonAlternarEstado.textContent = estaCompletada ? '✗' : '✓';
    }

    // Función para eliminar una tarea CON CONFIRMACIÓN (MODIFICACIÓN PRINCIPAL)
    function eliminarTarea(elementoTarea) {
        if (confirm("¿Estás seguro de eliminar esta tarea?\nEsta acción no se puede deshacer.")) {
            elementoTarea.remove();
        }
    }

    // Llamar a la función para obtener y mostrar las tareas
    obtenerTareas();
});