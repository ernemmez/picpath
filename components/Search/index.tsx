import { Input } from "@material-tailwind/react";
import { Button } from "components/Button";
import SearchIcon from "public/icons/search.svg";
import type { FC } from "react";

const Search: FC = () => {

    return (
        <div className="flex items-center justify-items-start bg-pp-skypale-green rounded">
            <span className="absolute ml-2">
                <SearchIcon />
            </span>
            <Input
                className="w-full relative pl-10 text-sm border-none focus:outline-0 focus:border-none focus:border-top-0 outline-0"
                placeholder="Istanbul, Umraniye"
                icon={
                    <Button
                        className="p-1 text-[10px] w-[53px] h-[25px] bg-pp-secondary-green capitalize absolute right-0"
                    >
                        Search
                    </Button>
                }
            />
        </div>
    )
}

export default Search