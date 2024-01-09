import React, { useState } from 'react'
import './style.scss'

const Switchtabs = ({data,ontabchange}) => {

  const [selectedtab,setselectedtab]=useState(0);
  const[left,setleft]=useState(0);

  const activetab=(tab,index)=>{
    setleft(index*100)

    setTimeout(() => {
        setselectedtab(index)
    }, 300);

    ontabchange(tab)

  }
  return (
    <div className='switchingTabs'>
    <div className="tabItems">
        {
            data.map((tab,index)=>(
                <span key={index} 
                className={`tabitem ${selectedtab===index?'active':""}`}
                onClick={()=>activetab(tab,index)}
                >
                {tab}
                </span>
            ))
        }
        <span className="movingBg" style={{left}}></span>
    </div>
      
    </div>
  )
}

export default Switchtabs
