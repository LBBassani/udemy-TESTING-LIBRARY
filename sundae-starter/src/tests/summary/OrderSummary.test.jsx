import { describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import OrderSummary from "../../pages/summary/OrderSummary";
import { OrderDetailsProvider } from "../../contexts/OrderDetails";

describe('Order Summary Test', () => {
    test('Check values in summary form', () => {
        render(
            <OrderDetailsProvider 
                initialValue = {
                    { 
                        scoops: {'Vanilla' : 3, 'Chocolate': 1}, 
                        toppings: {'Cherries': 1, 'M&Ms': 1, 'Mochi': 0}
                    }
            }>
                <OrderSummary />
            </OrderDetailsProvider>
        );

        const totalScoops = screen.getByRole('heading', { name: /Scoops: R\$/ });
        expect(totalScoops).toHaveTextContent('8,00');

        const totalToppings = screen.getByRole('heading', { name: /Toppings: R\$/ });
        expect(totalToppings).toHaveTextContent('3,00');

        const totalValue = screen.getByRole('heading', { name: /Total: R\$/ });
        expect(totalValue).toHaveTextContent('11,00');
    });

    test('Check the scoops list in summary form', () => {
        render(
            <OrderDetailsProvider 
                initialValue = {
                    { 
                        scoops: {'Vanilla' : 3, 'Chocolate': 1, 'Mint': 0}, 
                        toppings: { }
                    }
            }>
                <OrderSummary />
            </OrderDetailsProvider>
        );

        const scoopArray = screen.getByRole('list', { name: 'scoops-list' });
        const { getAllByRole } = within(scoopArray);
        const scoopsList = getAllByRole("listitem");
        expect(scoopsList.length).toBe(2);
    });

    test('Check the toppings list in summary form', () => {
        render(
            <OrderDetailsProvider 
                initialValue = {
                    { 
                        scoops: { }, 
                        toppings: {'Cherries': 1, 'M&Ms': 1, 'Mochi': 0}
                    }
            }>
                <OrderSummary />
            </OrderDetailsProvider>
        );

        const toppingsArray = screen.getByRole('list', { name: 'toppings-list' });
        const { getAllByRole } = within(toppingsArray);
        const toppingsList = getAllByRole("listitem");
        expect(toppingsList.length).toBe(2);
    });
})