import MainLayout from "@/layouts/main-layout";
import HomePage from "@/pages/home-page";
import SubjectsPage from "@/pages/subjects-page";
import TimeTable from "@/pages/time-table";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                element: <HomePage />,
                path: "/",
            },
            {
                element: <SubjectsPage />,
                path: "/subjects"
            },
            {
                element: <TimeTable />,
                path: "/timetable"
            }
        ]
    }
])

export default routes;