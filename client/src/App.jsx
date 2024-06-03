import React from 'react'
import { Routes, Route } from 'react-router-dom';

import TasksPage from './pages/TasksPage';
import TasksForm from './pages/TasksForm';
import NotFound from './pages/NotFound';
import Narvar from './component/Narvar';
import { TastContextProvider } from './pages/contex/TaskProvider';


const App = () => {
  return (
    <div className = "bg-zinc-900 h-screen">
    
    <Narvar/>
     <div className='container mx-auto py-4 px-20' >
    <TastContextProvider>
    <Routes>
     <Route path= "/" element={ <TasksPage/>} />
     <Route path="/new"  element={<TasksForm/>} />
     <Route path="/edit/:id"  element={<TasksForm/>} />
     <Route path="*" element={<NotFound/>} />
    </Routes>
    </TastContextProvider>
    </div>
    </div>
  )
}

export default App

