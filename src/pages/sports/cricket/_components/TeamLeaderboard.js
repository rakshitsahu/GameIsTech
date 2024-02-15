import React from "react";
import { useState } from "react";
function TeamLeaderboard() {
  const headings = [
    "POS",
    "TEAM",
    "P",
    "W",
    "L",
    "NR",
    "NRR",
    "FOR",
    "AGAINST",
    "PTS",
  ];
  const teamsDetails = [
    {
      IMAGE:
        "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Logooutline/GToutline.png",
      NAME: "GT",
      P: 14,
      W: 10,
      L: 4,
      NR: 0,
      NRR: 0.809,
      FOR: "2450/268.1",
      AGAINST: "2326/279.2",
      PTS: 20,
    },
    {
      IMAGE:
        "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Logooutline/GToutline.png",
      NAME: "GT",
      P: 14,
      W: 10,
      L: 4,
      NR: 0,
      NRR: 0.809,
      FOR: "2450/268.1",
      AGAINST: "2326/279.2",
      PTS: 20,
    },
    {
      IMAGE:
        "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Logooutline/GToutline.png",
      NAME: "GT",
      P: 14,
      W: 10,
      L: 4,
      NR: 0,
      NRR: 0.809,
      FOR: "2450/268.1",
      AGAINST: "2326/279.2",
      PTS: 20,
    },
    {
      IMAGE:
        "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Logooutline/GToutline.png",
      NAME: "GT",
      P: 14,
      W: 10,
      L: 4,
      NR: 0,
      NRR: 0.809,
      FOR: "2450/268.1",
      AGAINST: "2326/279.2",
      PTS: 20,
    },
    {
      IMAGE:
        "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Logooutline/GToutline.png",
      NAME: "GT",
      P: 14,
      W: 10,
      L: 4,
      NR: 0,
      NRR: 0.809,
      FOR: "2450/268.1",
      AGAINST: "2326/279.2",
      PTS: 20,
    },
  ];
  const [index, setIndex] = useState(0);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right  ">
        <thead className="text-xs  uppercase  bg-blue-600  sm: text-white">
          <tr>
            <th
              key={index}
              scope="col"
              className={`px-6 py-3 ${
                index >= headings.length - 3 ? "sr-only" : ""
              }`}
            >
              POS
            </th>
            <th
              key={index}
              scope="col"
              className={`px-6 py-3 ${
                index >= headings.length - 3 ? "sr-only" : ""
              }`}
            >
              Name
            </th>
            <th
              key={index}
              scope="col"
              className={`px-6 py-3 ${
                index >= headings.length - 3 ? "sr-only" : ""
              }`}
            >
              P
            </th>
            <th
              key={index}
              scope="col"
              className={`px-6 py-3 ${
                index >= headings.length - 3 ? "sr-only" : ""
              }`}
            >
              W
            </th>
            <th
              key={index}
              scope="col"
              className={`px-6 py-3 ${
                index >= headings.length - 3 ? "sr-only" : ""
              }`}
            >
              L
            </th>
            <th
              key={index}
              scope="col"
              className={`px-6 py-3 ${
                index >= headings.length - 3 ? "sr-only" : ""
              }`}
            >
              NR
            </th>
            <th
              key={index}
              scope="col"
              className={`px-6 py-3 ${
                index >= headings.length - 3 ? "sr-only" : ""
              }`}
            >
              NRR
            </th>

            <th
              key={index}
              scope="col"
              className={`px-6 py-3 ${
                index >= headings.length - 3 ? "sr-only" : ""
              } sr-only md:sr-only lg:not-sr-only xl:not-sr-only`}
            >
              FOR
            </th>
            <th
              key={index}
              scope="col"
              className={`px-6 py-3 ${
                index >= headings.length - 3 ? "sr-only" : ""
              } sr-only md:sr-only lg:not-sr-only xl:not-sr-only`}
            >
              AGAINST
            </th>
            <th
              key={index}
              scope="col"
              className={`px-6 py-3 ${
                index >= headings.length - 3 ? "sr-only" : ""
              } sr-only md:sr-only lg:not-sr-only xl:not-sr-only`}
            >
              PTS
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-400">
          {teamsDetails.map((teamsDetail, index) => {
            // console.log(index)
            return (
              <tr
                key={index}
                className=" odd:bg-gray-900  even:bg-gray-800 border-b border-gray-700"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  <div className="h-14 w-14 rounded-full bg-yellow-200 flex">
                    <img src={`${teamsDetail.IMAGE}`} />
                    <font
                      className={`flex self-center ml-2 ${
                        index == 0 ? "text-yellow-500" : ""
                      }`}
                    >
                      {teamsDetail.NAME}
                    </font>
                  </div>
                </th>

                <td className="px-6 py-4">{teamsDetail.P}</td>
                <td className="px-6 py-4">{teamsDetail.W}</td>
                <td className="px-6 py-4">{teamsDetail.L}</td>
                <td className="px-6 py-4">{teamsDetail.NR}</td>
                <td className="px-6 py-4">{teamsDetail.NRR}</td>
                <td className="px-6 py-4 sr-only md:sr-only lg:not-sr-only xl:not-sr-only">
                  {teamsDetail.FOR}
                </td>
                <td className="px-6 py-4 sr-only md:sr-only lg:not-sr-only xl:not-sr-only">
                  {teamsDetail.AGAINST}
                </td>
                <td className="px-6 py-4 sr-only md:sr-only lg:not-sr-only xl:not-sr-only">
                  {teamsDetail.PTS}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TeamLeaderboard;
