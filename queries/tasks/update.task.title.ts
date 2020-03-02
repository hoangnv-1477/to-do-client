import gql from 'graphql-tag'

export default gql`
  mutation($id: ID!, $title: String!){
    editTask(
      id: $id
      title: $title
    ){
      id
      title
      isDone
    }
  }
`
