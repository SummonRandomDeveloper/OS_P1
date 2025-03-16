type Process = {
  id: number;
  arrivalTime: number;
  burstTime: number;
};

type Result = {
  id: number;
  startTime: number;
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
};

// Function to generate random processes
const generateProcesses = (count: number): Process[] => {
  const processes: Process[] = [];

  for (let i = 0; i < count; i++) {
    const process: Process = {
      id: -1,
      // Arrival time between 0 and 9
      arrivalTime: Math.floor(Math.random() * 10),
      // Burst time between 1 and 10
      burstTime: Math.floor(Math.random() * 10) + 1,
    };
    processes.push(process);
  }

  // Sort the processes by arrivalTime and assign the ID based on sorted order
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  // Assign the ID based on the sorted order
  processes.forEach((process, index) => {
    process.id = index + 1;
  });

  return processes;
};

const fifo = (processes: Process[]): Result[] => {
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  let currentTime = 0;
  const results: Result[] = [];

  for (const process of processes) {
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }

    const startTime = currentTime;
    const completionTime = startTime + process.burstTime;
    const turnaroundTime = completionTime - process.arrivalTime;
    const waitingTime = startTime - process.arrivalTime;

    results.push({
      id: process.id,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime,
    });

    currentTime = completionTime;
  }

  return results;
};

// Example usage
const numProcesses = 5;
const processes = generateProcesses(numProcesses);
console.log("Generated Processes:", processes);
const results = fifo(processes);
console.log("Results:", results);
