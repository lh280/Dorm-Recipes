import PropTypes from "prop-types";
import { Toolbar, Typography, Avatar, Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import UserShape from "./UserShape";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";


export default function Header({ setCurrentRecipe, currentUser, viewAccount}) {
  const router = useRouter();

  const goToAccount = () => {
    viewAccount(currentUser.user_id);
  };
  const goHome = () => {
    setCurrentRecipe();
  };
  const handleSearch = (q) => {
    router.push(`/search?q=${q}`); 
  };
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
      <Typography
        variant="h5" 
        component="div"
        sx={{
          cursor: "pointer",
          color: "white", 
          marginRight: 4
        }}
        onClick={goHome}
      >
        Dorm Recipes
      </Typography>
      <SearchBar onSearch={handleSearch}/>
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
      </Box>
    </Toolbar>
  );
}

Header.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  currentUser: UserShape,
  viewAccount: PropTypes.func
};
