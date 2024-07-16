import { render, screen } from '../utils/testing-library-utils';
import OrderEntry from "../../pages/entry/OrderEntry";
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import { describe, expect, test } from "vitest";
import userEvent from '@testing-library/user-event';

describe('Testing order entry', () => {
    
    test('error handling', async () => {
        server.resetHandlers(
            http.get('http://localhost:3030/scoops', () => {
                return new HttpResponse(null, {status:500});
            }),
            http.get('http://localhost:3030/toppings', () => {
                return new HttpResponse(null, {status:500});
            })
        );

        render(<OrderEntry />);
        
        const alerts = await screen.findAllByText(/unexpected error occurred/i);
        expect(alerts).toHaveLength(2);

    })

    test.skip('Alert does not have name in react-bootstrap!', async () => {

        server.resetHandlers(
            http.get('http://localhost:3030/scoops', () => {
                return new HttpResponse(null, {status:500});
            }),
            http.get('http://localhost:3030/toppings', () => {
                return new HttpResponse(null, {status:500});
            })
        );

        render(<OrderEntry />);
        
        const alerts = await screen.findAllByRole('alert', {name: /unexpected error occurred/i});
    })
});

describe('Order total value', () => {
    const user = userEvent.setup();
    
    test('Total starts at R$0,00', () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', {name: /Total to pay: R\$/});
        expect(grandTotal).toHaveTextContent('0,00');
    })

    test('Update total if scoops are added first', async () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', {name: /Total to pay: R\$/});

        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '2');
        expect(grandTotal).toHaveTextContent('4,00');

        const cherriesCheckbox = await screen.findByRole('checkbox', {name: 'Cherries'});
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('5,50');
    })

    test('Update total if toppings are added first', async () =>{
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', {name: /Total to pay: R\$/});

        const cherriesCheckbox = await screen.findByRole('checkbox', {name: 'Cherries'});
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('1,50');

        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '2');
        expect(grandTotal).toHaveTextContent('5,50');
    })

    test('Update total if item is removed', async () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', {name: /Total to pay: R\$/});

        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
        const cherriesCheckbox = await screen.findByRole('checkbox', {name: 'Cherries'});
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '2');
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('5,50');

        await user.clear(vanillaInput);
        await user.type(vanillaInput, '1');
        expect(grandTotal).toHaveTextContent('3,50');

        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('2,00');
    })

})