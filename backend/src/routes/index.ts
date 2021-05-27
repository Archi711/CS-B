
import authorization from './authorization'
import { router as user } from './user'
import { router as cases } from './cases'
export default [
  authorization,
  user,
  cases
]
