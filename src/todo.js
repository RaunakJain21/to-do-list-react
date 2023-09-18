import React, { useEffect, useState } from 'react'
import logo from "./images/logo.png";

function Todo() {

    

    const getlocaldata=()=>{
        const data1 = localStorage.getItem("mytodolist");
        if(data1){
        return JSON.parse(data1);
}
    else {return [];}
    };



  const [inputval,changeinputval]=useState("");
    const [inputs,changeinputs]=useState(getlocaldata());
    const [edit,setedit]=useState(false);
    const [uedititem,setit]=useState("");

    const addinput=()=>{
        if(inputval){
        const newinputdata = {
            id: new Date().getTime().toString(),
            data:inputval
        }
        changeinputs([...inputs,newinputdata]);
        changeinputval("");
    }
    else{
        alert("enter something to add in the list");
    }

    };

    // delete button function
    const deleteitem=(id)=>{
        // console.log("sdasfj");
      const updatedinputs = inputs.filter((element)=>{ 
           
            return element.id!=id;});
       changeinputs(updatedinputs);
    
    // console.log(updatedinputs);
    }

    // 
    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(inputs));
    },[inputs])

    // 

    const edititem=(id1)=>{
        const itemtoedit= inputs.find((element)=>{ return element.id===id1;});
        // console.log(itemtoedit);
        // console.log("der34fgbg");
        changeinputval(itemtoedit.data);
        setit(id1);
        setedit(true);

    }
    const removeall=()=>{
        changeinputs([]);
    }

    const updated=()=>{
       const updatedin= inputs.map((element)=>{
            if(element.id===uedititem)
            {
                element.data=inputval;
            }
            return element;
        });
        changeinputs(updatedin);
        console.log(updatedin);
        setedit(false);
        console.log("hello");
        changeinputval("");
    };


  return (
    <div className=' bg-slate-600 min-h-screen'>
    <div className=' flex flex-row bg-slate-600 p-5 mb-10 '>
        <img src={logo} className=' w-12 ' alt='pic'/>
         <div className=' font-bold text-3xl ml-5 mt-1'>To-Do List </div>
    </div>
    <div className=' justify-center flex flex-col items-center'>
    <div className=' p-1 bg-white lg:w-1/3 w-2/3 rounded-lg h-min mb-3'>
    <input type='text' className=' outline-none border-none p-1 w-4/5  h-min' placeholder='✍️' value={inputval} onChange={(event)=>changeinputval(event.target.value)} />
    {(edit)?<i className=" float-right hover:bg-white hover:text-black bg-black p-2 rounded-md text-white fa-regular fa-pen-to-square" onClick={updated}></i>: <i className=" hover:bg-white hover:text-black float-right p-2 bg-black rounded-md text-white fa-sharp fa-solid fa-plus" onClick={addinput}></i>}
    {/* <i class="fa-sharp fa-solid fa-plus" onClick={addinput}></i> */}
    
    </div>
    {/* added lists here */}
    
    {inputs.map((element,index)=>{
        return(
            <div className=' items-start text-white lg:w-1/3 w-2/3  lg:text-xl text-base p-2 flex flex-row justify-between mb-3 mt-3 bg-black rounded-lg'>
                <div className=' float-left '>{element.data}</div>
              <div> <i className="p-1 hover:bg-white hover:text-black bg-black rounded-md text-white fa-regular fa-pen-to-square " onClick={()=>edititem(element.id)} ></i>
               <i className="p-1 hover:bg-white hover:text-black bg-black rounded-md text-white fa-solid fa-trash " onClick={()=>deleteitem(element.id)}></i></div>
            </div>
        );
    })}

   <button className=' bg-black lg:text-xl text-base hover:bg-white hover:text-black text-white btn rounded-full mt-3  p-3 w-32 lg:w-52' onClick={removeall}>Remove All</button>
    </div>
    </div>
  )
}

export default Todo