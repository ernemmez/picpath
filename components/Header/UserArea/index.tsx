import Image from "next/image";
import UserIcon from "public/icons/user-icon-desktop.svg";
import type { FC } from "react";

interface IUserArea {
    user: {
        username: string;
        profileUrl: string;
        avatarUrl: string;
        darkMode: boolean;
    }
}

const UserArea: FC<IUserArea> = ({ user }) => {

    return (
        <div className="cursor-pointer border-l-2 pl-4 ml-4" onClick={() => alert('show user dropdown')}>
            {user?.avatarUrl ?
                <Image
                    src="/icons/user-icon.png"
                    width={40}
                    height={40}
                    alt="Picpath" // username?
                    className="border rounded p-1"
                />
                :
                <div className="w-[40px] h-[40px]">
                    <UserIcon className="w-full h-full" />
                </div>
            }
        </div>
    )
}

export default UserArea