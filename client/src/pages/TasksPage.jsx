import React from 'react'
import { useEffect, useState } from 'react';
import TasksCard from '../component/TasksCard';
import { useTasks } from './contex/TaskProvider';

const TasksPage = () => {
const {tasks, loadTaks} = useTasks();

    useEffect(() => {
     
        loadTaks()
      }, []);
       function reenderMain() {
        if (tasks.length === 0) return <h1>No tasks yet</h1>

        return tasks.map((task) => (
          <TasksCard task={task} key={task.id}/>)
        )
       }
  return (
    <div>
      <h1 className='text-5xl text-white font-bold text-center'>Tasks</h1>
      <div className='grid grid-cols-3 gap-2'>
      {reenderMain()}
     </div>
    </div>
  );
}

export default TasksPage;




