import Typography from '@mui/material/Typography';

export const NavBar = (): JSX.Element => {
  return (
    <div className="flexitems-center h-[8%] bg-blue">
      <Typography
        className="flex justify-center w-full"
        align="center"
        variant="h4"
      >
        Rent and Ride
      </Typography>
    </div>
  );
};
