import CircularProgress from '@mui/material/CircularProgress';

export const Loader = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center h-[92%] bg-yellow">
      <div className=" flex justify-center items-center">
        <CircularProgress color="primary" />
      </div>
    </div>
  );
};
