 import path from "path";
import { createBrowserRouter } from "react-router-dom";
import RootMain from "./RootMain";
import Dashboard from "@/pages/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootMain />, 
        children: [
            {path:'dashboard',
                element:<Dashboard/>
            }
        ], 

    }
    
])

export default router;