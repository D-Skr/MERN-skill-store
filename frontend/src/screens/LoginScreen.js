import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <div className="alert alert-dismissible alert-warning">Invalid email or password</div>}
            {loading && <h2>Loading...</h2>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='py-3'>
                    <Form.Control type="email"
                        placeholder="Enter your email"
                        value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='py-3'>
                    <Form.Control type="password"
                        placeholder="Enter your password"
                        value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button className='btn-block' type='submit' variant="primary">Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have no account? <Link to={redirect ? `/register?redirect=${redirect}` :
                        '/register'}>Sign Up</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
