import { FC } from "react";

interface Types {
    data: any;
}

const ResultCard: FC<Types> = ({ data }) => {
    console.log('eren -->', data);
    return (
        <div className="bg-white w-[400px] p-4 rounded absolute z-[9999]">
            <h2></h2>
        </div>
    )
}

export {
    ResultCard
};

