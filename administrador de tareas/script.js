class Tarea {
    #tituloTarea;
    #descripcionTarea;
    #estadoTarea;
    #prioridadTarea;

    constructor(tituloTarea, descripcionTarea, estadoTarea, prioridadTarea) {
        this.#tituloTarea = tituloTarea;
        this.#descripcionTarea = descripcionTarea;
        this.#estadoTarea = estadoTarea;
        this.#prioridadTarea = prioridadTarea;
    }

    get tituloTarea() {
        return this.#tituloTarea;
    }

    set tituloTarea(tituloTarea) {
        this.#tituloTarea = tituloTarea;
    }

    get descripcionTarea() {
        return this.#descripcionTarea;
    }

    set descripcionTarea(descripcionTarea) {
        this.#descripcionTarea = descripcionTarea;
    }

    get estadoTarea() {
        return this.#estadoTarea;
    }

    set estadoTarea(estadoTarea) {
        this.#estadoTarea = estadoTarea;
    }

    get prioridadTarea() {
        return this.#prioridadTarea;
    }

    set prioridadTarea(prioridadTarea) {
        this.#prioridadTarea = prioridadTarea;
    }
}

class GestorTareas {
    #tareas;

    constructor() {
        this.#tareas = [];
    }

    get tareas() {
        return this.#tareas;
    }

    agregarTarea(tarea) {
        this.#tareas.push(tarea);
    }

    listarTareas() {
        if (this.#tareas.length === 0) {
            alert("No hay tareas registradas");
            return;
        } else {
            alert("Lista de tareas:\n" + this.#tareas.map((tarea, index) => {
                return `Tarea ${index + 1}:\n` +
                    `Título: ${tarea.tituloTarea}\n` +
                    `Descripción: ${tarea.descripcionTarea}\n` +
                    `Estado: ${tarea.estadoTarea}\n` +
                    `Prioridad: ${tarea.prioridadTarea}\n`;
            }).join("\n"));
        }
    }

    eliminarTarea(index) {
        if (index < 0 || index >= this.#tareas.length) {
            alert("Índice de tarea no válido.");
            return;
        }
        this.#tareas.splice(index, 1);
        alert(`Tarea ${index + 1} eliminada.`);
    }

    actualizarTarea(index, titulo, descripcion, estado, prioridad) {
        if (index < 0 || index >= this.#tareas.length) {
            alert("Índice de tarea no válido.");
            return;
        }
        const tarea = this.#tareas[index];
        tarea.tituloTarea = titulo;
        tarea.descripcionTarea = descripcion;
        tarea.estadoTarea = estado;
        tarea.prioridadTarea = prioridad;
        alert(`Tarea ${index + 1} actualizada.`);
    }
}

let gestorTareas = new GestorTareas();
let opcion;

function agregarTarea() {
    const titulo = prompt("Ingrese el título de la tarea:");
    const descripcion = prompt("Ingrese la descripción de la tarea:");
    const estado = prompt("Ingrese el estado de la tarea (Pendiente/En Progreso/Completada):");
    const prioridad = prompt("Ingrese la prioridad de la tarea (Alta/Media/Baja):");

    if (!titulo || !descripcion || !estado || !prioridad) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const nuevaTarea = new Tarea(titulo, descripcion, estado, prioridad);
    gestorTareas.agregarTarea(nuevaTarea);
    alert("Tarea agregada exitosamente.");
}

do {
    opcion = parseInt(prompt('Gestor de Tareas\n' +
        '1. Agregar tarea\n' +
        '2. Listar tareas\n' +
        '3. Actualizar tarea\n' +
        '4. Eliminar tarea\n' +
        '5. Salir'));

    if (isNaN(opcion) || opcion < 1 || opcion > 5) {
        alert("Opción no válida. Por favor, elige una opción del 1 al 5.");
        continue;
    }

    switch (opcion) {
        case 1:
            agregarTarea();
            break;
        case 2:
            gestorTareas.listarTareas();
            break;
        case 3:
            const indexActualizar = parseInt(prompt("Ingrese el índice de la tarea a actualizar (1 para la primera tarea):")) - 1;
            if (indexActualizar < 0 || indexActualizar >= gestorTareas.tareas.length) {
                alert("Índice de tarea no válido.");
                break;
            }
            const tareaActual = gestorTareas.tareas[indexActualizar];
            alert(`Actualizando tarea ${indexActualizar + 1}:\n` +
                `Título actual: ${tareaActual.tituloTarea}\n` +
                `Descripción actual: ${tareaActual.descripcionTarea}\n` +
                `Estado actual: ${tareaActual.estadoTarea}\n` +
                `Prioridad actual: ${tareaActual.prioridadTarea}`);

            const tituloActualizar = prompt("Ingrese el nuevo título de la tarea:");
            const descripcionActualizar = prompt("Ingrese la nueva descripción de la tarea:");
            const estadoActualizar = prompt("Ingrese el nuevo estado de la tarea (Pendiente/En Progreso/Completada):");
            const prioridadActualizar = prompt("Ingrese la nueva prioridad de la tarea (Alta/Media/Baja):");

            gestorTareas.actualizarTarea(indexActualizar, tituloActualizar, descripcionActualizar, estadoActualizar, prioridadActualizar);
            break;
        case 4:
            const indexEliminar = parseInt(prompt("Ingrese el índice de la tarea a eliminar (1 para la primera tarea):")) - 1;
            if (indexEliminar < 0 || indexEliminar >= gestorTareas.tareas.length) {
                alert("Índice de tarea no válido.");
                break;
            }
            const tareaEliminar = gestorTareas.tareas[indexEliminar];
            alert(`Eliminar tarea ${indexEliminar + 1}:\n` +
                `Título: ${tareaEliminar.tituloTarea}\n` +
                `Descripción: ${tareaEliminar.descripcionTarea}\n` +
                `Estado: ${tareaEliminar.estadoTarea}\n` +
                `Prioridad: ${tareaEliminar.prioridadTarea}`); 
            if (confirm("¿Está seguro de que desea eliminar esta tarea?")) {
                gestorTareas.eliminarTarea(indexEliminar);
            } 
            break;
        case 5:    
            alert("Saliendo del gestor de tareas.");
            break;
        default:
            alert("Opción no válida. Por favor, elige una opción del 1 al 5.");
            break;
    }
}while (opcion !== 5);
// Finaliza el bucle cuando el usuario elige salir