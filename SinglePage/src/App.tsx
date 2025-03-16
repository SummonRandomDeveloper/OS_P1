import Message from "./components/Message";
import ListGroup from "./components/ListGroup";

function App() {
  const items = [
    "FIFO (First In First Out)",
    "SJF (Shortest Job First)",
    "STCF (Shortest Time-to-Completion First)",
    "RR (Round Robin)",
    "MLFQ (Multi-Level Feedback Queue)",
  ];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  // An alternate way of calling it is return <div><Message></Message></div>
  return (
    <div>
      <ListGroup
        items={items}
        heading={"Aglorithms"}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
