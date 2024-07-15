import { render, screen } from '../utils/testing-library-utils'
import Options from '../../pages/entry/Options'
import { describe, expect, test } from 'vitest'

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