import { Watch } from "react-loader-spinner";

const LoaderSpinner = () => {
    return (
        <div className="flex justify-center items-center min-h-dvh">
          <Watch
            visible={true}
            height="80"
            width="80"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      );
  
};

export default LoaderSpinner;
