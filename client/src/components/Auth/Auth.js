import React, {useState} from 'react';
import {Alert, Button, Form, Modal, Nav, NavLink} from 'react-bootstrap';
import {PersonCircle, BoxArrowInRight} from 'react-bootstrap-icons';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';

import {authService} from '../../services';

const Auth = () => {
    const {reset, register, handleSubmit} = useForm();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [isAuth, setIsAuth] = useState(true);
    const [showAuth, setShowAuth] = useState(false);
    const [showRegSuccess, setShowRegSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSelect = (eventKey) => {
        setIsAuth(eventKey === 'link-0');
    }

    const handleClose = () => setShowAuth(false);
    const handleShow = () => {
        setShowAuth(true);
        if (!user) {
            reset();
        }
    }
    const authUser = (e) => {
        if (isAuth) { // Login
            authService.auth(e).then(value => {
                localStorage.setItem('access_token', value.access);
                localStorage.setItem('refresh_token', value.refresh);
                setUser({id: value.id, email: e.email});
                localStorage.setItem('user', JSON.stringify({id: value.id, email: e.email}));
                setShowAuth(false);
                setError(null);

            }).catch(err => {
                setUser(null);
                setShowAuth(true);
                setError(err.response.data.detail);
                console.log('err', err.response.data.detail);
            });
        } else { // Register
            if (e.password !== e.password2) {
                setError('Passwords must contain equal values');
                console.log('Passwords must contain equal values');
            } else {
                let user = {...e, profile: {name: e.name, surname: e.surname, born: e.born, phone: e.phone}}
                authService.createUser(user).then(value => {
                    setUser(value);
                    setShowRegSuccess(true);
                    setError(null);
                }).catch(err => {
                    if (err.response.data.detail) {
                        setError(err.response.data.detail);
                    } else {
                        setError(JSON.stringify(err.response.data));
                    }
                });
            }
        }
    }

    const handleLogout = () => {
        localStorage.setItem('access_token', '');
        localStorage.setItem('refresh_token', '');
        localStorage.setItem('user', null);
        setUser(null);
        setError(null);
    };

    return (
        <div className={'d-flex align-items-center ms-5'}>
            <Link to={`/auth/${user?.id}`} className={'d-flex align-items-center'}>
                <PersonCircle className={'me-2'} color={'white'} size={20}/>
            </Link>
            <NavLink to='' className={'d-flex align-items-center'} onClick={handleShow}>
                <div
                    className={'text-light fs-5 d-flex align-items-center'}>{!user?.email ? 'Login' : user?.email}</div>
            </NavLink>
            <NavLink>
                <BoxArrowInRight className={'ms-2 d-flex align-items-center'} color={'white'} size={25}
                                 onClick={handleLogout}/>
            </NavLink>

            <Modal show={showAuth} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Authentication</Modal.Title>
                </Modal.Header>

                <Nav variant='tabs' defaultActiveKey='' onSelect={handleSelect}>
                    <Nav.Item>
                        <Nav.Link href='' eventKey='link-0'>Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey='link-1'>Register</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Modal.Body>
                    <Form onSubmit={handleSubmit(authUser)} id={'form-auth'}>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type='email' placeholder='Email' disabled={!user?.email ? false : true}
                                required defaultValue={''} {...register('email')}/>
                        </Form.Group>

                        <Form.Group className={'mb-3'} controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password' required
                                          disabled={!user?.email ? false : true}
                                          defaultValue={''} {...register('password')}/>
                        </Form.Group>

                        {/*** Registration ***/}
                        {!isAuth &&
                            <Form.Group className={'mb-3'}>
                                <Form.Control type='password' placeholder='Re-enter password' required
                                              disabled={!user?.email ? false : true}
                                              defaultValue={''} {...register('password2')}/>
                            </Form.Group>
                        }

                        {!isAuth &&
                            <Form.Group className={'mb-3'}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder='Name' required
                                              disabled={!user?.email ? false : true}
                                              defaultValue={''} {...register('name')}/>
                            </Form.Group>
                        }

                        {!isAuth &&
                            <Form.Group className={'mb-3'}>
                                <Form.Label>Surname</Form.Label>
                                <Form.Control type='text' placeholder='Surname' required
                                              disabled={!user?.email ? false : true}
                                              defaultValue={''} {...register('surname')}/>
                            </Form.Group>
                        }

                        {!isAuth &&
                            <Form.Group className={'mb-3'}>
                                <Form.Label>Born</Form.Label>
                                <Form.Control type='date' placeholder='Born' required
                                              disabled={!user?.email ? false : true}
                                              defaultValue={''} {...register('born')}/>
                            </Form.Group>
                        }

                        {!isAuth &&
                            <Form.Group className={'mb-3'}>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type='phone' placeholder='Phone' required
                                              disabled={!user?.email ? false : true}
                                              defaultValue={''} {...register('phone')}/>
                            </Form.Group>
                        }

                        {!isAuth && showRegSuccess &&
                            <div className={'text-success'}>Registration email sent!</div>
                        }

                        {error && <Alert variant='danger' onClose={() => setError(false)} dismissible>
                            <Alert.Heading>Error!</Alert.Heading>
                            <p>
                                {error}
                            </p>
                        </Alert>}

                        <Button variant='primary' type='submit' size={'md'}
                                disabled={!user?.email ? false : true}>
                            {isAuth && 'Login'}
                            {!isAuth && 'Register'}
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>
    );
};

export {Auth};
