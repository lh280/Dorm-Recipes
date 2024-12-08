import PropTypes from "prop-types";
import { Toolbar, Typography, Avatar} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import UserShape from "./UserShape";

export default function Header({ setCurrentRecipe, currentUser, viewAccount}) {
  const goToAccount = () => {
    viewAccount(currentUser.user_id);
  };
  const goHome = () => {
    setCurrentRecipe();
  };
  return (
    <Toolbar sx={{ bgcolor: grey.A700, paddingY: 2, minHeight: 100 }}>
      <Typography
        variant="h5" 
        component="div"
        sx={{
          flexGrow: 1,
          cursor: "pointer",
          color: "white", 
        }}
        onClick={goHome}
      >
        Dorm Recipes
      </Typography>

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
    </Toolbar>
  );
}

Header.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  currentUser: UserShape,
  viewAccount: PropTypes.func
};
