<template>
  <div class="user-page">
    <div class="user-card">
      <h2>{{this.data.name}}</h2>
      <img v-bind:src="this.data.avatar_url" alt="org logo"/>
      <p class="description">Bio: {{this.data.bio || "Not specified"}}</p>
      <p class="info">Company: {{this.data.company || "Not specified"}}</p>
      <p class="info">Location: {{this.data.location || "Not specified"}}</p>
      <p class="info">Email: {{this.data.email || "Not specified"}}</p>
      <p class="info">Blog: {{this.data.blog || "Not specified"}}</p>
      <router-link to="/"><button>Back to search</button></router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      data: {},
      members: []
    }
  },
  beforeMount: function () {
    axios
      .get(`https://api.github.com/users/${this.$route.params.login}`)
      .then(response => {
        this.data = response.data;
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

  .user-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    width: 100%;
    min-height: 100%;
  }

  .user-card {
    position: relative;
    background-color: #c1c8e4;
    width: 700px;
    min-height: 140px;
    margin: 20px;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  }

  .user-card h2 {
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

  .user-card img {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 20px;
    left: 40px;
    background-color: #c1c8e4;
    border: 5px solid #c1c8e4;
    border-radius: 5px;
  }

  .user-card .description {
    min-height: 80px;
    margin: 10px 20px 10px 180px;
    word-break: break-all; 
    text-align: justify;
  }

  .user-card .info {
    padding: 10px 40px;
    word-break: break-all; 
  }

  .user-card button {
    margin: 20px 40px;
    width: 200px;
    height: 40px;
    border: none;
    background-color: #5680e9;
    color: #e5e8f7;
    font-size: 1.3em;
    font-weight: 700;
    cursor: pointer;
  }

  .user-card button:hover {
    background-color: #2f59c4;
  }

  @media screen and (max-width: 767px){
    .user-page {
      padding: 0;
    }

    .user-card .description, .user-card .info{
      margin: 0;
      padding: 10px;
      min-height: 20px;
    }

    .user-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin: 0;
    }

    .user-card h2 {
      height: 100px;
      text-align: center;
      padding: 10px;
    }

    .user-card img {
      position: relative;
      top: -40px;
      left: 0;
    }

    .user-card button {
      position: static;
      margin: 0 0 20px;
    }
  }
</style>
