import PropTypes from "prop-types";
import { Toolbar, Typography ,Avatar} from "@mui/material";
import { blue, grey } from "@mui/material/colors";

export default function Header({ setCurrentRecipe, currentUser }) {
  const goToAccount = () => {
    // send user to acount view
  };
  const goHome = () => {
    setCurrentRecipe();
  };
  return (
    <div>
      <Toolbar sx = {{bgcolor:grey.A700}}>
        <Typography variant = "h1" component="div" sx={{ flexGrow: 1 }} onClick={goHome}>Dorm Recipes</Typography>
        <Avatar onClick={goToAccount} sx={{ width: 65, height: 65, bgcolor: blue[100] }}>{currentUser}</Avatar>
      </Toolbar>
    </div>
  );
}

Header.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  currentUser: PropTypes.string
};
