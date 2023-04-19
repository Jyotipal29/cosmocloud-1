import { useContext } from "react";
import { FormContext } from "../context/FormContext";

export function useForm() {
  return useContext(FormContext);
}
