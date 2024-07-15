import { render, screen } from "@testing-library/react";
import OrderEntry from "../../pages/entry/OrderEntry";
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import { describe, expect } from "vitest";

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