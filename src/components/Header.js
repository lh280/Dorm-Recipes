import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";

import { Toolbar, Typography, Avatar, Box, Tooltip, useTheme, useMediaQuery } from "@mui/material";
import { blue } from "@mui/material/colors";
import Image from "next/image";

import SearchBar from "@/components/SearchBar";
import LoginWidget from "./LoginWidget";


export default function Header({ setCurrentRecipe, viewAccount }) {
  const { data: session, status } = useSession();
  const disabled = status !== "authenticated";
  const router = useRouter();

  const goToAccount = () => {
    if (disabled) {
      return;
    }
    if (viewAccount) {
      localStorage.removeItem("hasReloaded");
      viewAccount(session.user.id);
    } else {
      // eslint-disable-next-line no-console
      console.error("viewAccount function not provided");
    }
  };
  const goHome = () => {
    localStorage.removeItem("hasReloaded");
    setCurrentRecipe();
  };
  const handleSearch = (q) => {
    localStorage.removeItem("hasReloaded");
    router.push(`/search?q=${q}`);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const avatarSymbol = (
    <Image src="/avatar-icon.svg" width={40} height={40} alt="User icon"/>
  );

  const avatarRender = status !== "authenticated" ? avatarSymbol : session?.user?.email?.[0] || avatarSymbol;
  const msg = status !== "authenticated" ? "Sign in to view user page" : "";

  return (
    <Toolbar sx={{
      bgcolor: '#201f54',
      paddingY: 2,
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100px',
      margin: '0 auto',
      width: '100%',
      zIndex: 1100,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>

      {isMobile ? (
        <Box onClick={goHome} sx={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer", mr: 1 }} displayPrint="none">
          <Image src="/favicon.ico" alt="Dorm Recipes Logo" width={32} height={32} />
        </Box>
      ) : (
        <Box onClick={goHome} sx={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer", mr: 1 }} displayPrint="none">
          <Image src="/favicon.ico" alt="Dorm Recipes Logo" width={32} height={32} />
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: "white",
              marginRight: 1,
              marginLeft: 2
            }}
          >Dorm Recipes</Typography>
        </Box>
      )}
      
      <Box displayPrint="none">
        <SearchBar onSearch={handleSearch}/>
      </Box>
      
      <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }} displayPrint="none">
        <Box spacing={1} align="center">
          <Tooltip title={msg} slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [-110, -50],
                  },
                },
              ],
            },
          }}>
            <span>
              <Avatar
                onClick={goToAccount}
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: blue[100],
                  cursor: msg ? "default" : "pointer",
                  border: "2px solid white",
                  color: "black",
                  marginTop: 1.45
                }}>
                {avatarRender}
              </Avatar>
            </span>
          </Tooltip>
          <LoginWidget />
        </Box>
      </Box>
    </Toolbar>
  );
}

Header.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  viewAccount: PropTypes.func
};
