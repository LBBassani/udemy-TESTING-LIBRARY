import { createBrowserRouter } from "react-router-dom";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <OrderEntry />
    },
    {
        path: "/summary",
        element: <OrderSummary />
    },
    {
        path: "/confirmation/:orderNumber",
        element: <OrderConfirmation />,
        loader: async ( {params} ) => {
            return params.orderNumber;
        }
    }
])