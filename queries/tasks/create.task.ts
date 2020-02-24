import gql from 'graphql-tag'

export default gql`
  mutation createTask($title: String!){
    createTask(
      title: $title
    ){
      id
      title
      isDone
    }
  }
`
