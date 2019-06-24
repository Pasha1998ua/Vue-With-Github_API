<template>
  <div class="search-page">
    <form class="search-form">
      <input class="search-input" v-on:keyup.enter="search" v-model="login" placeholder="Input three or more symbols"/>
      <button class="search-btn" v-on:click="search">Search</button>
    </form>
    <div class="organization-card" v-for="item in items" v-bind:key="item.id">
      <h2>{{item.login}}</h2>
      <img v-bind:src="item.avatar_url" alt="org logo"/>
      <router-link v-bind:to="'/org/' + item.login"><button>Detailed Info</button></router-link>
    </div>
    <span v-bind:class="'no-result-msg ' + this.noresult">No Results</span>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      login: '',
      items: [],
      noresult: ''
    }
  },
  methods: {
    search: function(event) {
      if (event) event.preventDefault();
      if(this.login.length >= 3){
        axios
          .get(`https://api.github.com/search/users?q=${this.login}%20in:login+type:org`)
          .then(response => {
            this.items = response.data.items;
            if(this.items.length !== 0){
              this.noresult = 'display-none';
            } else {
              this.noresult = '';
            }
            })
          .catch(function (error) {
            if (error.response) {
              alert('Was returned status code: ' + error.response.status);
            } else if (error.request) {
              alert(error.request);
            } else {
              alert('Error', error.message);
            }
          });
      }
    }
  }
}
</script>

<style scoped>
  *{
    box-sizing: border-box;
    font-family: 'Courier New', Courier, monospace;
  }

  .search-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    width: 100%;
    min-height: 100%;
  }

  .search-form {
    position: relative;
  }

  .search-form .search-input {
    outline: none;
    width: 700px;
    height: 60px;
    background-color: #5680e9;
    margin-bottom: 20px;
    padding: 10px 170px 10px 30px;
    font-size: 1.5em;
    font-weight: 700;
    border: none;
    color: #e5e8f7;
    text-transform: uppercase;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .search-form .search-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 150px;
    height: 40px;
    border: none;
    background-color: #c1c8e4;
    color: #5680e9;
    font-size: 1.3em;
    font-weight: 700;
    cursor: pointer;
  }

  .search-form .search-btn:hover {
    background-color: #b1b6ca;
  }

  .search-form .search-input::placeholder {
    color: #c1c8e4;
  }

  .organization-card {
    position: relative;
    background-color: #c1c8e4;
    width: 700px;
    height: 140px;
    margin: 20px;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  }

  .organization-card h2 {
    width: 100%;
    height: 60px;
    background-color: #5680e9;
    text-align: right;
    margin: 0;
    color: #e5e8f7;
    text-transform: uppercase;
    padding: 20px 20px 20px 200px;
    text-overflow: ellipsis;
  }

  .organization-card img {
    position: relative;
    width: 100px;
    height: 100px;
    top: -40px;
    left: 40px;
    background-color: #c1c8e4;
    border: 5px solid #c1c8e4;
    border-radius: 5px;
  }

  .organization-card button {
    position: absolute;
    top: 80px;
    right: 20px;
    width: 200px;
    height: 40px;
    border: none;
    background-color: #5680e9;
    color: #e5e8f7;
    font-size: 1.3em;
    font-weight: 700;
    cursor: pointer;
  }

  .organization-card button:hover {
    background-color: #2f59c4;
  }

  .no-result-msg {
    font-size: 3em;
    font-weight: 700;
    color: #c1c8e4;
  }

  .display-none {
    display: none;
  }
</style>
