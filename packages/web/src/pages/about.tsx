import { Page } from '../components/Page'
import { withApollo } from '../lib/apollo'

const About = () => <Page>This is the about page</Page>

export default withApollo(About)
