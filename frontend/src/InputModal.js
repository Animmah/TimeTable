import React,{useState} from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './App.css';
Modal.setAppElement('#root');

const InputModal=({isOpen,onRequestClose, weekDay})=>{

    const [inputData, setInputData] = useState({
        startTime:"",
        startAM:"AM",
        endTime:"",
        endAM:"AM",
        subject:""
    });

    const {startTime,startAM,endTime,endAM,subject}=inputData;

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
        await axios.post("https://timetable-backend.onrender.com/",{day:weekDay,...inputData},{withCredentials:true});
        console.log("sent");
        }
        catch(err){
            console.log(err);
        }
        setInputData({
            startTime:'',
            startAM:'AM',
            endTime:'',
            endAM:'AM',
            subject:''
        });
        window.location.reload();
    }
    const handleChange=(e)=>{
        const { name, value}=e.target;
        setInputData({...inputData,[name]:value})
    };
    const label_style={
        paddingTop:'6px',
        fontSize:'20px'
    }
    if(!isOpen)return null;
    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
                <h2>Set Schedule</h2>
                <form className="form-container" onSubmit={handleSubmit}>

                    {/* <div style={label_style}>Start time</div> */}
                    <input name="startTime" type="text" value={startTime} onChange={handleChange} placeholder="Start Time"/>
                        <select name="startAM" onChange={handleChange} value={startAM}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>

                    {/* <div style={label_style}>End time</div> */}
                    <input name="endTime" type="text" value={endTime} onChange={handleChange} placeholder="End Time"/>
                        <select name="endAM" onChange={handleChange} value={endAM}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>

                    {/* <div style={label_style}>Subject</div> */}
                    <input name="subject" type="text" value={subject} onChange={handleChange} placeholder="Subject"/>
                    
                    <button  className='save-btn' type="submit">Save</button>
                </form>
            </Modal>
        </>
    );
}
export default InputModal;