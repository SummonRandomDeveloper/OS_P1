import { useState } from "react";
import AlgorithmSelection from "./components/AlgorithmSelection";
import "./App.css";

function App() {
  // State to store the selected algorithms
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([]);

  // State to store the number of processes
  const [numProcesses, setNumProcesses] = useState<number>(5);

  // State to store the time quantum (for Round Robin)
  const [timeQuantum, setTimeQuantum] = useState<number>(4); // Default value 4

  // Handler to update the selected algorithms
  const handleSelectAlgorithms = (selected: string[]) => {
    setSelectedAlgorithms(selected);
  };

  // Handler to update the number of processes
  const handleProcessChange = (num: number) => {
    setNumProcesses(num);
  };

  // Handler to update the time quantum
  const handleTimeQuantumChange = (timeQuantum: number) => {
    setTimeQuantum(timeQuantum);
  };

  // Hander for when the AlgorithmSelection Form is submitted.
  const handleFormSubmit = () => {
    console.log("Form submitted!");
    console.log("Selected Algorithms:", selectedAlgorithms);
    console.log("Number of Processes:", numProcesses);
    console.log("Time Quantum for RR:", timeQuantum);
  };

  return (
    <div className="m-3">
      <h1>CPU Scheduling Simulation</h1>
      <AlgorithmSelection
        selectedAlgorithms={selectedAlgorithms}
        onSelectAlgorithms={handleSelectAlgorithms}
        numProcesses={numProcesses}
        onProcessChange={handleProcessChange}
        timeQuantum={timeQuantum}
        onTimeQuantumChange={handleTimeQuantumChange}
        onFormSubmit={handleFormSubmit}
      />
      <div className="mt-4">
        <h3 className="mt-2">Number of Processes: {numProcesses}</h3>
        <h3 className="mt-2">Time Quantum for Round Robin: {timeQuantum}</h3>
        <h3 className="mt-2">Selected Algorithms:</h3>
        <ul>
          {selectedAlgorithms.length > 0 ? (
            selectedAlgorithms.map((algo, index) => (
              <li className="mt-2" key={index}>
                {algo}
              </li>
            ))
          ) : (
            <h5 className="mt-2">No algorithms selected yet.</h5>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
