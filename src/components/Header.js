import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { Toolbar, Typography, Avatar, Box, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image"
import { blue } from "@mui/material/colors";
import SearchBar from "@/components/SearchBar";
import UserShape from "./UserShape";
import LoginWidget from "./LoginWidget";


export default function Header({ setCurrentRecipe, currentUser, viewAccount }) {
  const router = useRouter();

  const goToAccount = () => {
    if (viewAccount) {
      viewAccount(currentUser.user_id);
    } else {
      // eslint-disable-next-line no-console
      console.error("viewAccount function not provided");
    }
  };
  const goHome = () => {
    setCurrentRecipe();
  };
  const handleSearch = (q) => {
    router.push(`/search?q=${q}`);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Box onClick={goHome} sx={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer", mr: 1 }}>
          <Image src="/favicon.ico" alt="Dorm Recipes Logo" width={32} height={32} />
        </Box>
      ) : (
        <Box onClick={goHome} sx={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer", mr: 1 }}>
          <Image src="/favicon.ico" alt="Dorm Recipes Logo" width={32} height={32} />
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: "white",
              marginRight: 1,
              marginLeft: 2
            }}
          >
            Dorm Recipes
          </Typography>
        </Box>
      )}

      <SearchBar onSearch={handleSearch} />

      <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
        <Avatar
          onClick={goToAccount}
          sx={{
            width: 50,
            height: 50,
            bgcolor: blue[100],
            cursor: "pointer",
            border: "2px solid white",
          }}
        >
          {currentUser.user_id}
        </Avatar>
        <LoginWidget />
      </Box>
    </Toolbar>
  );
}

Header.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  currentUser: UserShape,
  viewAccount: PropTypes.func
};
