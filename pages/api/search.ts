// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    data: [
      {
        title: "Mertin Paylaşımı",
        desc: "bu data bir mock datadır",
        userPhotoUrl:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80",
        photoCount: 1,
        lat: 41.03230786303442,
        long: 29.095582132027175,
      },
      {
        title: "Metenin evi",
        desc: "bu data bir mock datadır",
        userPhotoUrl:
          "https://media.licdn.com/dms/image/C4D03AQGRqaYqwG13kA/profile-displayphoto-shrink_200_200/0/1663780867475?e=1683763200&v=beta&t=mZnD4XuRLMkcVma-Ml6yQ3p6qfmSa0PsnwaxzjJp6FI",
        photoCount: 4,
        lat: 41.03397887245836,
        long: 29.09400842122207,
      },
      {
        title: "Erenin Paylaşımı",
        desc: "bu data bir mock datadır",
        userPhotoUrl: "https://avatars.githubusercontent.com/u/85460384?v=4",
        photoCount: 2,
        lat: 41.03045126382676,
        long: 29.101636437671914,
      },
    ],
  });
}
