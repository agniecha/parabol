import {GraphQLNonNull, GraphQLString, GraphQLBoolean} from 'graphql'
import getRethink from '../../../database/rethinkDriver'

const enableSAMLForDomain = {
  type: new GraphQLNonNull(GraphQLBoolean),
  description: 'Enable SAML for domain',
  args: {
    url: {
      type: new GraphQLNonNull(GraphQLString),
    },
    domain: {
      type: GraphQLNonNull(GraphQLString),
    },
    metadata: {
      type: GraphQLNonNull(GraphQLString),
    },
    cert: {
      type: GraphQLNonNull(GraphQLString),
    }
  },
  async resolve(_source, {url, domain, metadata, cert}) {
    const r = await getRethink()
    const normalizedDomain = domain.toLowerCase()
    await r
      .table('SAML')
      .insert({
        domain: normalizedDomain,
        url: url,
        metadata: metadata,
        cert: cert
      })
      .run()
  }
}

export default enableSAMLForDomain
