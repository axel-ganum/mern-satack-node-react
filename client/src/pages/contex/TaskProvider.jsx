import { createContext, useContext, useState } from "react";
import { deleteTaskRequest , createTaskRequest,getTask, updateTaskRequest, toggleTaskRequest} from "../../api/tasks.api";
import { TaskContext } from "./TaskContext";
export const useTasks = () =>{
   const context = useContext(TaskContext)
   if (!context) {
      throw new Error("useTasks must be used within a TaskContextProvider")
   }
   return context
}

export const TastContextProvider = ({children}) => {
   const [tasks, setTasks] = useState([]);

   function loadTaks () {

      fetch('http://localhost:4000/tasks')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error loading tasks:', error.message));


    }

    const deleteTask = async (id) =>{
      try{
       const response = await deleteTaskRequest(id);
       setTasks(tasks.filter(task => task.id != id))
      } catch (error) {
       console.error(error)
      }
    
   };

   const createTask = async (task) => {
      try {
         const response = await createTaskRequest(task)
           console.log(response);
         } catch (error) {
           console.error(error);
         }
   }

      const get = async (id) => {
        try {
          const response = await getTask(id)
          return response.data
        } catch (error) {
          console.log(error)
        }
      }

      const updateTask = async (id, newFields) => {
       try {
        const response = await updateTaskRequest(id, newFields);
        console.log(response) 
        } catch (error) {
        console.log ( error)
         } 
        };

          const toggleTask = async (id) => {
            try{

              const taskFound = tasks.find((task) => task.id === id);
              await toggleTaskRequest(id, taskFound.done === 0 ? true : false);
              setTasks(tasks.map((task) => (task.id === id? {...task, done: !task.done}: task)));
            } catch (error) {
              console.log(error);
            }
          }
      
         
   return (
   <TaskContext.Provider value={{tasks , loadTaks, deleteTask, createTask, get, updateTask,toggleTask }}>
        {children}
    </TaskContext.Provider>
   );
};
