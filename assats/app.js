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
   tasks?.map(({taskName , priority , status, date, id } , index) => {
     
      const tr = document.createElement('tr');

   tr.innerHTML = `
   <td><input type="checkbox"></td>
   <td>${index + 1}</td>
   <td>${taskName}</td>
   <td>${priority}</td>
   <td>${status || 'Incomplete'}</td>
   <td>${date}</td>
   <td class="btn_div" >
       <button class="delete_btn" onclick='deleteTask(${id})'> <i class="fa-solid fa-trash-can"></i></button>
       <button class="check_btn" onclick='taskStatus(${id})' > <i class="fa-solid fa-check-to-slot"></i></button>
        <button class="edit_btn"><i class="fa-solid fa-pen-to-square"></i></button>
    </td> `;

   tBody.appendChild(tr);
   })
   
 }
 displayTasks();
// delete tasks function
function deleteTask(id){
   const tasks = getLocal()
   const newTasks = tasks.filter(task =>{
      if(task.id!==id){
         return true;
      }
      else{
         return false;
      }
   })
   localStorage.setItem("tasks", JSON.stringify(newTasks))
   displayTasks()
}

// task status change
function taskStatus(id){
   const tasks = getLocal()
   const newTasks = tasks.map(task=>{
      if (task.id === id){
         if(task.status ==='Incomplete'){
            task.status = 'Completed';
         }
         else{
            task.status = 'Incomplete';
         }
      }
     return task;
   })
   localStorage.setItem("tasks", JSON.stringify(newTasks))
   displayTasks()
}