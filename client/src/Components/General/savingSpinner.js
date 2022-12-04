import { Oval } from  'react-loader-spinner';

function SavingSpinner(props) {
    return (
        <div
            className="flex items-center w-80 h-fit mt-2 px-2 py-2 rounded-md border-4 bg-white border-white shadow-lg text-lg"
        >
            <div className="text-2xl mr-1">
                <Oval
                    height={20}
                    width={20}
                    color="grey"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="lightgrey"
                    strokeWidth={5}
                    strokeWidthSecondary={5}
                />
            </div>
            Сохранение...
        </div>
    );
}

export default SavingSpinner;