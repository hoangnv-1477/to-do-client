<template>
  <div>
    <error :error-arr="errorArr" />
    <the-heading />
    <b-container>
      <b-input-group>
        <b-form-input v-model="newTask.title" />
        <b-input-group-append>
          <b-button variant="success" @click="createTask(newTask)">
            Save
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <b-list-group>
        <task-list
          v-for="task in unfinishedTasks"
          :key="task.id"
          :task="task"
          @change-task-status="updateTaskStatus"
          @delete-task="deleteTask"
        />
      </b-list-group>
      <b-row>
        <b-col md="6" class="py-3">
          <b-button variant="success" class="w-100 text-left">
            Task completed
          </b-button>
        </b-col>
      </b-row>
      <b-list-group>
        <task-list
          v-for="task in finishedTasks"
          :key="task.id"
          :task="task"
          @change-task-status="updateTaskStatus"
          @delete-task="deleteTask"
        />
      </b-list-group>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import graphqlClient from '@/config/graphql'
import TheHeading from '~/components/share/TheHeading.vue'
import TaskList from '~/components/tasks/TaskList.vue'
import Error from '~/components/share/Error.vue'
import Task from '~/interfaces/task'
import loadTasks from '~/queries/tasks/load.tasks'
import createTask from '~/queries/tasks/create.task'
import deleteTask from '~/queries/tasks/delete.task'
import updateTaskStatus from '~/queries/tasks/update.task.status'

@Component({
  components: { TheHeading, TaskList, Error }
})
export default class Index extends Vue {
  errorArr: Array<any> = []
  tasks: Array<Task> = []
  newTask: Task = { id: 0, title: '', isDone: false }

  created () {
    this.loadTasks()
  }

  deleteTask (task: Task) {
    return graphqlClient.mutate({
      mutation: deleteTask,
      variables: { id: task.id }
    }).then(() => {
      const taskIndex = this.tasks.findIndex(item => item.id === task.id)
      this.tasks.splice(taskIndex, 1)
      this.errorArr = []
    }).catch(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) { this.errorArr = graphQLErrors }
      if (networkError) { this.errorArr.push({ message: networkError }) }
    })
  }

  createTask (task: Task) {
    return graphqlClient.mutate({
      mutation: createTask,
      variables: { title: task.title }
    }).then(({ data: { createTask } }) => {
      this.newTask.title = ''
      this.unfinishedTasks.push(createTask)
      this.errorArr = []
    }).catch(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) { this.errorArr = graphQLErrors }
      if (networkError) { this.errorArr.push({ message: networkError }) }
    })
  }

  updateTaskStatus (task: Task) {
    return graphqlClient.mutate({
      mutation: updateTaskStatus,
      variables: {
        id: task.id,
        isDone: task.isDone
      }
    }).then(() => {
      this.errorArr = []
    }).catch(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) { this.errorArr = graphQLErrors }
      if (networkError) { this.errorArr.push({ message: networkError }) }
    })
  }

  loadTasks () {
    return graphqlClient.query({
      query: loadTasks
    }).then(({ data: { tasks } }) => {
      this.tasks = tasks
      this.errorArr = []
    }).catch(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) { this.errorArr = graphQLErrors }
      if (networkError) { this.errorArr.push({ message: networkError }) }
    })
  }

  get finishedTasks () {
    return this.tasks.filter((task: Task) => task.isDone === true)
  }

  get unfinishedTasks () {
    return this.tasks.filter((task: Task) => task.isDone !== true)
  }
}
</script>
