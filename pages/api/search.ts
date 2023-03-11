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
        lat: 37.575275,
        long: 36.922821,
      },
      {
        title: "Mertin evi",
        desc: "bu data bir mock datadır",
        lat: 40.193298,
        long: 29.074202,
      },
      {
        title: "Metenin evi",
        desc: "bu data bir mock datadır",
        lat: 38.734802,
        long: 35.467987,
      },
      {
        title: "Anılın evi",
        desc: "bu data bir mock datadır",
        lat: 36.200001,
        long: 36.166668,
      },
    ],
  });
}
