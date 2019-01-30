import projectHandlers from "./project"
import workHandlers from "./work"
import appHandlers from "./app"
const handlers={
  ...appHandlers,
  ...workHandlers,
  ...projectHandlers
}

export default handlers;