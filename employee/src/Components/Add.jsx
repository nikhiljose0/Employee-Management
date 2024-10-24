import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { Row,Col } from 'react-bootstrap';
import { addEmployee } from '../Api/allApi';
import { toast } from 'react-toastify';


function Add({depend}) {
  const [show, setShow] = useState(false);
  const [user,setUser]=useState({
      firstname:"",lastname:"",age:"",qualification:"",email:""
  })

  const handleAdd=async()=>{
      const {firstname,lastname,age,qualification,email}=user
      if(!firstname || !lastname || !age || !qualification || !email){
          toast.error("Enter Valid Data")
      }else{
          const res= await addEmployee(user)
          // console.log(res);
          if(res.status==200){
              toast.success("Employee Added")
              depend(res)
              handleClose()
              setUser({ firstname:"",lastname:"",age:"",qualification:"",email:""})
          }else{
              toast.error("Something Went Wrong")
          }
          
      }
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
            <div className='container-fluid py-5 ps-3' >
                <button onClick={handleShow} className='btn btn-info   '>Add Employee +</button>
            </div>


     <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                {/* <Col sm={6}>
                <label>
                    <input type="file" style={{visibility:"hidden"}} />
                    <img src="https://static.thenounproject.com/png/187803-200.png" className='img-fluid' alt="" />
                </label>
                </Col> */}
                <Col>
                <input type="text" placeholder="First Name" name="name"onChange={(e)=>{setUser({...user,firstname:e.target.value})}}  className='form-control mb-2' />
                <input type="date" placeholder="Last Name" name="name" onChange={(e)=>{setUser({...user,lastname:e.target.value})}}   className='form-control mb-2' />
                <input type="number" placeholder="Age" name="age" onChange={(e)=>{setUser({...user,age:e.target.value})}}   className='form-control mb-2' />
                <input type="text" placeholder="Qualification" name="qualification" onChange={(e)=>{setUser({...user,qualification:e.target.value})}}   className='form-control mb-2' />
                <input type="email" placeholder="Email" name="email" onChange={(e)=>{setUser({...user,email:e.target.value})}}  className='form-control mb-2' />
                </Col>

            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
    
    </>
  )
}

export default Add
