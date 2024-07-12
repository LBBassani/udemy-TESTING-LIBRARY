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
});