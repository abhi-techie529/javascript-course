 const todoList = [ {
        name:"make dinner",
        dueDate: "2025-12-22"
        } ,{
        name: "wash dishes" ,
        dueDate: "2025-12-22"
        } ];

        renderTodoList();


        function renderTodoList(){

                    let todoListHTML = '';

                for(let i = 0; i < todoList.length ; i++){
                const todoObject = todoList[i];
                // const name = todoObject.name;
                // const dueDate = todoObject.dueDate;
                //*********shorcut of above properties******//
                const {name,dueDate} = todoObject;
                const html = `
                    <div> ${name}</div>
                    <div> ${dueDate}</div>

                    <button onclick = "
                    todoList.splice(${i},1);
                    renderTodoList();
                    " class = "delete-todo-button">Delete</button>
                `;
                todoListHTML += html;
                }
        

                document.querySelector('.js-todo-list').innerHTML = todoListHTML 

        }



         function addTodo(){
            const inputElement = document.querySelector('.js-name-input');

            const name = inputElement.value;     // to get the text out we use ( .value )

            
            const dateInputElement = document.querySelector('.js-duedate-input');
            const dueDate = dateInputElement.value;               


            
            todoList.push({
                // name:name ,
                // dueDate: dueDate,
                   //*********shorcut of above properties,if property:variable have same name ******//
                 name ,
                 dueDate });
         
            
            inputElement.value = '';     // this is used to reset the values of the text input after adding the value

            renderTodoList();

         }