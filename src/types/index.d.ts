export {};

declare global {
  interface FormNode {
    value: NodeValue;
    parentId: null | string;
    childNodes: Record<string, FormNode>;
    pathCache: string[];
  }

  type FormNodeWithoutId = Omit<FormNode, "value"> & {
    value: Omit<FormNode["value"], "id">;
  };

  type NodeValue = {
    id: string;
    label: string;
    type: FormNodeType;
    time: number;
  };

  type Form = Record<string, FormNode>;

  type FormNodeType = "boolean" | "integer" | "string" | "object" | "array";
  type ReducerAction<S, T extends string = string> = {
    type: T;
    payload: Partial<S>;
  };
}
