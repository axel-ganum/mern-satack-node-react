import React, { useEffect, useState } from 'react';
import {Form, Formik} from 'formik';
import { useTasks } from './contex/TaskProvider';
import {useParams, useNavigate} from 'react-router-dom'



const TasksForm = () => {
  
  const {createTask, get, updateTask} = useTasks();
  const [task, setTask] = useState({
    title:"",
    deesciption:"",
  })
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const loadTask = async () => {
      if(params.id) {
        const task = await get(params.id);
    
       setTask({
        title: task[0].title, 
        description: task[0].description,
       });
      }
    }
    loadTask();
  }, [])

  return (
    <div>
    
      <Formik
       initialValues={task}
       enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values);

          if (params.id) {
             await updateTask(params.id, values);
            } else {
              await createTask(values);
            }
            navigate("/")
          setTask({
            title: "",
            description:"",
          })
        }}
      
      >
       {({handleChange, handleSubmit, values, isSubmitting}) => (
         <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10 ">
            <h1 className="text-xl fond-bold uppercase text-center" >{params.id? "Edit Task" : "New Task"}</h1>
         <label className="block">title</label>
         <input type="text" name= "title" placeholder='write a title' 
          className="px-2 py-1 rounded-sm w-full" onChange={handleChange}
          value={values.title}
         ></input>

         <label className="block">description</label>
         <textarea 
          name= "description"
          rows="3"
          placeholder='write a description' className="px-2 py-1 rounded-sm w-full"  onChange={handleChange} value={values.description}></textarea>
          
          <button type="submit" disabled= {isSubmitting} className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md">
            {isSubmitting? "saving...":"save" }
          </button>
      </Form>
       )}
      </Formik>
    </div>
  )
}

export default TasksForm
