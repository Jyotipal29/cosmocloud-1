import React, { memo, useEffect, useMemo, useState } from "react";
import { useForm } from "../hooks/form";

interface FormNodeProps {
  node: FormNode;
}

const nodetypes: FormNodeType[] = [
  "boolean",
  "integer",
  "string",
  "object",
];

const FormNode = memo(({ node }: FormNodeProps) => {
  const { removeNode, editNode, addNode } = useForm();
  const [isEditing, setIsEditing] = useState(true);
  const [tmpLabel, setTmpLabel] = useState(node.value.label);
  const [tmpType, setTmpType] = useState(node.value.type);
  const childNodes = useMemo(
    () =>
      Object.values(node.childNodes).sort(
        (a, b) => b.value.time - a.value.time
      ),
    [node]
  );

  function handleDbClick() {
    if (!isEditing) {
      setTmpLabel(node.value.label);
      setIsEditing(true);
    }
  }

  function _editNode() {
    editNode?.({
      ...node,
      value: {
        ...node.value,
        label: tmpLabel,
        type: tmpType,
      },
    });
  }

  function _addNode() {
    addNode?.({
      value: {
        label: "Title",
        type: "string",
        time: new Date().getTime(),
      },
      childNodes: {},
      parentId: node.value.id,
      pathCache: [...node.pathCache],
    });
  }

  useEffect(() => {
    _editNode();
  }, [tmpType]);

  return (
    <li className="flex flex-col m-1">
      <div
        className={` flex justify-center bg-gray-100 items-center text-lg gap-7 ${
          node.value.type === "object" ? "hover:bg-gray-400/70" : ""
        }  pl-5 py-3 rounded transition-all duration-200 group`}
      >
        <div onDoubleClick={handleDbClick} className="px-2">
          {isEditing ? (
            <input
              className="outline-transparent"
              type="text"
              value={tmpLabel}
              onChange={(e) => {
                setTmpLabel(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.code === "Enter" && tmpLabel.length) {
                  _editNode();
                  setIsEditing(false);
                }
              }}
              onFocus={(e) => {
                e.target.select();
              }}
              autoFocus
            />
          ) : (
            node.value.label
          )}
        </div>
        <select
          className="bg-transparent text-sm outline-0"
          value={tmpType}
          onChange={(e) => {
            setTmpType(e.target.value as FormNodeType);
          }}
        >
          {nodetypes.map((type) => (
            <option value={type} key={type}>
              {type.toUpperCase()}
            </option>
          ))}
        </select>
        <div className="flex-auto" />
        {node.value.type === "object" && (
          <button
            className="text-3xl hidden group-hover:flex "
            onClick={_addNode}
          >
            +
          </button>
        )}
        
        <button
          className="inline-flex items-center px-4 py-2  text-red text-sm"
          onClick={() => {
            removeNode?.(node);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
      {node.value.type === "object" && (
        <div className="text-left px-6 py-2">
          <ul className="">
            {childNodes.map((node) => (
              <FormNode node={node} key={node.value.id} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
});

export default FormNode;
