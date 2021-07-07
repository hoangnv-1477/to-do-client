<template>
  <div>
    <error :error-arr="errorArr" />
    <b-container>
      <b-input-group>
        <b-form-input v-model="task.title" />
        <b-input-group-append>
          <b-button variant="success" @click="editTask(task)">
            Save
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Task from '../../../interfaces/task'
import graphqlClient from '@/config/graphql'
import loadTask from '~/queries/tasks/load.task'
import updateTaskTitle from '~/queries/tasks/update.task.title'
import Error from '~/components/share/Error.vue'

@Component({
  components: { Error }
})
export default class Index extends Vue {
  task: Partial<Task> = {}
  errorArr: Array<any> = []

  validate ({ params }: { params: any }) {
    return /^\d+$/.test(params.id)
  }

  created () {
    this.loadTask()
  }

  loadTask () {
    return graphqlClient.query({
      query: loadTask,
      variables: { id: this.$route.params.id }
    }).then(({ data: { task } }) => {
      this.task = task
    }).catch(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) { this.errorArr = graphQLErrors }
      if (networkError) { this.errorArr.push({ message: networkError }) }
    })
  }

  editTask () {
    return graphqlClient.mutate({
      mutation: updateTaskTitle,
      variables: {
        id: this.task.id,
        title: this.task.title
      }
    }).then(() => {
      return this.$router.push({ name: 'index' })
    }).catch(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) { this.errorArr = graphQLErrors }
      if (networkError) { this.errorArr.push({ message: networkError }) }
    })
  }
}
</script>
