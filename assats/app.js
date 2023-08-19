/* steps
1. ui design
2. taking input from useer and store in local stroge & sho the 
task list

3. add input to browser using js 
*/
 const form = document.querySelector('.task_form');

 form.addEventListener('submit', (e)=>{
    e.preventDefault()
   
    const elements = e.target.elements;
    let task ={};

    [...elements].forEach(el => {
        if (el.name){
            task[el.name] = el.value;
        }
    });
    task.id = Math.floor(Math.random() * 1000 + 1000) + Date.now()

    addToLocal(task);


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