import React, { useEffect, useState } from 'react'
import Add from '../Components/Add';
import { Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { getEmployees, updateEmployee, deleteEmployee } from '../Api/allApi';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


function Home() {
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

  


    const diplayData = async () => {
        const res = await getEmployees()
        // console.log(res);
        if (res.status == 200) {
            setData(res.data)
        }
    }

    const deleteData=async(id)=>{
        const res1=await deleteEmployee(id)
        // console.log(res1);
        if(res1.status==200){
            toast.success("Deleted")
            diplayData()
        }else{
            toast.error('Deletion Failed')
        }
    }

    const handleClose = () => setShow(false);

    const handleShow = (item) =>{
        // console.log(item);
        
        setShow(true);
        setUpdate({
            ...update,firstname:item.firstname,lastname:item.lastname,age:item.age,qualification:item.qualification,id:item._id,email:item.email
        })

    } 

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
            <Add depend={setRefresh} />

            <div className='container-fluid mb-5' style={{ minHeight: "100vh" }}>
                {/* <h3 className='text-warning ps-3 pb-5'>All Employees</h3> */}
                <Row className=' row d-flex align-items-center ' style={{ justifyContent: "space-evenly" }}>

                    {
                        data.length > 0 ?
                            data.map((item) => (
                               
                                <Card style={{ width: '16rem',margin:"40px 10px 0px 18px", background:'black',color:'yellow',border:'10px'}}>
                                    <Card.Body>
                                        <Card.Text>
                                            <p>First Name : {item.firstname} </p>
                                            <p>Last Name : {item.lastname} </p>
                                            <p>Age : {item.age} </p>
                                            <p>Quailification : {item.qualification} </p>
                                            <p>Email : {item.email} </p>
                                        </Card.Text>
                                        <div className='d-flex justify-content-between'>
                                            <button className='btn btn-success' onClick={()=>{handleShow(item)}}>Edit</button>
                                            <button className='btn btn-danger' onClick={()=>{deleteData(item._id)}}>Delete</button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))

                            :
                            <h5 className='text-center mt-5'>No Data Added Yet !!</h5>

                    }

                </Row>
            </div>


                        {/* modal */}

                        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FloatingLabel controlId="firstname" label="First Name" className='mb-3'>
                        <Form.Control type="text" placeholder="" value={update.firstname} onChange={(e)=>{setUpdate({...update,firstname:e.target.value})}} />
                    </FloatingLabel>
                    <FloatingLabel controlId="lastname" label="Last Name" className='mb-3'>
                        <Form.Control type="text" placeholder="" value={update.lastname} onChange={(e)=>{setUpdate({...update,lastname:e.target.value})}}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="age" label="Age" className='mb-3'>
                        <Form.Control type="number" placeholder="" value={update.age} onChange={(e)=>{setUpdate({...update,age:e.target.value})}}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="qualification" label="Qualification" className='mb-3'>
                        <Form.Control type="text" placeholder="" value={update.qualification} onChange={(e)=>{setUpdate({...update,qualification:e.target.value})}} />
                    </FloatingLabel>
                    {/* <FloatingLabel controlId="email" label="Email" className='mb-3'>
                        <Form.Control type="email" placeholder="" value={update.email} onChange={(e)=>{setUpdate({...update,email:e.target.value})}}/>
                    </FloatingLabel> */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{handleUpdate(update.id,update)}} >Update</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Home