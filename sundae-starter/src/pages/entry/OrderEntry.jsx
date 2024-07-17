import { useNavigate } from "react-router-dom";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

export default function OrderEntry(){
    const {grandTotal} = useOrderDetails();
    const navigate = useNavigate();

    return <>
    <h1>Design Your Sundae!</h1>
    <Options optionType='scoops' />
    <Options optionType='toppings' />
    <h2>Total to pay: {formatCurrency(grandTotal)}</h2>
    <button onClick={() => navigate('/summary')}>Order your ice cream</button>
    </>
}