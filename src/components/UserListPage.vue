<template>
  <div class="users-page">
    <div class="users-card">
      <h2>{{this.$route.params.type}} - {{this.$route.params.login}}</h2>
      <router-link to="/"><button class="back-to-search-btn">Back to search</button></router-link>
      <div class="member-card" v-for="user in userlist" v-bind:key="user.id">
        <h2>{{user.login}}</h2>
        <img v-bind:src="user.avatar_url" alt="org logo"/>
        <router-link v-bind:to="'/user/' + user.login"><button>Detailed Info</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      userlist: []
    }
  },
  beforeMount: function () {
    axios
      .get(`https://api.github.com/users/${this.$route.params.login}/${this.$route.params.type}`)
      .then(response => {
        this.userlist = response.data;
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
</script>

<style scoped>
  *{
    box-sizing: border-box;
    font-family: 'Courier New', Courier, monospace;
  }

  .users-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    width: 100%;
    min-height: 100%;
  }

  .users-card {
    position: relative;
    background-color: #c1c8e4;
    width: 700px;
    min-height: 140px;
    margin: 20px;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  }

  .users-card h2 {
    width: 100%;
    height: 60px;
    background-color: #5680e9;
    text-align: right;
    margin: 0 0 20px 0;
    color: #e5e8f7;
    text-transform: uppercase;
    padding: 20px 20px 20px 200px;
    text-overflow: ellipsis;
  }

  .users-card img {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 20px;
    left: 40px;
    background-color: #c1c8e4;
    border: 5px solid #c1c8e4;
    border-radius: 5px;
  }

  .users-card .description {
    min-height: 80px;
    margin: 10px 20px 10px 180px;
    text-align: justify;
  }

  
  .users-card button {
    width: 200px;
    height: 40px;
    border: none;
    background-color: #5680e9;
    color: #e5e8f7;
    font-size: 1.3em;
    font-weight: 700;
    cursor: pointer;
  }

  .users-card button:hover {
    background-color: #2f59c4;
  }

  .users-card .back-to-search-btn{
    margin-left: 20px;
  }

  .member-card {
    position: relative;
    background-color: #c1c8e4;
    width: 660px;
    min-height: 140px;
    margin: 20px;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  }

  .member-card button {
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

  .member-card button:hover {
    background-color: #2f59c4;
  }

  @media screen and (max-width: 767px){
    .users-page {
      padding: 0;
    }

    .users-card .description {
      margin: 20px; 
    }

    .users-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin: 0;
    }

    .users-card h2 {
      height: 100px;
      text-align: center;
      padding: 20px 10px;
    }

    .users-card img {
      position: relative;
      top: -40px;
      left: 0;
    }

    .users-card button {
      position: static;
      margin: 0 0 20px;
    }

    .member-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 95%;
    }
  }
</style>