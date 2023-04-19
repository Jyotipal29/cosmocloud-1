import React, { ReactNode, useReducer } from "react";
import { FormContext } from "./FormContext";
import formNodeReducer from "../reducers/formNodeReducer";

interface FormProviderProps {
  children: ReactNode;
}

function FormProvider({ children }: FormProviderProps) {
  const [state, dispatch] = useReducer(formNodeReducer, {});

  function addNode({ value, ...metaData }: FormNodeWithoutId) {
    const id = crypto.randomUUID();
    let pathCache = metaData.pathCache;
    if (metaData.parentId) {
      pathCache.push(id);
    } else {
      pathCache = [id];
    }
    dispatch({
      type: "add",
      payload: {
        value: {
          ...value,
          id,
        },
        ...metaData,
        pathCache,
      },
    });
  }
  function editNode(node: FormNode) {
    dispatch({
      type: "update",
      payload: structuredClone(node),
    });
  }
  function removeNode(node: FormNode) {
    dispatch({
      type: "remove",
      payload: node,
    });
  }

  return (
    <FormContext.Provider
      value={{
        nodes: state,
        addNode,
        editNode,
        removeNode,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default FormProvider;
