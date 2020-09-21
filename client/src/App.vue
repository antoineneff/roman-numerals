<template>
  <div id="app">
    <h1>Convertir un nombre en chiffres romains</h1>
    <form @submit.prevent="sendNumber" ref="form">
      <input v-model.number="number" autofocus type="number">
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
  created() {
    // CONNECT TO SSE
    const events = new EventSource('http://localhost:8888/events')
    events.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.error) {
        this.roman = ''
        this.error = data.error
      } else {
        this.roman = data.roman
        this.error = ''
      }
    }

    events.onerror = (event) => {
      this.roman = ''
      this.error = event.data
    }
  },
  methods: {
    async sendNumber() {
      try {
        await fetch('http://localhost:8888/romanize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ number: this.number })
        })
      } catch (err) {
        // HANDLE REQUEST ERROR
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
