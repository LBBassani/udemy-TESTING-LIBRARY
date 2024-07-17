import { createContext, useContext, useEffect, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

export function useOrderDetails() {
    const contextValue = useContext(OrderDetails);

    if(!contextValue){
        throw new Error("useOrderDetails must be callled from within an OrderDetailsProvider");
    }

    return contextValue;
}

export function OrderDetailsProvider(props){
    const [optionCounts, setOptionCounts] = useState(props.initialValue || {
        scoops: {},
        toppings: {}
    })

    function updateItemCount(itemName, newItemCount, optionType){
        const newOptionsCounts = {...optionCounts};
        newOptionsCounts[optionType][itemName] = newItemCount;
        setOptionCounts(newOptionsCounts);
    }

    function resetOrder(){
        setOptionCounts({scoops: {}, toppings: {}});
    }

    function calculateTotal(optionType){
        const countsArray = Object.values(optionCounts[optionType]);
        const total = countsArray.reduce((total, value) => total + value, 0);
        return total*pricePerItem[optionType];
    }

    const totals = {
        scoops: calculateTotal('scoops'),
        toppings: calculateTotal('toppings')
    }

    const grandTotal = totals.scoops + totals.toppings;

    const value = { optionCounts, totals, grandTotal, updateItemCount, resetOrder};

    return <OrderDetails.Provider value={value} {...props} />
}