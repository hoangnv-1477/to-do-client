<template>
  <div>
    <b-alert variant="danger" :show="errorArr.length != 0">
      <b-list-group-item
        v-for="{ message } in errorArr"
        :key="message"
      >
        {{ message }}
      </b-list-group-item>
    </b-alert>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class Error extends Vue {
  @Prop({ type: Array, required: true }) readonly errorArr!: Array<any>
}
</script>
