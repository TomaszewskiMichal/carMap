import Typography from '@mui/material/Typography';

export const NavBar = (): JSX.Element => {
  return (
    <div className="flexitems-center h-[8%] bg-primary">
      <Typography
        className="flex justify-center items-center w-full h-full text-secondary"
        align="center"
        variant="h4"
      >
        RENT AND RIDE
      </Typography>
    </div>
  );
};
