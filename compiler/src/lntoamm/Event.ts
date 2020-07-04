import Scope from './Scope'
import Type from './Type'
import UserFunction from './UserFunction'

class Event {
  name: string
  type: Type
  builtIn: boolean
  handlers: Array<UserFunction>
  static allEvents: Array<Event> = []

  constructor(name: string, type: any, builtIn: boolean) {
    this.name = name,
    this.type = type
    this.builtIn = builtIn
    this.handlers = []
    Event.allEvents.push(this)
  }

  toString() {
    return `event ${this.name}: ${this.type.typename}`
  }

  static fromAst(eventAst: any, scope: Scope) { // TODO: Eliminate ANTLR
    const name = eventAst.VARNAME().getText()
    const boxedVal = scope.deepGet(eventAst.varn().getText())
    if (boxedVal === null) {
      console.error("Could not find specified type: " + eventAst.varn().getText())
      process.exit(-8)
    } else if (boxedVal.type.typename !== "type") {
      console.error(eventAst.varn().getText() + " is not a type")
      process.exit(-9)
    }
    const type = boxedVal.val
    return new Event(name, type, false)
  }
}

export default Event