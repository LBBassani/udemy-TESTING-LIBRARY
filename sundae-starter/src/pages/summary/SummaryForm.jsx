import { useState, forwardRef } from "react"
import {OverlayTrigger, Popover, Button, Form } from "react-bootstrap";

export default function SummaryForm(){
    const [isChecked, setIsChecked] = useState(false);

    const ConsentPopover = forwardRef((props, ref) => {     // necessário para o OverlayTrigger passar as informações de posicionamento através das props
        return <Popover id='consent-popover' {...props} ref={ref}>
            <Popover.Body>No ice cream will actually be delivered.</Popover.Body>
        </Popover>
    })

    const CheckboxLabel = () => {
        return <span>I agree to <OverlayTrigger trigger={["focus", "hover"]} placement="right" overlay={<ConsentPopover/>}><span style={{color: 'blue'}}>Terms and Conditions</span></OverlayTrigger></span>
    }

    return <Form>
        <Form.Group controlId="terms-and-conditions">
            <Form.Check label={<CheckboxLabel/>} type="checkbox" defaultChecked={isChecked} onClick={() => {setIsChecked(!isChecked)}}/>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!isChecked}>Confirm Order</Button>
    </Form>
}