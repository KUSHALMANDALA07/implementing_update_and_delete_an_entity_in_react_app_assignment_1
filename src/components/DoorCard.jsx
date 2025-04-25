import axios from 'axios';
import React from 'react'
import { useEffect, useState } from "react";
import { use } from 'react';
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;
const DoorCard = ({door,getDoors}) => {
    const [isEditMode,setEditMode] = useState(false);
        const [doorForm,setDoorForm] = useState({
            name:door.name,
            status:door.status
        })
    
    async function deleteDoor() {
        try {
            await axios.delete(`${API_URI}/${door.id}`);
            alert("Item deleted successfully");
            getDoors();
        } catch (error) {
            console.log(error);
            alert("something went wrong while deleting door");
        }
    }

    function handleInput(event){
        const key = event.target.name;
        const value = event.target.value;
        setDoorForm({...doorForm,[key]:value});
    }

    async function handleForm(e){
        e.preventDefault();
        try {
            const {name,status} = doorForm;
            if(!name || !status){
                alert("please enter all details");
                return;
            }
            await axios.put(`${API_URI}/${door.id}`,doorForm);
            alert("Data updated successfully");
            setEditMode(false);
            getDoors();
        } catch (error) {
            console.log(error);
            alert("something went wrong");
            
        }
    }

  return (
    <>
    {
        !isEditMode?
      <div>
      <h3>Name : {door.name}</h3>
      <p>Status: {door.status}</p>
      <div
      style={{
        display:"flex",
        justifyContent:"space-between",
      }}
      >
        <button
        onClick={
        ()=>setEditMode(true)
        }
        >Edit</button>
        <button
        onClick={deleteDoor}
        >Delete</button>
      </div>
    </div>
    :<div>
       <form action="" onSubmit={handleForm}>
                    <input type="text" value={doorForm.name} onChange={handleInput} name="name" placeholder="Enter Door Name..." />
                    <input type="text" value={doorForm.status} onChange={handleInput} name="status" placeholder="Enter Status..." />
                    <input type="submit" />
                </form>
                <button
                onClick={
                    ()=>setEditMode(false)
                }
                >close Edit Mode</button>
    </div>
    }
    </>
  )
}

export default DoorCard
