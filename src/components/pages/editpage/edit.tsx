import React, { FC, useEffect, useState } from 'react'
import {Idata} from '../../../interface/dataInterface'

interface IProps {
    data:Idata,
    title:string,
    // setIsEditf : ()=>void,
    handleSubmit:(formdata:any) =>void,
    formError:any,
    // isEdit:boolean
  

    
}

 const Edit:FC<IProps>= ({data,title,formError,handleSubmit}) => {
   
    const [formdata, setFormData]= useState<any>(data)
    const [error, setError]= useState<any>(formError)

    console.log("edit error0",error)
    console.log("edit FormError",formError)


    
    // useEffect((  ) => {

    //     // setFormData(data);
    //     setError(formError)
        
    //     console.log("edit page useeffect",formError)

       
    // }, [formError])
    // console.log('formData',formdata)


    const handleChange=(e:React.ChangeEvent<HTMLElement>)=>{

        
        const {name,value}:any=e.target;
      
        if(value===""){
        setError({[name]:`${name} is required`})
        setFormData({...formdata,[name]:""})


        }else{
        setFormData({...formdata,[name]:value})


        }

    }



    
        




    return (
        <div className='edit'>
            <div >
                    <h2>{title}</h2>
                    <div className='edit-content-wrapper'>


                        <form onSubmit={(e)=>{ e.preventDefault()
                        handleSubmit(formdata)}}>

            
                         <div className='edit-content home-content' >
                            <label>Name :</label>
                            <input name="name" type="text" required={true} value={ formdata.name } onChange ={(e)=>handleChange(e)}></input>
                           
                        </div>
                        {error && <div className='error-div'>
                            <p className='error-message'>{error.name}</p>

                            </div>}
                        

                        <div className='edit-content home-content' >
                            <label>email : </label>
                            {/* <span> {data.email }</span>  */}
                            {/* <input name="email" value={data.email}  onChange ={(e)=>handleChange(e.target.value)}></input> */}
                            <input name="email" type="email" value={formdata.email} required={true} onChange ={(e)=>handleChange(e)}></input>

                         </div>

                         {error && <p className='error-message'>{error.email}</p> }
                        <div className='edit-content home-content' >
                            <label>Phone :</label>
                            {/* <span> {data.ph_no}</span>  */}
                            <input name="ph_no" type='number' required={true} value={formdata.ph_no}  onChange ={(e)=>handleChange(e)}></input>

            
                        </div>
                        {error && <p className='error-message'>{error.ph_no}</p> }

                        <div className='edit-content home-content' >
                            <label>Address :</label>
                            {/* <span>{data.Address}</span>  */}
                            <input name="Address" value={formdata.Address} required={true} onChange ={(e)=>handleChange(e)}></input>

                        </div>
                        {error && <p className='error-message'>{error.Address}</p> }

                        <div className='edit-content home-content' >
                            <label>Ed :</label>
                            {/* <span> {data.Education }</span>  */}
                            <input name="Education" value={formdata.Education}  required={true} onChange ={(e)=>handleChange(e)}></input>
                        </div>
                        {error && <p className='error-message'>{error.Education}</p> }



                        <div className='edit-btn btn'>

                         <button type='submit' disabled={ false} onClick={()=>{handleSubmit(formdata) }}> Save</button>
                         </div>

                         </form>
                        
                          
                       
                        
                    </div>

                    
            </div>
        </div>
    )
}


export default Edit;