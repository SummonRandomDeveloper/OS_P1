function ListGroup() {
  const items = [
    "FIFO (First In First Out)",
    "SJF (Shortest Job First)",
    "STCF (Shortest Time-to-Completion First)",
    "RR (Round Robin)",
    "MLFQ (Multi-Level Feedback Queue)",
  ];

  const GetMessage = () => {
    items.length === 0 && <p>No Algorithms Available</p>;
  };

  return (
    <>
      <h1>List</h1>
      {GetMessage()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className="list-group-item"
            key={item}
            onClick={() => console.log(item, index + 1)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
