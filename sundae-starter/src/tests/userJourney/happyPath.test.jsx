import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe('User journey happy path', () => {
    const user = userEvent.setup();
    
    test('User order flow', async () => {
        // render app
        render(<App />);

        // add ice cream and toppings
        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '1');

        const cherriesCheckbox = await screen.findByRole('checkbox', {name: 'Cherries'});
        await user.click(cherriesCheckbox);

        // find and click order button
        const orderButton = screen.getByRole('button', {name: /order/i});
        await user.click(orderButton);

        // check summary information based on order
        const totalScoops = screen.getByRole('heading', { name: /Scoops: R\$/ });
        expect(totalScoops).toHaveTextContent('2,00');

        const totalToppings = screen.getByRole('heading', { name: /Toppings: R\$/ });
        expect(totalToppings).toHaveTextContent('1,50');

        const totalValue = screen.getByRole('heading', { name: /Total: R\$/ });
        expect(totalValue).toHaveTextContent('3,50');

        // accept terms and conditions and click button to confirm order
        const consentCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
        await user.click(consentCheckbox);

        const confirmButton = screen.getByRole('button', { name: /confirm order/i });
        await user.click(confirmButton);

        // confirm order number on confirmation page
        const orderNumber = screen.getByRole('heading', { name: /Your order number is/ });
        expect(orderNumber).toHaveTextContent('12345');

        // click new order button on confirmation page
        const newOrderButton = screen.getByRole('button', { name: /create new order/i });
        await user.click(newOrderButton);

        // check that scoops and toppings subtotals have been reset
        expect(vanillaInput).toBe('0');
        expect(cherriesCheckbox).not.toBeChecked();
    })
})