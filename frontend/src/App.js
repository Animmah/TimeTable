import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import InputModal from './InputModal';
import DeleteModal from './DeleteModal';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen,setDeleteOpen]=useState(false);
  const [Data,setData]=useState({});
  const [day,setDay]=useState('');
  const [deleteDay,setDeleteDay]=useState('');
  const openModal = (x) => {
    setIsModalOpen(true);
    setDay(x);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openDeleteModal=(x)=>{
    setDeleteOpen(true);
    setDeleteDay(x);
  };
  const closeDeleteModal=()=>{
    setDeleteOpen(false);
  };
  useEffect(()=>{
    const getData=async()=>
    {
      try{
        const res=await axios.get('https://timetable-backend.onrender.com/');
        setData(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
    getData();
  },[]);
  const table=Object.keys(Data).map((x)=>{
    if(!Array.isArray(Data[x]))return null;

    return (
    <div key={x} >
       <div className='Row'>
        <div className='day'>
        <div className='day-name'>{x}</div>
        </div>
        {
          Data[x].map((y,index)=>(
            <>
            <div className="task" onClick={()=>openDeleteModal(x)}>
              <div className='timing' >
                <div className='timing-value'>{y.startTime}-{y.endTime}</div>
              </div> 
              <div className='subject'>
                <div className='subject-value'>{y.subject}</div>
              </div>
            </div>
            <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} weekDay={deleteDay} index={index}/>
            </>
          ))
        }
        <button onClick={()=>openModal(x) }>+</button>
        <InputModal isOpen={isModalOpen} onRequestClose={closeModal} weekDay={day}/>
      </div>
      <br/>
    </div> 
    );
  });
  return (
    <>
      {table}
    </>
  );
}

export default App;
