/* steps
1. ui design
2. taking input from useer and store in local stroge & sho the 
task list

3. add input to browser using js 
*/
 const form = document.querySelector('.task_form');
 const tBody = document.querySelector('tbody');

 form.addEventListener('submit', (e)=>{
   //   e.preventDefault()
   
    const elements = e.target.elements;
    let task ={};

    [...elements].forEach(el => {
        if (el.name){
            task[el.name] = el.value;
        }
    });
    task.id = Math.floor(Math.random() * 1000 + 1000) + Date.now()

    addToLocal(task);
    e.target.reset();


 })


 //get data from local storage

 function getLocal(key = 'tasks'){
    let tasks = [];
    tasks =JSON.parse(localStorage.getItem(key)) || [];
    return tasks;
 }

 // add task to local storage
 function addToLocal(task){
    const tasks = getLocal();
   tasks.push(task);
   localStorage.setItem("tasks", JSON.stringify(tasks))
 }
 // display task to list

 function displayTasks () {
   const tasks = getLocal();
   tBody.innerHTML =''
   tasks?.map(({taskName , priority , status, date } , index) => {
     
      const tr = document.createElement('tr');

   tr.innerHTML = `
   <td><input type="checkbox"></td>
   <td>${index + 1}</td>
   <td>${taskName}</td>
   <td>${priority}</td>
   <td>${status || 'Incomplete'}</td>
   <td>${date}</td>
   <td>
        <i class="fa-solid fa-trash-can"></i>
        <i class="fa-solid fa-check-to-slot"></i>
        <i class="fa-solid fa-pen-to-square"></i>
    </td> `;

   tBody.appendChild(tr);
   })
   
 }
 displayTasks();