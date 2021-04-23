import {gql} from '../getGQLInputStr'
export const getRepositories = gql`
  query getRepositories {
    viewer {
      organizations(first: 100) {
        nodes {
          repositories(first: 100, isLocked: false, orderBy: {field: UPDATED_AT, direction: DESC}) {
            ...repoFrag
          }
        }
      }
      repositories(first: 100, isLocked: false, orderBy: {field: UPDATED_AT, direction: DESC}) {
        ...repoFrag
      }
    }
  }

  fragment repoFrag on RepositoryConnection {
    nodes {
      nameWithOwner
      updatedAt
      viewerCanAdminister
    }
  }
`
