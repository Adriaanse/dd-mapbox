<template>
<v-dialog v-model="visible" max-width="500px">
  <v-card>
    <v-card-title>Title goes here</v-card-title>
    <v-card-text>Dialog content goes here</v-card-text>
    <v-card-actions>
      <v-btn @click.stop="$emit('close')">Close</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  props: ['visible']
}
</script>