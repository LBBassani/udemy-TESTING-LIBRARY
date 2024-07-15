import {Col, Form} from 'react-bootstrap'
import { useOrderDetails } from '../../contexts/OrderDetails'

export default function ToppingOption({name, imagePath}){

    const {updateItemCount} = useOrderDetails(); 
    const handleChange = (e) => updateItemCount(name, e.target.checked? 1: 0, "toppings");

    const CheckboxLabel = () => {
        return <span>{name}</span>
    }

    return <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: 'center'}}>
    <img src={`http://localhost:3030/${imagePath}`} alt={`${name} Topping`}/>
    <Form.Group controlId={`${name}-check`} style={{marginTop: '10px'}}>
            <Form.Check label={<CheckboxLabel/>} type="checkbox" onChange={handleChange}/>
    </Form.Group>
    </Col>
}