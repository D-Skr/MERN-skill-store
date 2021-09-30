import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    //calculating prices
    cart.itemsPrice = Number((cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2))
    cart.taxPrice = Number((cart.itemsPrice * 0.08875).toFixed(2))
    cart.totalPrice = Number((cart.itemsPrice + cart.taxPrice).toFixed(2))

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        } // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.lenght === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summury</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col><strong>${cart.totalPrice}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <h4>{error}</h4>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}>Buy</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
