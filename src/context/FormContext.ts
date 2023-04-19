import { createContext } from "react";

interface FormContext {
  nodes: Form;
  addNode?: (node: FormNodeWithoutId) => void;
  editNode?: (node: FormNode) => void;
  removeNode?: (node: FormNode) => void;
}

export const FormContext = createContext<FormContext>({
  nodes: {},
});
