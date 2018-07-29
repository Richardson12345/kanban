<template>
 <div>
  <div class="container">
    <h1>{{ msg }}</h1>
    <br>
     <div class="row justify-content-center">
       <div class="column md-6 ">
         <h3> ADD A NEW TODO :</h3>
         <br>
         <h4>Input Title: </h4>
         <input  v-model="title" class="input-group mb-3" type="text"  placeholder="title">
         <h4>Input Description :</h4>
         <input  v-model="description" class="input-group mb-3" type="text"  placeholder="description">
         <button @click="submitTodo(title, description)" type="button" class="btn btn-outline-primary">Submit Todo</button>
         <br>
       </div>
     </div>
    <br>
    <hr>
    <div class="row ">
      <div class="column col-md-4 ">
        <h1>todo</h1>
        <div class="card" style="width: 18rem;" v-for="(todoItem, key) in todo"
          v-bind:key=key>
          <div class="card-body">
            <h6 class="card-title">{{todoItem.todoTitle}}</h6>
            <h6 class="card-subtitle mb-2 text-muted">code:{{todoItem.todoCode}}</h6>
            <p class="card-text">{{todoItem.todoDescription}}</p>
            <button @click="moveTodo(todoItem.todoCode, todoItem.todoTitle, todoItem.todoDescription)" type="button" class="btn btn-success btn-sm">progress</button>
          </div>
        </div>
      </div>
      <div class="column col-md-4">
        <h1>doing</h1>
        <div class="card" style="width: 18rem;" v-for="(doingItem, key) in doing"
          v-bind:key=key>
          <div class="card-body">
            <h6 class="card-title">{{doingItem.doingTitle}}</h6>
            <h6 class="card-subtitle mb-2 text-muted">code: {{doingItem.doingCode}}</h6>
            <p class="card-text">{{doingItem.doingDescription}}</p>
            <button @click="revertDoing(doingItem.doingCode, doingItem.doingTitle, doingItem.doingDescription)"   type="button" class="btn btn-danger btn-sm">revert</button> | | 
            <button @click="progressDoing(doingItem.doingCode, doingItem.doingTitle, doingItem.doingDescription)" type="button" class="btn btn-success btn-sm">progress</button>
          </div>
        </div>
      </div>  
      <div class="column col-md-4">
        <h1>done</h1>
        <div class="card" style="width: 18rem;" v-for="(doneItem, key) in done"
          v-bind:key=key>
          <div class="card-body">
            <h6 class="card-title">{{doneItem.doneTitle}}</h6>
            <h6 class="card-subtitle mb-2 text-muted">code: {{doneItem.doneCode}}</h6>
            <p class="card-text">{{doneItem.doneDescription}}</p>
            <button @click="revertDone(doneItem.doneCode, doneItem.doneTitle, doneItem.doneDescription)" type="button" class="btn btn-danger btn-sm">revert</button> || 
            <button @click="finishAndDelete(doneItem.doneCode)" type="button" class="btn btn-warning btn-sm">delete</button>
          </div>
        </div>
      </div>
    </div>
   </div>
 </div>
</template>

<script>

import { mapState , mapActions } from 'vuex';

export default {
  name: 'HelloWorld',
  data(){
    return {
      msg : "welcome to hontoni subarashi kanban",
      title: '',
      description: ''
    }
  },
  computed: {
    ...mapState([
      'todo',
      'doing',
      'done'
    ])
  }
  ,
  methods: {
    ...mapActions([
      'addTodo',
      'getTodo',
      'getDone',
      'progressTodo',
      'getDoing',
      'regressDoing',
      'proceedDoing',
      'regressDone',
      'deleteDone'

    ]),
    submitTodo(title, description){
      let contentObj = {
        title,
        description
      }
      this.addTodo(contentObj)
    },
    moveTodo( todoCode, todoTitle, todoDescription ){
      let todoObj = {
        todoCode,
        todoTitle,
        todoDescription 
      };
      this.progressTodo(todoObj)
    },
    revertDoing(doingCode, doingTitle, doingDescription){
      let doingObj = {
        doingCode,
        doingTitle,
        doingDescription
      };
     this.regressDoing(doingObj)
    },
    progressDoing(doingCode, doingTitle, doingDescription){
      let doingObj = {
        doingCode,
        doingTitle,
        doingDescription
      };
      this.proceedDoing(doingObj)
    },
    revertDone(doneCode, doneTitle, doneDescription){
      let doneObj = {
        doneCode,
        doneTitle,
        doneDescription
      }
      this.regressDone(doneObj)
    },
    finishAndDelete(doneCode){
      this.deleteDone(doneCode)
    }
  },
  mounted(){
    this.getTodo(),
    this.getDoing(),
    this.getDone()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
