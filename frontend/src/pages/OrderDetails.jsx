import { Link, useParams } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import axios from "axios";

function OrderDetails() {


    const { id: orderId } = useParams();
    const [loading,setLoading]=useState(false)
    const[error, setError]=useState(null)


   useEffect(()=>{
    const fetchOrders = async ()=>{
        setLoading(true)

        try {
            const { data } = await axios.get("/api/orders/getMyOrders");
            console.log('this is the list of orders',data)
            
        } catch (error) {
            console.error(error)
        }
       
        
    }
    fetchOrders();
},[orderId])

    return (
        <div>
            <h2>Order summary </h2>
        </div>
    );
}

export default OrderDetails;
