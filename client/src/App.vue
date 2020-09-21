<template>
  <div id="app">
    <h1>Convertir un nombre en chiffres romains</h1>
    <form @submit.prevent="sendNumber" ref="form">
      <input v-model.number="number" autofocus type="number" min="1" max="100">
      <input type="submit" value="Convertir">
    </form>
    <h2>Resultat : {{ roman }}</h2>
    <p v-if="error" style="color: red;">Erreur : {{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return { number: 1, roman: '', error: '' }
  },
  methods: {
    async sendNumber() {
      try {
        const response = await fetch('http://localhost:8888/romanize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ number: this.number })
        })
        const json = await response.json()
        if (json.error) {
          // HANDLE SERVER ERROR (VALIDATION)
          this.roman = ''
          this.error = json.error
        } else {
          this.roman = json.roman
          this.error = ''
        }
      } catch (err) {
        // HANDLE REQUEST ERROR (NETWORK)
        this.error = err.message
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
