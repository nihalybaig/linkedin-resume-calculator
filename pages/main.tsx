import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Main() {
  const [file, setFile] = useState(null);
  const [fileText, setFileText] = useState("");
  const [text, setText] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleFileTextChange = (event: any) => {
    setFileText(event.target.value);
  };

  const handleTextChange = (event: any) => {
    setText(event.target.value);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setErrorText("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          ["job-description"]: text,
          resume: fileText,
        }) as any,
      });
      const data = await response.json();
      console.log("response data is coming here ", data);
      setApiResponse(data);
      setLoading(false);
    } catch (e) {
      setErrorText("OMG!");
      setLoading(false);
    }
  };

  return (
    <div className="p-4 mt-10">
      {/* < div className="mb-4" >
                <label className="block mb-2 font-bold" > Upload File </label>
                < input type="file" onChange={handleFileChange} />
            </div> */}
      <div className="grid grid-cols-2">
        <div className="mb-4 flex flex-col justify-center items-center">
          <label className="block mb-2 font-bold "> Input Resume Text </label>
          <textarea
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            rows={5}
            value={fileText}
            onChange={handleFileTextChange}
          />
        </div>
        <div className="mb-4 flex flex-col justify-center items-center">
          <label className="block mb-2 font-bold">
            {" "}
            Input Job Description{" "}
          </label>
          <textarea
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            rows={5}
            value={text}
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div className="flex justify-center mt-16">
        <button
          className="p-3 bg-blue-500 text-white font-bold rounded"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? `Getting Scores` : `Score My Resume`}
        </button>
      </div>
      <div className="flex justify-center mt-16 text-red-900">
        {errorText}
      </div>


      {apiResponse && <ApiResponseTable apiResponse={apiResponse} />}
    </div>
  );
}

function ApiResponseTable({ apiResponse }: any) {
  const sectionKeys = [
    { key: "title", label: "Title" },
    { key: "experience", label: "Experience" },
    { key: "skills", label: "Skills" },
    { key: "summary", label: "Summary" },
  ];

  const getPathColor = (val: number) => {
    if (val < 5) {
      return "#FF0000";
    } else if (val < 9) {
      return "#FF8C00";
    } else {
      return "#2E8B57";
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Recommendations:</h2>
      <div className="shadow overflow-x-auto border border-gray-300">
        {sectionKeys.map(({ key, label }) => (
          <div className="border-b border-gray-300 flex" key={key}>
            <div className="flex flex-col justify-center items-center w-1/6">
              <div className="py-4 px-6 border-gray-300 whitespace-nowrap font-bold">
                {label}
              </div>
              <div className="py-4 px-6 border-gray-300 whitespace-nowrap">
                <CircularProgressbar
                  value={apiResponse[`${key}_match_score`] * 10}
                  text={`${apiResponse[`${key}_match_score`] * 10}%`}
                  className="h-20 w-20"
                  styles={buildStyles({
                    pathColor: getPathColor(apiResponse[`${key}_match_score`]),
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col w-5/6">
              <div className="flex items-center border-b">
                <div className="font-semibold">Comments:</div>
                <div className="py-4 px-6 border-gray-300">
                  {apiResponse[`${key}_comments`]}
                </div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold">Title Points:</div>
                <div className="py-4 px-6">
                  {Array.isArray(apiResponse[`${key}_points`])
                    ? apiResponse[`${key}_points`].map(
                      (point: any, index: any) => (
                        <p key={index} className="mb-2">
                          {point}
                        </p>
                      )
                    )
                    : apiResponse[`${key}_points`]}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}