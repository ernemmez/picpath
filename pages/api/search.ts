// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: [
    {
      title: string;
      desc: string;
      lat: number;
      long: number;
    },
    {
      title: string;
      desc: string;
      lat: number;
      long: number;
    },
    {
      title: string;
      desc: string;
      lat: number;
      long: number;
    },
    {
      title: string;
      desc: string;
      lat: number;
      long: number;
    }
  ];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    data: [
      {
        title: "Erenin evi",
        desc: "bu data bir mock datadır",
        lat: 34.17153242656043,
        long: 89.28134762062184,
      },
      {
        title: "Mertin evi",
        desc: "bu data bir mock datadır",
        lat: 41.03230786303442,
        long: 29.095582132027175,
      },
      {
        title: "Metenin evi",
        desc: "bu data bir mock datadır",
        lat: 41.03397887245836,
        long: 29.09400842122207,
      },
      {
        title: "Anılın evi",
        desc: "bu data bir mock datadır",
        lat: 41.03045126382676,
        long: 29.101636437671914,
      },
    ],
  });
}
