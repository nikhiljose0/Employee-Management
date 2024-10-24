import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col,Row } from 'react-bootstrap';
import { updateEmployee } from '../Api/allApi';

function Edit() {
  const [data, setData] = useState([])
  const [refresh,setRefresh]=useState()
  const [update,setUpdate]=useState({
       firstname:"",lastname:"",age:"",qualification:"",email
       :"",_id:""
  })
  const [show, setShow] = useState(false);


  useEffect(() => {
      diplayData()
  }, [refresh])


    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleUpdate=async(id,details)=>{
      const {firstname,lastname,age,qualification}=details
      if(!firstname || !lastname || !age || !qualification ){
          toast.error('Enter Valid Data')
      }else{
          const res2=await updateEmployee(id,details)
          // console.log(res2);
          if(res2.status==200){
              toast.success("Update Success")
              diplayData()
              handleClose()
              setUpdate({ firstname:"",lastname:"",age:"",qualification:"",email
                  :"",_id:""})
          }else{
              toast.error('Something Went Wrong')
              console.log(res2);
          }
      }
    }


  return (
    <>
        <button className='btn  mx-3' onClick={handleShow}><i className="fa-solid fa-pen-to-square" /></button>

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
                <input type="text" placeholder="First Name" name="name"onChange={(e)=>{setUpdate({...update,firstname:e.target.value})}}  className='form-control mb-2' />
                <input type="date" placeholder="Last Name" name="name"onChange={(e)=>{setUpdate({...update,lastname:e.target.value})}}  className='form-control mb-2' />
                <input type="number" placeholder="Age" name="age" onChange={(e)=>{setUpdate({...update,age:e.target.value})}}   className='form-control mb-2' />
                <input type="text" placeholder="Qualification" name="qualification" onChange={(e)=>{setUpdate({...update,qualification:e.target.value})}}  className='form-control mb-2' />
                {/* <input type="email" placeholder="Email" name="email" onChange={(e)=>{setUpdate({...update,mai:e.target.value})}}  className='form-control mb-2' /> */}
                </Col>

            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit