import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')
    // const [message, setMessage] = useState(null)
    const cart = useSelector((state) => state.cart)

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    // const userDetails = useSelector((state) => state.userDetails)
    // const { loading, error, user } = userDetails

    // const userLogin = useSelector((state) => state.userLogin)
    // const { userInfo } = userLogin

    // const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    // const { success } = userUpdateProfile

    // useEffect(() => {
    //     if (!userInfo) {
    //         history.push('/login')
    //     } else {
    //         if (!user.name) {
    //             dispatch(getUserDetails('profile'))
    //         } else {
    //             setName(user.name)
    //             setEmail(user.email)
    //         }
    //     }
    // }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }


    return (
        <FormContainer>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='py-3'>
                    <Form.Label>
                        Select Method
                    </Form.Label>
                    <Col className='py-3'>
                        <Form.Check type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        <Form.Check type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        <Form.Check type='radio'
                            label='cash (stupid joke)'
                            id='cash'
                            name='paymentMethod'
                            value='cash'
                            checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                </Form.Group>
                <Button className='btn-block' type='submit' variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}
export default PaymentScreen
