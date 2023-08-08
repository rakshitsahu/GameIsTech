import React from "react";
import { getAgents } from "@/util/valorant/agents";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "@/Components/valorant/Navbar";
import { useRouter } from "next/router";
import GCAM_API_STATE from "@/Components/API/API_States";
import { GCAM_GET_REQUEST } from "@/Components/API/GET_API_Manager";
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

export async function getStaticProps(){
  const json = await getAgents()
  console.log( 'the response of gameistech is ', json)
  return { props: { json } }
}
export default function Agents({json}) {
  // console.log( 'the response of gameistech is ', json)
  console.log('the agentsjsoj  is', json)

      mapAgents(json);

      const data = Object.keys(AgentMap["Sentinel"]);
      console.log(AgentMap);
      return (
        <>
          <Navbar />
          <div> pagfe is working</div>
        </>
      );
}
