import React, { useState } from 'react';

export default function Main() {
    const [file, setFile] = useState(null);
    const [fileText, setFileText] = useState('');
    const [text, setText] = useState('');
    const [apiResponse, setApiResponse] = useState(null);

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
        // Call your API here and set the response in the state variable `apiResponse`
        // For example:
        const response = await fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ text }),
        });
        const data = await response.json();
        setApiResponse(data);
    };

    return (
        <div className="p-4" >
            <h1 className="text-3xl font-bold mb-4" > Next.js Webpage </h1>

            {/* < div className="mb-4" >
                <label className="block mb-2 font-bold" > Upload File </label>
                < input type="file" onChange={handleFileChange} />
            </div> */}

            < div className="mb-4" >
                <label className="block mb-2 font-bold" > Input Resume Text </label>
                < textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={5}
                    value={text}
                    onChange={handleTextChange}
                />
            </div>

            < div className="mb-4" >
                <label className="block mb-2 font-bold" > Input Long Text </label>
                < textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={5}
                    value={text}
                    onChange={handleTextChange}
                />
            </div>

            < button
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded"
                onClick={handleGenerate}
            >
                Generate
            </button>

            {apiResponse && <ApiResponseTable apiResponse={apiResponse} />}
        </div>
    );
}

function ApiResponseTable({ apiResponse }: any) {
    const sectionKeys = [
        { key: 'title', label: 'Title' },
        { key: 'experience', label: 'Experience' },
        { key: 'skills', label: 'Skills' },
        { key: 'summary', label: 'Summary' },
    ];

    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">API Response:</h2>
            <div className="shadow overflow-x-auto border border-gray-300">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 border-b border-gray-300 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Section
                            </th>
                            <th className="py-3 px-4 border-b border-gray-300 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Score
                            </th>
                            <th className="py-3 px-4 border-b border-gray-300 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Comments
                            </th>
                            <th className="py-3 px-4 border-b border-gray-300 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Recommendation
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sectionKeys.map(({ key, label }) => (
                            <tr key={key}>
                                <td className="py-4 px-6 border-b border-gray-300 whitespace-nowrap">
                                    {label}
                                </td>
                                <td className="py-4 px-6 border-b border-gray-300 whitespace-nowrap">
                                    {apiResponse[`${key}_match_score`]}
                                </td>
                                <td className="py-4 px-6 border-b border-gray-300">
                                    {apiResponse[`${key}_comments`]}
                                </td>
                                <td className="py-4 px-6 border-b border-gray-300">
                                    {Array.isArray(apiResponse[`${key}_points`])
                                        ? apiResponse[`${key}_points`].map((point: any, index: any) => (
                                            <p key={index} className="mb-2">
                                                {point}
                                            </p>
                                        ))
                                        : apiResponse[`${key}_points`]}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}