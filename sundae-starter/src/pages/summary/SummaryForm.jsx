import { useState } from "react"
import { Button, Form } from "react-bootstrap";

export default function SummaryForm(){
    const [isChecked, setIsChecked] = useState(false);

    return <Form>
        <Form.Group controlId="terms-and-conditions">
            <Form.Check label={<CheckboxLabel/>} type="checkbox" defaultChecked={isChecked} onClick={() => {setIsChecked(!isChecked)}}/>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!isChecked}>Confirm Order</Button>
    </Form>
}

function CheckboxLabel() {
    return <span>I agree to <span style={{color: 'blue'}}>Terms and Conditions</span></span>
}