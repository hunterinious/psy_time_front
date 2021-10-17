import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import * as routePaths from '../../consts/routePaths';
import appRouterService from '../../services/appRouterService';
import LoginContainer from '../Authentication/Login/Login';


const MyNav = (props) => {
    const {isLoginDataFetching, isLoginFailed, showModal, handleOpenModal, handleCloseModal, logoutUser} = props;

    const onLogout = () => {
        logoutUser(() => appRouterService.forwardToHomePage())
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href={routePaths.HOME}>Home</Nav.Link>
                    <Nav.Link href={routePaths.PSYCHOLOGISTS}>Psychologists</Nav.Link>
                    { !isLoginDataFetching
                        ? isLoginFailed
                            ?
                            <Nav.Item>
                                <Nav.Link onClick={handleOpenModal}>Login</Nav.Link>
                                { showModal ? <LoginContainer modal={true} handleClose={handleCloseModal} /> : null }
                            </Nav.Item>
                            :
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item href={routePaths.PRIVATE_PROFILE}>Edit profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={routePaths.HOME} onClick={onLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        : null
                    }
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNav;