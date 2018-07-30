<template>
    <div class="column col-md-3 ">
      <h1>backlog</h1>
      <div class="card" style="width: 18rem;" v-for="(backlogItem, key) in backlog"
        v-bind:key=key>
        <div class="card-body">
          <h6 class="card-title">{{backlogItem.backlogTitle}}</h6>
          <h6 class="card-subtitle mb-2 text-muted">code:{{backlogItem.backlogCode}}</h6>
          <p class="card-text">{{backlogItem.backlogDescription}}</p>
          <button @click="proceedBacklog(backlogItem.backlogCode, backlogItem.backlogTitle, backlogItem.backlogDescription)" type="button" class="btn btn-success btn-sm">progress</button>
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
       this.getBacklog()
    }  
}
</script>

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