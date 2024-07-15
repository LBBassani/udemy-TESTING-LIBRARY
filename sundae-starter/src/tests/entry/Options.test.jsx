import { render, screen } from '../utils/testing-library-utils'
import Options from '../../pages/entry/Options'
import { describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('Testing options display', () => {
    test('displays image for each scoop option', async () => {
        render(<Options optionType="scoops"/>);

        const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});
        expect(scoopImages).toHaveLength(2);

        const altText = scoopImages.map((element) => element.alt);
        expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
    })

    test('display image for each topping option', async () => {
        render(<Options optionType="toppings" />);

        const toppingsImages = await screen.findAllByRole('img', {name:/topping$/i});
        expect(toppingsImages).toHaveLength(3);

        const altText = toppingsImages.map((element) => element.alt);
        expect(altText).toEqual(['Cherries Topping', 'M&Ms Topping', 'Hot fudge Topping']);
    })
})

describe('Testing total updates', () => {
    const user = userEvent.setup();
    
    test('updates scoops subtotal when scoops updates', async () => {
        render(<Options optionType="scoops" />);

        // confere se o total começa com R$0,00
        const scoopsSubtotal = screen.getByText('Scoops total: R$', {exact: false});
        expect(scoopsSubtotal).toHaveTextContent('0,00');

        // atualiza as bolas (scoops) de "vanilla" para 1 e checa novo valor
        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '1');
        expect(scoopsSubtotal).toHaveTextContent('2,00');

        // atualiza as bolas (scoops) de "chocolate" para 2 e checa novo valor
        const chocholateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
        await user.clear(chocholateInput);
        await user.type(chocholateInput, '2');
        expect(scoopsSubtotal).toHaveTextContent('6,00');
    })
})