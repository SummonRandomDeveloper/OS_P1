import { useState } from "react";
import AlgorithmSelection from "./components/AlgorithmSelection";
import FIFO from "./components/FIFO";
import SJF from "./components/SJF";
import STCF from "./components/STCF";
import RR from "./components/RR";
import MLFQ from "./components/MFLQ";
import "./App.css";
import AverageEndTimeChart from "./components/AverageEndTimeChart";

interface Process {
  pid: number;
  burstTime: number;
  arrivalTime: number;
}

function App() {
  // State to store the selected algorithms
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([]);

  // State to store the number of processes
  const [numProcesses, setNumProcesses] = useState<number>(5);

  // State to store the time quantum (for Round Robin)
  const [timeQuantum, setTimeQuantum] = useState<number>(4);

  // State to store all processes to apply to each selected algorithm
  const [processes, setProcesses] = useState<Process[]>([]);

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

  // Generate random processes
  const generateProcesses = (num: number): Process[] => {
    return (
      Array.from({ length: num }, (_, i) => ({
        pid: -1,
        // Burst time between 1-10
        burstTime: Math.floor(Math.random() * 10) + 1,
        // Arrival time between 0-10
        arrivalTime: Math.floor(Math.random() * 10),
      }))
        // Sort by arrival time
        .sort((a, b) => a.arrivalTime - b.arrivalTime)
        // Reassign PID based on order;
        .map((process, index) => ({ ...process, pid: index + 1 }))
    );
  };

  // Hander for when the AlgorithmSelection Form is submitted.
  const handleFormSubmit = () => {
    const newProcesses = generateProcesses(numProcesses);
    setProcesses(newProcesses);

    console.log("Form submitted!");
    console.log("Selected Algorithms:", selectedAlgorithms);
    console.log("Number of Processes:", numProcesses);
    console.log("Time Quantum for RR:", timeQuantum);
  };

  // Predefined order of algorithms
  const algorithmOrder = ["fifo", "sjf", "stcf", "rr", "mlfq"];

  const averageEndTimes = {
    fifo: 12.5,
    sjf: 10.2,
    mlfq: 12.1,
    rr: 13.7,
  };

  // Sort selected algorithms based on the predefined order (Activates automatically on rerender)
  const sortedAlgorithms = selectedAlgorithms.sort((a, b) => {
    return algorithmOrder.indexOf(a) - algorithmOrder.indexOf(b);
  });

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
        <h4 className="mt-2">Number of Processes: {numProcesses}</h4>
        <h4 className="mt-2">Time Quantum for Round Robin: {timeQuantum}</h4>
      </div>
      {processes.length > 0 && (
        <div className="mt-4">
          <h4 className="mt-2">Generated Processes:</h4>
          <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th>PID</th>
                <th>Arrival Time</th>
                <th>Burst Time</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process) => (
                <tr key={process.pid}>
                  <td className="col">{process.pid}</td>
                  <td>{process.arrivalTime}</td>
                  <td>{process.burstTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedAlgorithms.includes("fifo") && <FIFO processes={processes} />}
      {selectedAlgorithms.includes("sjf") && <SJF processes={processes} />}
      {selectedAlgorithms.includes("stcf") && <STCF processes={processes} />}
      {selectedAlgorithms.includes("rr") && (
        <RR processes={processes} timeQuantum={timeQuantum} />
      )}
      {selectedAlgorithms.includes("mlfq") && (
        <MLFQ processes={processes} timeQuantum={timeQuantum} />
      )}
      <div className="mt-4">
        <h4>Average End Times</h4>
        <AverageEndTimeChart averageEndTimes={averageEndTimes} />
      </div>
    </div>
  );
}

export default App;
