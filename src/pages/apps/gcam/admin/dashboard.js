import React from "react";
import AdminNavbar from "@/Components/gcam/adminNavbar";
import { useState } from "react";
import { Button } from "react-bootstrap";
function getButton(label){
  return <Button
  className="bg-blue-600 p-3 rounded-lg m-3"
  onClick={(e) => {
    setProcessorBrands(
      [...processorBrands, processorBrandName],
      setProcessorBrandName("")
    );
  }}
>
  Add
</Button>
}
const Dashboard = () => {
  const [processors, setProcessors] = useState([]);
  const [processorName, setProcessorName] = useState("");
  const [processorBrands, setProcessorBrands] = useState([]);
  const [processorBrandName, setProcessorBrandName] = useState("");

  const [deviceBrands, setDeviceBrands] = useState([]);
  const [deviceBrandName, setDeviceBrandName] = useState("");

  const [androidVersionList, setAndroidVersionList] = useState([]);
  const [androidVersion, setAndroidVersion] = useState('');
  
  const [developers, setDevelopers] = useState({});
  function addProcessorName() {
    if (!processors.includes(processorName))
      setProcessors((current) => [...current, processorName]);
    setProcessorName("");
    console.log(processors);
  }
  return (
    <>
      <AdminNavbar />

      <div>
            {//******************** Processors Info
            }
        <div className="Processors">
          <div id="test">
            {" "}
            Processor Brand :{" "}
            <input
              type="text"
              value={processorBrandName}
              className="w-72 h-12 rounded-lg text-lg text-black"
              onChange={(e) => setProcessorBrandName(e.target.value)}
            />
            <Button
              className="bg-blue-600 p-3 rounded-lg m-3"
              onClick={(e) => {
                setProcessorBrands(
                  [...processorBrands, processorBrandName],
                  setProcessorBrandName("")
                );
              }}
            >
              Add
            </Button>
          </div>
          <div id="test">
            {" "}
            Processors :{" "}
            <input
              type="text"
              value={processorName}
              className="w-72 h-12 rounded-lg text-lg text-black"
              onChange={(e) => setProcessorName(e.target.value)}
            />
            <Button
              className="bg-blue-600 p-3 rounded-lg m-3"
              onClick={(e) => {
                setProcessors(
                  [...processors, processorName],
                  setProcessorName("")
                );
              }}
            >
              Add
            </Button>
          </div>
        </div>
              {//******************** End Processors Info
      }

      { /* ************************ Device Brands */ }
      <div className="Device_Brand">
      Device Brand Name :
      <input
      type="text"
      value={deviceBrandName}
      className="w-72 h-12 rounded-lg text-lg text-black"
      onChange={(e) => setDeviceBrandName(e.target.value)}
    />
    <Button
      className="bg-blue-600 p-3 rounded-lg m-3"
      onClick={(e) => {
        setDeviceBrands(
          [...deviceBrands, deviceBrandName],
          setDeviceBrandName("")
        );
      }}
    >
      Add
    </Button>
      </div>
      { /* ************************ End Device Brands */ }

      <div>
            { /* ************************ Device Brands */ }
      <div className="Device_Brand">
      Device Brand Name :
      <input
      type="text"
      value={deviceBrandName}
      className="w-72 h-12 rounded-lg text-lg text-black"
      onChange={(e) => setDeviceBrandName(e.target.value)}
    />
    <Button
      className="bg-blue-600 p-3 rounded-lg m-3"
      onClick={(e) => {
        setDeviceBrands(
          [...deviceBrands, deviceBrandName],
          setDeviceBrandName("")
        );
      }}
    >
      Add
    </Button>
      </div>
      { /* ************************ End Device Brands */ }
      </div>
            { /* ************************ Android Version */ }
            <div className="Android_version">
            Android Version :
            <input
            type="text"
            value={androidVersion}
            className="w-72 h-12 rounded-lg text-lg text-black"
            onChange={(e) => setAndroidVersion(e.target.value)}
          />
          <Button
            className="bg-blue-600 p-3 rounded-lg m-3"
            onClick={(e) => {
              setAndroidVersionList(
                [...androidVersionList, androidVersion],
                setAndroidVersion("")
              );
            }}
          >
            Add
          </Button>
            </div>
            { /* ************************ End Android versions */ }
      </div>
    </>
  );
};

export default Dashboard;
