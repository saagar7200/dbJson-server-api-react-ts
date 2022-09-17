import React, { FC, useState,useEffect, } from 'react';
// import { useNavigate } from 'react-router-dom';
import Edit from '../pages/editpage/edit';
import {Idata} from '../../interface/dataInterface'


import  './home.css'
import Loading from '../Loading';
// import { getEffectiveTypeParameterDeclarations } from 'typescript';

interface IProps {
    
}


const Home :FC<IProps> = (props) => {

const [details,setDetails] = useState<Idata[]>([]);
// const [details,setDetails] = useState<any[]>([]);

const [isLoading,setIsloading] = useState(true);
const [error,setError] = useState<any >(null);
const [formError,setFormError] = useState({} as any);

const [isEdit, setIsEdit] = useState(false)
// const [userData,setUserData] =useState<any>({})


const handleSubmit =(formdata:any):void=>{
    // console.log(formdata)
// if(Object.keys(formdata).length === 0){
    setFormError(validate(formdata));

// }
console.log ( 'form',formError)
    // console.log(formdata)
    // if(Object.keys({formdata}).length != 0){
        setFormError(null)

     setDetails([formdata]);
    setIsEdit(!isEdit)
    fetch('http://localhost:3004/my_data/1',{
        method:'PUT',
        body:JSON.stringify(formdata),
        headers:{
            'Content-type':'application/json'
        },
        })
        .then(( res) => res.json())
        .then((res)=>{console.log("update res",res)
        // setDetails(res)
        })
    console.log(details)
    // }

       


console.log("form error",formError)
}
let FormError={}
const validate = (values:any) =>{

    if(!values.name){
        formError.name = "Name is Required"
    }

    if(!values.email){
        formError.email = "Email is Required"
    }
    if(!values.ph_no){
        formError.phone = "Phone is Required"
    }
    if(!values.Address){
        formError.Address = "Address is Required"
    }
    if(!values.Education){
        formError.Education = "Education is Required"
    }

    return formError;


}




useEffect(():void => {
   setTimeout( () =>{fetch('http://localhost:3004/my_data')
   .then(res => {
       if(!res.ok){
        throw Error(`Can't fetch the resources at the moment.
         Try again sometimes later.`);
       }
       console.log(res)
     return  res.json();
   })
   .then(data =>{
       // console.log(data)
       setDetails(data)
       setError(null)
       setIsloading(false)

   })
   .catch(err => {
       setError(err.message)
       setIsloading(false)

    //    console.log("error", error)
   })},5000)
}, [])


// console.log(details )
// let name = data.name

    return (

    <div >


        { !isLoading && error && <div className='server-error'> {error} </div>}


       { isLoading  && <Loading/>}
       

       { !isLoading && details.length > 0 &&
        <div className='home'>

        <h4>Welcome</h4>

         
         <div className={!isEdit ? 'home-container' :'edit-container'}>
            

         {!isLoading && !isEdit &&
  
          <div className='home-content-wrapper'>
              <h2>BIO</h2>
  
          <div className='home-content' >
              <label>Name :</label>
              <span> {details[0].name}</span>  
  
          </div>
          <div className='home-content' >
              <label>email : </label>
              <span> {details[0].email }</span> 
  
          </div>
          <div className='home-content' >
              <label>Phone :</label>
              <span> {details[0].ph_no}</span> 
              
          </div>
          <div className='home-content' >
              <label>Address :</label>
              <span>{details[0].Address}</span> 
          </div>
          <div className='home-content' >
              <label>Ed :</label>
              <span> {details[0].Education }</span> 
  
          </div>
          <div className='edit-btn' >
              <button type='submit' onClick={()=>setIsEdit(!isEdit)} >Edit</button>
          </div>
  
       
          </div>}
  
        
          {isEdit && !isLoading &&  details.length>0 && details.map((data:Idata) =>
              <Edit data={data} key={data.id} title={"Edit page"} formError={formError} handleSubmit={handleSubmit}/>)}
  
        
          </div>
          </div>

          
       }
        
    </div>
    )
}

export default Home;