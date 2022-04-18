import React from 'react'
import { useState } from 'react'
import { nanoid } from "nanoid";

const AddShoe = ( {email, fetchShoesForRunner} ) => {

  const [shoeBrand, setShoeBrand] = useState("")
  const [mileage, setMileage] = useState(0)
  const [message, setMessage] = useState('')

  const getCondition = (mileage) => {
    if(mileage <= 100){
      return 'new'
    }
    else if (mileage > 100 && mileage <= 300){
      return 'good'
    }
    else if(mileage > 300 && mileage <=500){
      return 'bad'
    }
    else if(mileage > 500){
      return 'bitch get off the road'
    }
  }


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:6060/shoe`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          shoe_record: {
            id: nanoid(),
            shoe_brand: shoeBrand,
            mileage: mileage,
            condition: getCondition(mileage)
          }
        }),
      });
      if (res.status === 200) {
        setMessage("Added Shoe");
        fetchShoesForRunner();
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
      <form className='add-form' onSubmit={handleSubmit} >
        <div className='form-control'>
          <label>Add A Shoe</label>
          <input className='form-control' type='text' name='shoe_brand' required='required' placeholder='Enter a Shoe Brand' onChange={(e) => setShoeBrand(e.target.value)}></input>
          <input className='form-control' type='number' name='mileage' required='required' placeholder='Enter Current Mileage' onChange={(e) => setMileage(parseInt(e.target.value))}></input>
          <button className='btn btn-block' type='submit'>Add</button>
        </div>
      </form>
  )
}

export default AddShoe
