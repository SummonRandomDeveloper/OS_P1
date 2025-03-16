import { useState } from "react";

// Interface for Algorithm Selection Props
interface AlgorithmSelectionProps {
  onSelectAlgorithms: (selectedAlgorithms: string[]) => void;
  numProcesses: number;
  onProcessChange: (numProcesses: number) => void;
  timeQuantum: number;
  onTimeQuantumChange: (timeQuantum: number) => void;
}

// Functional Component for Algorithm Selection
function AlgorithmSelection({
  onSelectAlgorithms,
  numProcesses,
  onProcessChange,
  timeQuantum,
  onTimeQuantumChange,
}: AlgorithmSelectionProps) {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([]);

  // Handle checkbox selection and updating state
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const algorithm = event.target.value;
    setSelectedAlgorithms((prevSelected) =>
      event.target.checked
        ? [...prevSelected, algorithm]
        : prevSelected.filter((algo) => algo !== algorithm)
    );
  };

  // Handle process count change
  const handleProcessChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onProcessChange(Number(event.target.value));
  };

  // Handle time quantum change (always visible for RR)
  const handleTimeQuantumChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onTimeQuantumChange(Number(event.target.value));
  };

  // Handle submit form
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedAlgorithms.length > 0 && numProcesses > 0) {
      onSelectAlgorithms(selectedAlgorithms);
      console.log("Selected Algorithms:", selectedAlgorithms);
      console.log("Number of Processes:", numProcesses);
      console.log("Time Quantum for RR:", timeQuantum);
    } else {
      alert(
        "Please select at least one algorithm and enter the number of processes."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <h3>Select Algorithms</h3>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value="fifo"
            id="fifo"
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="fifo">
            FIFO (First In First Out)
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value="sjf"
            id="sjf"
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="sjf">
            SJF (Shortest Job First)
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value="stcf"
            id="stcf"
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="stcf">
            STCF (Shortest Time-to-Completion First)
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value="rr"
            id="rr"
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="rr">
            RR (Round Robin)
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value="mlfq"
            id="mlfq"
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="mlfq">
            MLFQ (Multi-Level Feedback Queue)
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="numProcesses" className="form-label">
          Number of Processes
        </label>
        <input
          type="number"
          className="form-control"
          id="numProcesses"
          value={numProcesses}
          onChange={handleProcessChangeInput}
          min="1"
          placeholder="Enter number of processes"
        />
      </div>

      {/* Time Quantum field always visible */}
      <div className="mb-3">
        <label htmlFor="timeQuantum" className="form-label">
          Time Quantum (For Round Robin)
        </label>
        <input
          type="number"
          className="form-control"
          id="timeQuantum"
          value={timeQuantum}
          onChange={handleTimeQuantumChangeInput}
          min="1"
          placeholder="Enter Time Quantum"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Start Simulation
      </button>
    </form>
  );
}

export default AlgorithmSelection;
