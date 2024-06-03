import { json } from 'stream/consumers';
import {pool} from '../db.js'

export const getTask = async (req, res) => {
  try {
        const [result] = await pool.promise().query(
       "SELECT * FROM tasks where id = ?", [
       req.params.id,
       ]);
       if (result.length ===0)
       return res.status(404).json({message: 'Task not found'});


      res.json(result);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }

}
export const getTasks = async (req, res) => {
   try {
    const [result] = await pool.promise().query(
       "SELECT * FROM tasks ORDER BY createAt ASC"
   );
   res.json(result);
   } catch (errpr) {
    return res.status(500).json({message: error.message}) ;
   }

}
   export const createTask =  async (req, res) => {
      try {
        const {title, description} = req.body
        const [result] = await pool.promise().query(
            "INSERT INTO tasks(title, description) VALUES (?, ?)",
            [title, description]
        )
        res.json({
            id: result.insertId,
            title,
            description
        })
      } catch (error) {
        return res.status(500).json({massage: error.massage})
      }
    }
        
    export const updateTask=  async (req, res) => {
          try {
            const result = await pool.promise().query("UPDATE tasks SET ? WHERE id = ?" , [
                req.body,
                req.params.id
              ]);
              res.json(result)
          } catch ( error) {
            return res.status(500).json({massage: error.massage});
          }
        }
          
        
        export const deleteTask = async (req, res) => {
             try {
                const [result] = await pool.promise().query("DELETE FROM tasks WHERE ID = ?", [
                    req.params.id
                   ]);
   
                   if(result.affctedRows === 0)
                        return res.status(404).json({message: "Task not found"});
   
                        return res.sendStatus(204)
             } catch (error) {
                return res.status(500).json({massage: error.massage});
             }
            } 