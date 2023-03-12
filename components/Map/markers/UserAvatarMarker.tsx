import Image from "next/image";
import { FC } from "react";

interface Types {
    userPhotoUrl: string;
}

const UserAvatarMarker: FC<Types> = ({ userPhotoUrl }) => {
    return (
        <Image
            src={userPhotoUrl}
            alt="Picpath"
            width={40}
            height={40}
            className="border-2 border-pp-link rounded-full drop-shadow-2xl z-[101] animate-bounce transition duration-150 ease-out hover:ease-in cursor-pointer"
        />
    )
}

export {
    UserAvatarMarker
};

