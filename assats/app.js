/* steps
1. ui design
2. taking input from useer and store in local stroge & sho the 
task list

3. add input to browser using js 
*/
 const form = document.querySelector('.task_form');
 const tBody = document.querySelector('tbody');
 const search = document.querySelector('#search');
 const filter = document.querySelector('#filter');

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

 function displayTasks (searchText, filterName) {
   let tasks = getLocal();

   if(searchText){
   searchText = searchText.trim().toLowerCase();
    tasks = tasks.filter(task =>{
         if(task.taskName.toLowerCase().includes(searchText)) return true;
         return false ;
      })
   }
  
if(filterName){
   tasks = tasks.filter(task=>{
   switch(filterName){
      case 'Incomplete':
      if(task.status === filterName ) return true ;
      return false ;
      break;

      case'Completed':
      if(task.status === filterName ) return true ;
      return false ;
      break;

      case'High':
      if(task.priority === filterName ) return true ;
      return false ;
      break;

      case'Medium':
      if(task.priority === filterName ) return true ;
      return false ;
      break;

      case'Low':
      if(task.priority === filterName ) return true ;
      return false ;
      break;
   } 
   })
}

   tBody.innerHTML =''
  if(tasks.length){
   tasks?.reverse()?.map(({taskName , priority , status, date, id } , index) => {
     
      const tr = document.createElement('tr');

      tr.classList.add(`task_${id}`);
   tr.innerHTML = `
   <td><input type="checkbox"></td>
   <td>${index + 1}</td>
   <td  class='taskName'>${taskName}</td>
   <td class='priority'>${priority}</td>
   <td class='status'>${status || 'Incomplete'}</td>
   <td class='date'>${date}</td>
   <td class="btn_div , action " >
       <button class="delete_btn" onclick='deleteTask(${id})'> <i class="fa-solid fa-trash-can"></i></button>
       <button class="check_btn" onclick='taskStatus(${id})' > <i class="fa-solid fa-check-to-slot"></i></button>
        <button class="edit_btn" onclick='editTask(${id})'><i class="fa-solid fa-pen-to-square"></i></button>
    </td> `;

   tBody.appendChild(tr);
   })
  }
  else{
   tBody.innerHTML ='<p>No Tasks Founded !</p>'
  }
   
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

// edit task
function editTask(id){
const tr = document.querySelector(`.task_${id}`);
// for task name
const taskNameEl = tr.querySelector('.taskName');
const taskName = taskNameEl.textContent;
const taskNameInput = document.createElement('input');
taskNameInput.value= taskName;
taskNameEl.innerHTML = '';
taskNameEl.appendChild(taskNameInput);

// forpriority
const priorityEl = tr.querySelector('.priority');
const priorityName = priorityEl.textContent;
const selectEl = document.createElement('select');
selectEl.innerHTML = `    <option value="" disabled selected> Select One</option>
<option ${priorityName === "High" && "selected"}    value="High">High</option>
<option ${priorityName === "Medium" && "selected"}  value="Medium">Medium</option>
<option ${priorityName === "Low" && "selected"}  value="Low">Low</option>
`

priorityEl.innerHTML ='';
priorityEl.appendChild(selectEl);







// for date
const dateEl = tr.querySelector('.date');
const date = dateEl.textContent;

const dateTaskEl = document.createElement('input');
dateTaskEl.type = 'date';
dateTaskEl.value= date;
dateEl.innerHTML = '';
dateEl.appendChild(dateTaskEl);






// for action
const actionEl = tr.querySelector('.action');
const actionButton = actionEl.innerHTML;
const saveBtn = document.createElement('button');
saveBtn.onclick =  function(){
   const newTaskName = taskNameInput.value;
   const newTaskPriority = selectEl.value;
   const newDate = dateTaskEl.value;
   const tasks = getLocal()
   const newTasks = tasks.map(task =>{
      if(task.id ===id){
         return {
            ...task,
            taskName: newTaskName,
            priority: newTaskPriority,
            date : newDate
         }
      }
      else{
         return task;
      }
   })
   localStorage.setItem("tasks", JSON.stringify(newTasks))
   displayTasks()
}
saveBtn.innerHTML =`
<button class="save_btn" ><i class="fa-solid fa-floppy-disk"></i></button>`
actionEl.innerHTML = '';
actionEl.appendChild(saveBtn);

}

//search

search.addEventListener('input', function(e){
   const searchText = e.target.value;
   displayTasks(searchText)
})

//filter
filter.addEventListener('change', function(e){
   const filterName = e.target.value;
   displayTasks(undefined, filterName)
})