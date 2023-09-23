import Modal from 'react-modal';
import axios from 'axios';
import React from 'react';
import './App.css';
Modal.setAppElement('#root');
const DeleteModal=({isOpen,onRequestClose,weekDay,index})=>{
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const deleteData={
            day:weekDay,
            index:index
        }

        try{
            await axios.post("https://timetable-backend.onrender.com/delete/",{...deleteData},{withCredentials:true});
            console.log("deleted from front");
        }
        catch(err){
            console.log("err at front while deleting");
        }
        window.location.reload();
    }
    if(!isOpen)return null;
    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="delete-modal" overlayClassName="delete-overlay">
                <h2>Remove this task?</h2>
                <form onSubmit={handleSubmit}>
                    <button type="submit">Yes</button>
                </form>
            </Modal>
        </>
    );
}
export default DeleteModal;