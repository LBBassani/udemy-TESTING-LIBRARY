import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <RouterProvider router={router} />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
