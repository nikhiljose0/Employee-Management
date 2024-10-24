import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <Navbar className="bg-body-tertiary p-3">
                <Container>
                    <Navbar.Brand href="#home" style={{fontSize:"25px"}}>
                    <i className="fa-solid fa-industry" style={{color: "#FFD43B",}} />                        {' '}
                        Employee Control
                    </Navbar.Brand>
                    <Link to={'/'} className='btn hbtn' style={{textDecoration:"none",border:"1px solid #15b7a4 "}}>Home</Link>
                </Container>
            </Navbar>
        </>
    )
}

export default Header