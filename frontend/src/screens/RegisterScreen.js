import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userLogin)

    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <div className="alert alert-dismissible alert-warning">{message}</div>}
            {error && <div className="alert alert-dismissible alert-warning">Invalid email or password</div>}
            {loading && <h2>Loading...</h2>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='py-3'>
                    <Form.Control type="name"
                        placeholder="Enter your name"
                        required
                        value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='py-3'>
                    <Form.Control type="email"
                        placeholder="Enter your email"
                        required
                        value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='py-3'>
                    <Form.Control type="password"
                        placeholder="Enter your password"
                        required
                        value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='py-3'>
                    <Form.Control type="password"
                        placeholder="Confirm your password"
                        required
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button className='btn-block' type='submit' variant="primary">Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` :
                        '/login'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default RegisterScreen
