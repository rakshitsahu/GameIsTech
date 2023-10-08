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
export async function getServerSideProps(){
  const response = await axios.get( `https://apkhub.mobi/api/valorant/agents` , {
    params: {
      isPlayableCharacter: true
    }
  } )
  console.log("agents data response is", response.data.data)
  const json = response.data.data

  return { props: { json } }
}
export default function Agents({json}) {
  const [Agents, setAgents] = useState([]);
  // console.log( 'the response of gameistech is ', json)
  // console.log('the agentsjsoj  is', json)
      // setAgents(json);
      // console.log(json);
      mapAgents(json);

      const data = Object.keys(AgentMap["Sentinel"]);
      // console.log(AgentMap);
      return (
        <>
          <Navbar />

          <div className="flex flex-wrap justify-center">
            {Object.keys(AgentMap).map((key) => {
              return (
                <div
                  key={key}
                  className="bg-zinc-900 w-10/12 m-5 p-3 gap-3 rounded-lg text-white"
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
                          
                          className="gap-3 flex-wrap w-72 bg-black p-3 rounded-xl justify-between"
                        >
                          <div className="flex gap-3">
                                <img
                                src={AgentMap[key][index].displayIcon}
                                className="bg-white rounded-xl h-16"
                              ></img>
                              <img
                              src={AgentMap[key][index].role.displayIcon}
                              className=" rounded-xl h-9 w-9"
                              
                            ></img>
                            <h2>{AgentMap[key][index].displayName}</h2>
                          </div>
    
                          <div className="flex flex-wrap col-span-4 gap-3">
    
                            <p>{AgentMap[key][index].description}</p>
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
