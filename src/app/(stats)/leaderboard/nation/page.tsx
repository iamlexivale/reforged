"use client";

import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/navigation";
import { formatNumber } from "@/components/FormatCoins";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const router = useRouter();

  const { data: nations } = useSWR(
    "https://api.reforged.world/v1/leaderboard/nations",
    fetcher,
  );

  return (
    <table className="w-full table-auto border border-slate-800">
      <thead className="bg-slate-900">
        <tr>
          <th className="py-2 pl-8 text-center font-sans text-sm font-medium text-white opacity-75">
            No
          </th>
          <th className="py-2 pl-8 text-left font-sans text-sm font-medium text-white opacity-75">
            Nation
          </th>
          <th className="py-2 pl-8 text-left font-sans text-sm font-medium text-white opacity-75">
            Coins
          </th>
        </tr>
      </thead>
      <tbody>
        {nations?.nations?.map((value: any, index: any) => (
          <tr
            key={index + 1}
            className="hover:cursor-pointer hover:bg-slate-800"
            onClick={() => router.push(`/stats/nation/${value?.nation}`)}
          >
            <td className="w-0 py-2 pl-8 text-center font-sans text-sm font-normal text-white">
              {index + 1}.
            </td>
            <td className="py-2 pl-8 text-left font-sans text-sm font-normal text-white">
              {value?.nation}
            </td>
            <td className="py-2 pl-8 text-left font-sans text-sm font-normal text-white">
              {formatNumber(value?.coins)} coins
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Page;
