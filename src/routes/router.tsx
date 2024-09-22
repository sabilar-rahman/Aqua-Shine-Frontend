// import path from "path";
import { createBrowserRouter } from "react-router-dom";
import RootMain from "./RootMain";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootMain />,  

    }
    
])

export default router;