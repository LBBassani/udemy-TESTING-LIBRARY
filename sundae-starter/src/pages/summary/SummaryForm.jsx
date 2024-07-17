import axios from "axios";
import { useState, forwardRef } from "react"
import { OverlayTrigger, Popover, Button, Form } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { useNavigate } from "react-router-dom";

export default function SummaryForm(){
    const [isChecked, setIsChecked] = useState(false);
    const { optionCounts } = useOrderDetails();
    const navigate = useNavigate();

    const ConsentPopover = forwardRef((props, ref) => {     // necessário para o OverlayTrigger passar as informações de posicionamento através das props
        return <Popover id='consent-popover' {...props} ref={ref}>
            <Popover.Body>No ice cream will actually be delivered.</Popover.Body>
        </Popover>
    })

    const CheckboxLabel = () => {
        return <span>I agree to <OverlayTrigger trigger={["focus", "hover"]} placement="right" overlay={<ConsentPopover/>}><span style={{color: 'blue'}}>Terms and Conditions</span></OverlayTrigger></span>
    }

    const submitOrder = async () => {
        const response = await axios.post('http://localhost:3030/order', optionCounts);
        navigate(`/confirmation/${response.data.orderNumber}`);
    }

    return <Form>
        <Form.Group controlId="terms-and-conditions">
            <Form.Check label={<CheckboxLabel/>} type="checkbox" defaultChecked={isChecked} onClick={() => {setIsChecked(!isChecked)}}/>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!isChecked} onClick={submitOrder}>Confirm Order</Button>
    </Form>
}