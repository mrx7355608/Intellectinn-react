import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./utils/theme";
import AuthProvider from "./context/auth.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ChakraProvider theme={theme}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ChakraProvider>,
);
