<template>
  <b-list-group-item class="d-flex justify-content-between align-items-center">
    <b-form-checkbox :checked="task.isDone" @change="changeTaskStatus(task, $event)">
      {{ task.title }}
    </b-form-checkbox>
    <b-button-group>
      <b-button @click="onLoadTask(task)">
        <b-icon icon="pencil" />
      </b-button>
      <b-button variant="danger" @click="deleteTask(task)">
        <b-icon icon="trash-fill" />
      </b-button>
    </b-button-group>
  </b-list-group-item>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import Task from '~/interfaces/task'

@Component
export default class TaskList extends Vue {
  @Prop({ type: Object, required: true }) readonly task!: Task

  onLoadTask (task: Task) {
    this.$router.push('/tasks/' + task.id)
  }

  @Emit('change-task-status')
  changeTaskStatus (task: Task, e: any) {
    task.isDone = e
    return task
  }

  @Emit('delete-task')
  deleteTask (task: Task) {
    return task
  }
}
</script>
