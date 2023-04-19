import { useMemo } from "react";
import "./App.css";
import FormNode from "./components/FormNode";
import { useForm } from "./hooks/form";

function App() {
  const { nodes, addNode } = useForm();
  const rootNodes = useMemo(
    () => Object.values(nodes).sort((a, b) => b.value.time - a.value.time),
    [nodes]
  );
  return (
    <div className="bg-white   max-w-lg mt-20 m-auto px-5 py-10 ">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="uppercase text-lg mb-3">Field name and type</h1>
          <button
            className="text-4xl mb-3"
            onClick={() => {
              addNode?.({
                value: {
                  label: "Title",
                  type: "string",
                  time: new Date().getTime(),
                },
                childNodes: {},
                parentId: null,
                pathCache: [],
              });
            }}
          >
            +
          </button>
        </div>
        {rootNodes.length ? (
          <ul className="">
            {rootNodes.map((node) => (
              <FormNode node={node} key={node.value.id} />
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-300 uppercase mt-5">
            No entries yet
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
