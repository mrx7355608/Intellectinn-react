import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./utils/theme";
import AuthProvider from "./context/auth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <AuthProvider>
            <App />
        </AuthProvider>
    </ChakraProvider>
);
