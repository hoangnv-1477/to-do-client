import gql from 'graphql-tag'

export default gql`
  mutation($id: ID!){
    deleteTask(
      id: $id
    ){
      id
      title
    }
  }
`