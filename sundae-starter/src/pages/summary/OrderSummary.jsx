import SummaryForm from './SummaryForm'
import { useOrderDetails } from '../../contexts/OrderDetails'
import { formatCurrency } from '../../utilities'

export default function OrderSummary() {
    const {totals, grandTotal, optionCounts} = useOrderDetails();
    
    const scoopsArray = Object.entries(optionCounts.scoops);
    const scoopsList = scoopsArray.filter( item => item[1] !== 0).map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    const toppingsArray = Object.entries(optionCounts.toppings);
    const toppingsList = toppingsArray.filter( item => item[1] !== 0 ).map(([key]) => <li key={key}>{key}</li>)

    return <div>
        <h1>Order Summary</h1>
        <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
        <ul aria-label='scoops-list'>{scoopsList}</ul>
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
        <ul aria-label='toppings-list'>{toppingsList}</ul>
        <h2>Total: {formatCurrency(grandTotal)}</h2>
        <SummaryForm />
    </div>
}