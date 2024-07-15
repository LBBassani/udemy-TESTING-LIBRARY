import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../../contexts/OrderDetails";

const contextRender = (ui, options) => render(ui, {wrapper: OrderDetailsProvider, ...options});

export * from '@testing-library/react';

export { contextRender as render };