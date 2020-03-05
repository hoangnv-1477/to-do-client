import gql from 'graphql-tag'

export default gql`
  mutation($id: ID!, $isDone: Boolean!){
    editTask(
      id: $id
      isDone: $isDone
    ){
      id
      title
      isDone
    }
  }
`
