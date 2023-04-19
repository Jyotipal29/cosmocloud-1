function upsertNode(state: Form, payload: FormNode) {
  const _state = structuredClone(state);
  const path = payload.pathCache;
  let parentNode: null | FormNode = null;

  // This is a root node
  if (null === payload.parentId) {
    _state[payload.value.id] = payload;
    return _state;
  }

  for (const id of path) {
    // We only need the parent node
    if (id === payload.value?.id) {
      continue;
    }

    if (null === parentNode) {
      parentNode = _state[id];
    } else {
      parentNode = parentNode.childNodes[id];
    }

    if (typeof parentNode === "undefined") {
      throw new Error(`Node with id: ${id} was not found in the tree`);
    }
  }

  if (!parentNode) {
    throw new Error(
      `Parent Node with path: ${path.join(" -> ")} does not exist`
    );
  }

  parentNode.childNodes[payload.value.id] = payload;
  return _state;
}

export default function formNodeReducer(
  state: Form,
  action: ReducerAction<FormNode, "add" | "remove" | "update">
) {
  switch (action.type) {
    case "add":
      return upsertNode(
        state,
        action.payload as Required<typeof action.payload>
      );

    case "remove":
      const _state = structuredClone(state);
      const payload = action.payload as Required<typeof action.payload>;
      const path = payload.pathCache;
      let parentNode: null | FormNode = null;

      for (const id of path) {
        if (id === payload.value?.id) {
          if (null === parentNode) {
            delete _state[id];
          } else {
            delete parentNode.childNodes[id];
          }
          break;
        }

        if (null === parentNode) {
          parentNode = _state[id];
        } else {
          parentNode = parentNode.childNodes[id];
        }

        if (typeof parentNode === "undefined") {
          throw new Error(`Node with id: ${id} was not found in the tree`);
        }
      }
      return _state;

    case "update":
      return upsertNode(
        state,
        action.payload as Required<typeof action.payload>
      );

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
