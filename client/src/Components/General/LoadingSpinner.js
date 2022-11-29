import { Oval } from  'react-loader-spinner';

function LoadingSpinner() {
    return (
        <div className="flex flex-row min-h-screen justify-center items-center">
            <Oval
                className="bg-red-500"
                height={80}
                width={80}
                color="grey"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="lightgrey"
                strokeWidth={3}
                strokeWidthSecondary={3}
            />
        </div>
    );
}

export default LoadingSpinner;