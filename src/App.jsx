import { useState } from "react";

function App() {
    const [jsonInput, setJsonInput] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            // Validate JSON
            const parsedData = JSON.parse(jsonInput);

            // Call the backend API
            const res = await fetch("/bfhl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedData),
            });

            const data = await res.json();
            setResponse(data);
            setError("");
        } catch (e) {
            setError("Invalid JSON input");
            setResponse(null);
        }
    };

    const handleOptionChange = (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setSelectedOptions(value);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl underline my-4">Data Processor</h1>
            <textarea
                placeholder="Enter JSON here"
                value={jsonInput}
                onChange={handleInputChange}
                className="my-4"
            />
            <br />
            <button onClick={handleSubmit} className="border my-4">
                Submit
            </button>
            {error && <p className="my-4 text-red-500">{error}</p>}

            {response && (
                <>
                    <label className="my-4">Select Data to Display:</label>
                    <select multiple onChange={handleOptionChange}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_lowercase_alphabet">
                            Highest Lowercase Alphabet
                        </option>
                    </select>

                    <div className="response my-4">
                        {selectedOptions.includes("alphabets") && (
                            <div>
                                <h2>Alphabets:</h2>
                                <p>{response.alphabets.join(", ")}</p>
                            </div>
                        )}
                        {selectedOptions.includes("numbers") && (
                            <div>
                                <h2>Numbers:</h2>
                                <p>{response.numbers.join(", ")}</p>
                            </div>
                        )}
                        {selectedOptions.includes(
                            "highest_lowercase_alphabet"
                        ) && (
                            <div>
                                <h2>Highest Lowercase Alphabet:</h2>
                                <p>
                                    {response.highest_lowercase_alphabet.join(
                                        ", "
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
