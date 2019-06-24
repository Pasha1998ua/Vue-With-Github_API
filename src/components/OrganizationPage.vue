<template>
  <div class="organization-page">
    <div class="organization-card">
      <h2>{{this.data.login}}</h2>
      <img v-bind:src="this.data.avatar_url" alt="org logo"/>
      <p class="description">Description: {{this.data.description}}</p>
      <router-link to="/"><button>Back to search</button></router-link>
      <hr/>
      <div class="member-card" v-for="member in members" v-bind:key="member.id">
        <h2>{{member.login}}</h2>
        <img v-bind:src="member.avatar_url" alt="org logo"/>
        <router-link v-bind:to="'/users/following/' + member.login"><button>Following</button></router-link>
        <router-link v-bind:to="'/users/followers/' + member.login"><button>Followers</button></router-link>
        <router-link v-bind:to="'/user/' + member.login"><button>Detailed Info</button></router-link>
      </div>
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
      .get(`https://api.github.com/orgs/${this.$route.params.login}`)
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
    axios
      .get(`https://api.github.com/orgs/${this.$route.params.login}/members`)
      .then(response => {
        this.members = response.data;
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

  .organization-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    width: 100%;
    min-height: 100%;
  }

  .organization-card {
    position: relative;
    background-color: #c1c8e4;
    width: 700px;
    min-height: 140px;
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
    position: absolute;
    width: 100px;
    height: 100px;
    top: 20px;
    left: 40px;
    background-color: #c1c8e4;
    border: 5px solid #c1c8e4;
    border-radius: 5px;
  }

  .organization-card .description {
    min-height: 80px;
    margin: 10px 20px 10px 180px;
    text-align: justify;
  }

  
  .organization-card button {
    margin: 10px 40px;
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

  .member-card {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    background-color: #c1c8e4;
    width: 660px;
    min-height: 140px;
    margin: 20px;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  }

  .member-card button {
    margin: 70px 10px 20px 10px;
    width: 200px;
    height: 40px;
    border: none;
    background-color: #5680e9;
    color: #e5e8f7;
    font-size: 1.2em;
    font-weight: 700;
    cursor: pointer;
  }

  .member-card button:hover {
    background-color: #2f59c4;
  }

   @media screen and (max-width: 767px){
    .organization-page {
      padding: 0;
    }

    .organization-card .description {
      margin: 20px; 
    }

    .organization-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .organization-card h2 {
      height: 100px;
      text-align: center;
      padding: 10px;
    }

    .organization-card img {
      position: relative;
      top: -40px;
      left: 0;
    }

    .organization-card button {
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
