import Router from 'next/router'
import { ApolloPageContext } from '../../types'

export default (context: ApolloPageContext | null, target: string) => {
  if (context && context.res) {
    // On the server send a 303: "See other" redirect
    context.res.writeHead(303, { Location: target })
    context.res.end()
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target)
  }
}
