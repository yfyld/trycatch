import projectHandlers from "./project"
import workHandlers from "./work"

const handlers={
  ...workHandlers,
  ...projectHandlers
}

export default handlers;