<template>
    <div class="column col-md-3">
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
      'done',
      'backlog'
    ])
  }
  ,
  methods: {
    ...mapActions([
      'addBacklog',
      'addTodo',
      'getTodo',
      'getDone',
      'getBacklog',
      'progressTodo',
      'progressBacklog',
      'getDoing',
      'regressDoing',
      'proceedDoing',
      'regressDone',
      'regressTodo',
      'deleteDone'

    ]),
    submitBacklog(title, description){
      let contentObj = {
        title,
        description
      }
      this.addBacklog(contentObj)
    },
    proceedBacklog(backlogCode, backlogTitle, backlogDescription){
       let backlogObj = {
         backlogCode,
         backlogTitle,
         backlogDescription 
       };
       this.progressBacklog(backlogObj)
     },
    revertTodo(todoCode, todoTitle, todoDescription){
      let todoObj = {
        todoCode,
        todoTitle,
        todoDescription 
      };
      this.regressTodo(todoObj)
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
