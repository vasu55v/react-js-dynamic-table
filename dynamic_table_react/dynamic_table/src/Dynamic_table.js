import React, { useEffect, useState } from "react";

const Dynamic_table = () => {
  const [formInput, setFormInput] = useState(()=>{
    const data=window.localStorage.getItem('table_data');
    return data !== null ?JSON.parse(data):[
   {
      id: Math.round(Math.random() * 1000),
      name: "",
      email: "",
      phone: "",
    
  }
]});

// useEffect(()=>{
//   const data=window.localStorage.getItem('table_data');
//   if(data !== null){ 
//     setFormInput(JSON.parse(data));
//   }
//   else{
//     setFormInput([]);
//   }
// },[]) 
    

useEffect(()=>{
  window.localStorage.setItem("table_data",JSON.stringify(formInput))
},[formInput])

  const addField = () => {
    let obj = {
      id: Math.round(Math.random() * 1000),
      name: "",
      email: "",
      phone: "",
    };
    setFormInput([...formInput, obj]);
  };

  const handleChange = (id, field, value)=>{
     const updated_Array=formInput.map(item=>{
        return item.id === id ? {...item,[field]:value} : item;
     });
     setFormInput(updated_Array);
  }

  const del=(id)=>{
    const updated_Array=formInput.filter(item=>{
        return item.id!==id
    })
    setFormInput(updated_Array)
  }

  
  
  return (
    <div className="flex justify-center items-center text-white">
    <div className="text-warning text-center">
      <h1 className="text-4xl ">Dynamic table</h1>
      <table className="mt-10 border-dashed text-xl">
        <thead className="">
          <tr>
            <th className="border border-slate-600 ">Name</th>
            <th className="border border-slate-600 ">email</th>
            <th className="border border-slate-600 ">phone number</th>
            <th className="border border-slate-600 ">
              <button className="p-4 bg-stone-400 rounded-lg" onClick={addField}>
                Add field
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {formInput.map((value, index) => {
            return(
            <tr key={index} >
              <td className="border border-slate-600 ">
                <input
                  type="text"
                  value={value.name}
                  onChange={(e) => {
                    handleChange(value.id, "name", e.target.value);
                  }}
                  className="form-control bg-transparent p-5"
                />
              </td>
              <td className="border border-slate-600 ">
                <input
                  type="text"
                  value={value.email}
                  onChange={(e) => {
                    handleChange(value.id, "email", e.target.value);
                  }}
                  className="form-control bg-transparent p-5"
                />
              </td>
              <td className="border border-slate-600 ">
                <input
                  type="text"
                  value={value.phone} 
                  onChange={(e) => {
                    handleChange(value.id, "phone", e.target.value);
                  }}
                  className="form-control bg-transparent p-5"
                />
              </td>
              <td className="border border-slate-600 ">
              <button className="p-4 bg-red-700 text-white rounded-lg" onClick={()=>del(value.id)}>Delete</button>
                {/* {index!==0&&<button className="btn btn-danger form-control" onClick={()=>del(value.id)}>Delete</button>} */}
              </td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
};


export default Dynamic_table;
