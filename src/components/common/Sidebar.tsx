import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Box,
  Flex,
  Tooltip,
  IconButton,
  Avatar,
  Text,
  Separator,
} from "@radix-ui/themes";
import {
  DashboardIcon,
  FileTextIcon,
  GearIcon,
  ChatBubbleIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import { useAuth } from "../../contexts/AuthContext";
import { AuthApiService } from "../../services/api/auth.api";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = async () => {
    try {
      await AuthApiService.signout();
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon width="20" height="20" />, path: "/dashboard" },
    { label: "Notebooks", icon: <FileTextIcon width="20" height="20" />, path: "/notebooks" },
  ];

  const bottomItems = [
    { label: "Settings", icon: <GearIcon width="20" height="20" />, path: "/settings" },
  ];

  return (
    <Box
      style={{
        width: isCollapsed ? "64px" : "240px",
        height: "100vh",
        backgroundColor: "#2e1065", // Deep purple from reference
        transition: "width 0.3s ease",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #4c1d95",
        flexShrink: 0,
        color: "white",
      }}
    >
      <Flex direction="column" height="100%" p="3" align={isCollapsed ? "center" : "stretch"}>
        {/* Logo / Brand */}
        <Flex justify={isCollapsed ? "center" : "between"} align="center" mb="5">
            <Box
                style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "white",
                    cursor: "pointer"
                }}
                onClick={() => navigate("/dashboard")}
            >
                A
            </Box>
            {!isCollapsed && (
                <Text weight="bold" size="3" style={{ color: "white", marginLeft: "10px" }}>
                    AdlerOne
                </Text>
            )}
             {!isCollapsed && (
                <IconButton
                    size="1"
                    variant="ghost"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <DoubleArrowLeftIcon />
                </IconButton>
            )}
        </Flex>
        
        {isCollapsed && (
             <IconButton
                size="1"
                variant="ghost"
                style={{ color: "rgba(255,255,255,0.7)", marginBottom: "20px" }}
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <DoubleArrowRightIcon />
            </IconButton>
        )}

        {/* Navigation Items */}
        <Flex direction="column" gap="4" style={{ flex: 1 }}>
          {menuItems.map((item) => (
            <Tooltip key={item.path} content={isCollapsed ? item.label : undefined} side="right">
              <Box
                onClick={() => navigate(item.path)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: location.pathname.startsWith(item.path)
                    ? "rgba(255, 255, 255, 0.15)"
                    : "transparent",
                  color: location.pathname.startsWith(item.path)
                    ? "white"
                    : "rgba(255, 255, 255, 0.7)",
                  transition: "all 0.2s",
                  justifyContent: isCollapsed ? "center" : "flex-start",
                }}
              >
                {item.icon}
                {!isCollapsed && (
                  <Text size="2" ml="3">
                    {item.label}
                  </Text>
                )}
              </Box>
            </Tooltip>
          ))}
        </Flex>
        
        {/* Divider */}
         <Separator size="4" style={{ backgroundColor: "rgba(255,255,255,0.1)", margin: "10px 0" }} />


        {/* Bottom Section */}
        <Flex direction="column" gap="4">
             {/* Settings */}
             {bottomItems.map((item) => (
                <Tooltip key={item.path} content={isCollapsed ? item.label : undefined} side="right">
                <Box
                    onClick={() => navigate(item.path)}
                    style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                     backgroundColor: location.pathname.startsWith(item.path)
                        ? "rgba(255, 255, 255, 0.15)"
                        : "transparent",
                    color: "rgba(255, 255, 255, 0.7)",
                    justifyContent: isCollapsed ? "center" : "flex-start",
                    }}
                >
                    {item.icon}
                    {!isCollapsed && (
                    <Text size="2" ml="3">
                        {item.label}
                    </Text>
                    )}
                </Box>
                </Tooltip>
            ))}

             {/* Profile / Chat (Placeholder from image) */}
             <Tooltip content={isCollapsed ? "Messages" : undefined} side="right">
                <Box
                    style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    color: "rgba(255, 255, 255, 0.7)",
                    justifyContent: isCollapsed ? "center" : "flex-start",
                    }}
                >
                    <ChatBubbleIcon width="20" height="20" />
                    {!isCollapsed && (
                    <Text size="2" ml="3">
                        Messages
                    </Text>
                    )}
                </Box>
            </Tooltip>

             {/* User Profile */}
            <Tooltip content={"User Profile"} side="right">
                <Flex
                    align="center"
                    justify={isCollapsed ? "center" : "between"}
                    style={{
                        padding: "8px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        marginTop: "10px",
                        cursor: "pointer"
                    }}
                    onClick={() => navigate("/profile")}
                >
                    <Avatar
                        size="2"
                        src={undefined}
                        fallback={"U"}
                        radius="full"
                    />
                    {!isCollapsed && (
                         <Box ml="3" style={{ overflow: "hidden" }}>
                            <Text size="1" weight="bold" style={{ color: "white", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {"User"}
                            </Text>
                         </Box>
                    )}
                     {!isCollapsed && (
                        <IconButton size="1" variant="ghost" color="gray" onClick={(e) => { e.stopPropagation(); handleLogout(); }}>
                            <ExitIcon />
                        </IconButton>
                     )}
                </Flex>
            </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
