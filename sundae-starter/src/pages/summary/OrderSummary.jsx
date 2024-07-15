import {SummaryForm} from './SummaryForm'
import { useOrderDetails } from '../../contexts/OrderDetails'
import { formatCurrency } from '../../utilities'

export default function OrderSummary() {
    const {totals, optionsCount} = useOrderDetails();
    
    const scoopArray = Object.entries(optionsCount.scoops);
    const scoopList = scoopArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    const toppingsArray = Object.keys(optionsCount.toppings);
    const toppingsList = toppingsArray.map(key => <li key={key}>{key}</li>)

    return <div>
        <h1>Order Summary</h1>
        <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
        <ul>{scoopList}</ul>
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
        <ul>{toppingsList}</ul>
        <SummaryForm />
    </div>
}