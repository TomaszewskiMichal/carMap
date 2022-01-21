import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Typography from '@mui/material/Typography';

export const NavBar = (): JSX.Element => {
  return (
    <div className="flex p-2 items-center h-[8%] bg-blue">
      <Typography
        className="flex justify-center w-full"
        align="center"
        variant="h6"
      >
        FIND YOUR WAY HOME
      </Typography>
      <div>
        <Button
          color="secondary"
          variant="contained"
          aria-label="Filter button"
        >
          <FilterAltIcon />
        </Button>
      </div>
    </div>
  );
};
