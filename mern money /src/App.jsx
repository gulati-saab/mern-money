import React, { useEffect, useState } from 'react'
import './App.css'


const App = () => {
  const [name, setName] = useState('')
  const [datetime, setDatetime] = useState('')
  const [description, setDescription] = useState('')
  const [transactions, setTransactions] = useState([])
  
  useEffect(()=>{
    getAll()
  },[])

  async function getAll(){
    const res = await fetch('http://localhost:4000/api/')
    const js= await (res.json())
    setTransactions(js)
    return js
  }

  async function addTrans(ev) {
    ev.preventDefault();
    const url = 'http://localhost:4000/api/';
    const price = name.split(" ")[0]
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ price, name: name.split(" ")[1], description, datetime })
      })
      const js = await res.json()
      console.log(js)
      setName("")
      setDescription("")
      setDatetime("")
      await getAll()
    } catch (err) {
      console.log(err)
    }
  }

  async function del(id){
    const url = 'http://localhost:4000/api/'+id;
    console.log(url)
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      })
      const js = await res.json()
      await getAll()
      console.log(js)
    } catch (err) {
      console.log(err)
    }
  }
  var bal = 0
  for(const tr of transactions){
    bal=(bal+Number(tr.price))
  }
  return (
    <>
      <main>
        <h1>${bal}</h1>
        <form onSubmit={addTrans}>
          <div className='basic'>
            <input type='text'
              value={name}
              onChange={ev => { setName(ev.target.value) }}
              placeholder='+200 new phone' />
            <input className='datetime'
              type='date'
              value={datetime}
              onChange={ev => { setDatetime(ev.target.value) }} />
          </div>
          <div className='description'>
            <input type='text'
              value={description}
              onChange={ev => setDescription(ev.target.value)}
              placeholder='desc' />
          </div>
          <button>Add Transaction</button>
        </form>
        <div className='transactions'>
        {transactions.length >0 && transactions.map((tr,i)=>(
          <div className="transaction" onClick={()=>del(tr._id)}>
            <div className="left">
              <div className="name">{tr.name}</div>
              <div className="decsription">{tr.description}</div>
            </div>
            <div className="right">
              <div className={'price '+(tr.price<0?'red':'green')}>{tr.price}</div>
              <div className="datetime">{tr.datetime}</div>
            </div>
          </div>
        ))}
        </div>
      </main>
    </>
  )
}
export default App;