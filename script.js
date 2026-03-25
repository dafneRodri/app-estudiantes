/* =========================
CONTROL DE PESTAÑAS
========================= */

const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');

tabs.forEach(tab => {
tab.addEventListener('click', () => {

```
    // Quitar activo
    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    // Activar seleccionada
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');

});
```

});

/* =========================
MANEJO DE TAREAS
========================= */

let tasks = [];

const taskNameInput = document.getElementById('taskName');
const taskDescInput = document.getElementById('taskDesc');
const addTaskBtn = document.getElementById('addTaskBtn');
const loading = document.getElementById('loading');

const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');

/* =========================
ACTUALIZAR LISTAS
========================= */

function updateTasks() {

```
pendingList.innerHTML = '';
completedList.innerHTML = '';

const now = new Date();

tasks.forEach((task, index) => {

    const div = document.createElement('div');

    div.className = 'task-item' + (task.completed ? ' completed' : '');

    div.innerHTML = `
        <div class="task-info">
            <strong>${task.name}</strong>
            <p>${task.desc}</p>

            ${
                !task.completed
                ? `<div class="task-time">Hace ${Math.floor((now - task.time)/60000)} min</div>`
                : ''
            }

        </div>

        <div class="task-buttons">

            ${
                !task.completed
                ? `<button class="btn-complete" data-index="${index}">Completar</button>`
                : ''
            }

            <button class="btn-delete" data-index="${index}">Eliminar</button>

        </div>
    `;


    if(task.completed){
        completedList.appendChild(div);
    }else{
        pendingList.appendChild(div);
    }

});


/* BOTONES */

document.querySelectorAll('.btn-complete').forEach(btn => {

    btn.addEventListener('click', () => {

        const i = btn.dataset.index;
        tasks[i].completed = true;

        updateTasks();

    });

});


document.querySelectorAll('.btn-delete').forEach(btn => {

    btn.addEventListener('click', () => {

        const i = btn.dataset.index;
        tasks.splice(i, 1);

        updateTasks();

    });

});
```

}

/* =========================
AGREGAR TAREA
========================= */

addTaskBtn.addEventListener('click', () => {

```
const name = taskNameInput.value.trim();
const desc = taskDescInput.value.trim();

if(!name || !desc) return;

loading.style.display = 'block';

setTimeout(() => {

    tasks.push({
        name,
        desc,
        completed: false,
        time: new Date()
    });

    taskNameInput.value = '';
    taskDescInput.value = '';

    loading.style.display = 'none';

    updateTasks();

},800);
```

});

/* =========================
ACTUALIZAR TIEMPO
========================= */

setInterval(updateTasks, 60000);
