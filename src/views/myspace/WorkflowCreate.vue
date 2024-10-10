<template>
  <div>
    <div class="myspace-header">Create New Workflow</div>
    <div class="form-container">
      <div class="form-field">
        <label for="name">Name</label>
        <v-text-field v-model="name" variant="outlined"></v-text-field>
      </div>
      <div class="form-field">
        <label for="description">Description</label>
        <v-text-field v-model="description" variant="outlined"></v-text-field>
      </div>
      <v-btn class="create-btn" @click="createWorkflow">Create</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: ''
    }
  },
  methods: {
    createWorkflow() {
      // Handle the create workflow action here
      console.log('Name:', this.name)
      console.log('Description:', this.description)

      this.$router.push({
        path: '/workflow',
        state: {
          workflow: {
            name: this.name,
            description: this.description
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.myspace-header {
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 420px;
}

.form-field label {
  font-weight: 500;
  margin-bottom: 5px;
  display: inline-block;
}

.create-btn {
  background-color: black;
  color: white;
  width: 200px;
}

.create-btn:hover {
  background-color: #333;
}
</style>
