import {createRoot} from "react-dom/client";
import {App} from "./components/App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {StrictMode, Suspense} from "react";

import {AboutLazy}  from "./pages/About.lazy";

const root = document.getElementById('root');

if (!root) {
    throw new Error('root not found');
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/about',
                element: <Suspense fallback={'loading...'}>
                    <AboutLazy />
                </Suspense>
            }
        ]
    },
]);

const container = createRoot(root);

container.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)