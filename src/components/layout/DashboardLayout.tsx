import { Flex, Box } from "@radix-ui/themes";
import { Outlet } from "react-router";
import Sidebar from "../common/Sidebar";

const DashboardLayout = () => {
    return (
        <Flex style={{ height: "100vh", overflow: "hidden" }}>
            {/* GLOBAL SIDEBAR */}
            <Sidebar />
            
            {/* CONTENT AREA */}
            <Box style={{ flex: 1, overflow: "auto", background: "var(--gray-1)" }}>
                <Outlet />
            </Box>
        </Flex>
    );
};

export default DashboardLayout;
