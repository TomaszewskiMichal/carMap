import Typography from '@mui/material/Typography';

export const ErrorText = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center h-[92%] bg-secondary">
      <Typography variant="h3">
        Something went wrong. Please try again.
      </Typography>
    </div>
  );
};
