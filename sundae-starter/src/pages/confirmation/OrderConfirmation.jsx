import { Button } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function OrderConfirmation(){

    const orderNumber = useLoaderData();
    const navigate = useNavigate();

    return <>
        <h1>Thank you!</h1>
        <h2>Your order number is #{orderNumber}</h2>
        <p>as per our terms and conditions, nothing will happen now</p>
        <Button onClick={() => {navigate('/')}}>Create new order</Button>
    </>
}