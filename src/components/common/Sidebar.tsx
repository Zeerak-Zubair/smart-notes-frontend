import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Box,
  Flex,
  Tooltip,
  Avatar,
  Separator,
  DropdownMenu,
} from "@radix-ui/themes";
import {
  DashboardIcon,
  FileTextIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import { useAuth } from "../../contexts/AuthContext";
import { AuthApiService } from "../../services/api/auth.api";
import { ProfileApiService, type Profile } from "../../services/api/profile.api";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  
  // Collapsible feature removed
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await ProfileApiService.getCurrentProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

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
    { label: "Notes", icon: <Pencil1Icon width="20" height="20" />, path: "/notes" },
  ];

  // Settings removed as per request

  return (
    <Box
      style={{
        width: "64px",
        height: "100vh",
        backgroundColor: "var(--sidebar-bg)",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid var(--sidebar-border)",
        flexShrink: 0,
        color: "var(--sidebar-text)",
      }}
    >
      <Flex direction="column" height="100%" p="3" align="center">
        {/* Logo / Brand */}
        <Flex justify="center" align="center" mb="5">
            <Flex align="center" style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
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
                    }}
                >
                    SN
                </Box>
            </Flex>
        </Flex>

        {/* Navigation Items */}
        <Flex direction="column" gap="4" style={{ flex: 1, width: "100%" }}>
          {menuItems.map((item) => (
            <Tooltip key={item.path} content={item.label} side="right">
              <Box
                onClick={() => navigate(item.path)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: location.pathname.startsWith(item.path)
                    ? "var(--sidebar-hover)"
                    : "transparent",
                  color: location.pathname.startsWith(item.path)
                    ? "var(--sidebar-text)"
                    : "var(--sidebar-text-muted)",
                  transition: "all 0.2s",
                }}
              >
                {item.icon}
              </Box>
            </Tooltip>
          ))}
        </Flex>
        
        {/* Divider */}
         <Separator size="4" style={{ backgroundColor: "var(--sidebar-hover)", margin: "10px 0" }} />


        {/* Bottom Section */}
        <Flex direction="column" gap="4" style={{ width: "100%" }}>
             {/* User Profile */}
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <div style={{ outline: 'none', width: '100%' }}>
                        <Flex
                            align="center"
                            justify="center"
                            style={{
                                padding: "8px",
                                borderRadius: "8px",
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                marginTop: "10px",
                                cursor: "pointer"
                            }}
                        >
                            <Avatar
                                size="2"
                                src={profile?.avatar_url || undefined}
                                fallback={profile?.name?.charAt(0).toUpperCase() || "U"}
                                radius="full"
                            />
                        </Flex>
                    </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item onSelect={() => navigate("/profile")}>
                        Edit Profile Picture
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item color="red" onSelect={handleLogout}>
                        Log Out
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
