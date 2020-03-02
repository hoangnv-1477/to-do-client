import gql from 'graphql-tag'

export default gql`
  query($id: ID!){
    task(
      id: $id
    ){
      id
      title
      isDone
    }
  }
`
