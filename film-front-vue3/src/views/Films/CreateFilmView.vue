<template>
    <div class="container">
      <div v-if="error">
        <span v-for="{ message, index } in error" :key="index"> {{ message }} <br /> </span>
      </div>
      <form @submit.prevent="formSubmitHandler">
        <div class="row">
          <div class="col-25">
            <label for="filmName">Filmi Nimi</label>
          </div>
          <div class="col-75">
            <input type="text" id="filmName" v-model="filmName" placeholder="Filmi nimi" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="genre">Žanr</label>
          </div>
          <div class="col-75">
            <input type="text" id="genre" v-model="genre" placeholder="Žanr" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="description">Kirjeldus</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="description"
              v-model="description"
              placeholder="Kirjeldus"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="releaseDate">Väljastus kuupäev</label>
          </div>
          <div class="col-75">
            <input
              id="releaseDate"
              type="date"
              v-model="releaseDate"
              placeholder="Kuupäev"
              style="height: 50px"
              required
            />
          </div>
        </div>
        <br />
        <div class="row">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
</template>
  
<script>
  const API_URL = 'http://localhost:8090/films'
  export default {
    data() {
      return {
        filmName: '',
        genre: '',
        description: '',
        releaseDate: ''
      }
    },
    methods: {
      formSubmitHandler() {
        const newFilm = {
          filmName: this.filmName,
          description: this.description,
          genre: this.genre,
          releaseDate: this.releaseDate
        }
        fetch(API_URL, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newFilm)
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data.error) {
              this.$router.push('/')
              return
            }
            this.error = data.error
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
</script>
  
<style>
  * {
    box-sizing: border-box;
  }
  
  input[type='text'],
  select,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }
  
  label {
    padding: 12px 12px 12px 0;
    display: inline-block;
  }
  
  input[type='submit'] {
    background-color: #04aa6d;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
  }
  
  input[type='submit']:hover {
    background-color: #45a049;
  }
  
  .container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  }
  
  .col-25 {
    float: left;
    width: 25%;
    margin-top: 6px;
  }
  
  .col-75 {
    float: left;
    width: 75%;
    margin-top: 6px;
  }
  
  /* Clear floats after the columns */
  .row::after {
    content: '';
    display: table;
    clear: both;
  }
  
  /* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
    .col-25,
    .col-75,
    input[type='submit'] {
      width: 100%;
      margin-top: 0;
    }
  }
</style>