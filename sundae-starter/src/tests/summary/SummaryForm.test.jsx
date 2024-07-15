import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest'
import SummaryForm from '../../pages/summary/SummaryForm';


describe('Testing summary form', () => {
    const user = userEvent.setup();
    
    /* testa se ao inicio o botão está desabilitado e a checkbox está desmarcada
     * testa se ao concordar com os termos o botão de envio do formulário é habilitado 
     */
    test('Agreement checkbox enables submit button', async () =>{
        render(<SummaryForm />);
        const consentCheckbox = screen.getByRole('checkbox', {name: /terms and conditions/i});
        const submitButton = screen.getByRole('button', {name: /confirm order/i});

        expect(consentCheckbox).not.toBeChecked();
        expect(submitButton).toBeDisabled();

        await user.click(consentCheckbox);

        expect(consentCheckbox).toBeChecked();
        expect(submitButton).toBeEnabled();

        await user.click(consentCheckbox);
    
        expect(consentCheckbox).not.toBeChecked();
        expect(submitButton).toBeDisabled();
    });

    /* testa se a mensagem com os termos estão aparecendo
     * e desaparecendo da tela
     */
    test('Agreement popover shows and hides on mouse hover', async () => {
        render(<SummaryForm />);

        const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
        expect(nullPopover).not.toBeInTheDocument();

        const consentText = screen.getByText(/terms and conditions/i);
        await user.hover(consentText);
        const popover = screen.getByText(/no ice cream will actually be delivered/i);
        expect(popover).toBeInTheDocument();

        await user.unhover(consentText);
        expect(popover).not.toBeInTheDocument();

    });
});