import React from "react";
import { getAgents } from "@/util/valorant/agents";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "@/Components/valorant/Navbar";
import { useRouter } from "next/router";
var AgentMap = new Map();
function addValueToKey(key, value) {
  // Shorcut || returns left side if it is "truthy," or the right otherwise.
  // This means that we only assign a new Array to the Object's property
  // if it has not previously been used.
  AgentMap[key] = AgentMap[key] || [];
  // Adds a value to the end of the Array
  AgentMap[key].push(value);
}
function mapAgents(json) {
  json.forEach((element) => {
    addValueToKey(element.role.displayName, element);
  });
}

export default function Agents() {
  const [Agents, setAgents] = useState({});
  useEffect(() => {
    //getAgents()
    const agentsJson = getAgents();
    agentsJson.then((json) => {
      setAgents(json);
      console.log(json);
      mapAgents(json);
      // Object.keys(AgentMap).map((e)=>{
      //   Object.keys(AgentMap[e]).map((e1)=>{
      //     console.log(Object.keys(AgentMap[e][e1]))
      //     Object.keys(AgentMap[e][e1]).map( (e2)=>{
      //       console.log(e2)
      //     })

      //   })
      // })
      const data = Object.keys(AgentMap["Sentinel"]);
      console.log(AgentMap);
    });
  }, []);
  const router = useRouter();
  const agentuuid = router.query.slug;
  console.log(router.query.slug);
  return (
    <>
      <Navbar />
      {router.query.slug}
      <div className="flex flex-wrap">
        {Object.keys(AgentMap).map((key) => {
          return (
            <div
              key={key}
              className="bg-zinc-900 m-5 p-3 gap-3  rounded-lg text-white"
            >
              <div className="Role_block  ">
                <div className="Role_Details">
                  <div className="flex gap-3">
                    <img
                      src={AgentMap[key][0].role.displayIcon}
                      height="50"
                      width="50"
                    ></img>
                    <h1 className="text-3xl self-center">{key + "s"}</h1>
                  </div>
                  <div className="self-end m-3">
                    {" "}
                    {AgentMap[key][0].role.description}{" "}
                  </div>
                </div>
              </div>

              <div className="Agent_List flex flex-wrap gap-3">
                {Object.keys(AgentMap[key]).map((index) => {
                  return (
                    <div key={index} className="flex flex-wrap">
                    <div
                      
                      className="grid grid-cols-6 gap-3 flex-wrap w-72 bg-black p-3 rounded-xl justify-between"
                    >
                      <div className="col-span-2">
                            <img
                            src={AgentMap[key][index].displayIcon}
                            className="bg-white rounded-xl h-16"
                          ></img>
                          
                      </div>

                      <div className="flex flex-wrap col-span-4 gap-3">
                        <img
                          src={AgentMap[key][index].role.displayIcon}
                          className=" rounded-xl h-9 w-9"
                          
                        ></img>
                        <div>{AgentMap[key][index].displayName}</div>
                        {AgentMap[key][index].description}
                      </div>

                    </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
