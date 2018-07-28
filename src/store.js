import Vue from 'vue'
import Vuex from 'vuex'
import { database } from './firebase.js'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todo : [],
    doing : [],
    done : []
  },
  mutations: {
    GET_TODO: (state, todoArr)=>{
     state.todo = todoArr;
    },
    GET_DOING: (state, doingArr)=>{
      console.log(doingArr)
      state.doing = doingArr
    },
    GET_DONE: (state, doneArr)=>{
      // console.log(doneArr)
      state.done = doneArr
    }
  },
  actions: {
    getDoing(context){
            database.ref('doing/').on('value', function(snapshot){
              let doingArr = []
              let doing = snapshot.val();
              for(var item in doing){
                let doingCode = item;
                database.ref('doing/' + doingCode).on('value', function(snapshot){
                  let doingObj = {
                    doingCode : doingCode,
                    doingTitle: snapshot.val().doingTitle,
                    doingDescription: snapshot.val().doingDescription
                  };
                  doingArr.push(doingObj)
                })
              }
              context.commit('GET_DOING', doingArr)
            })
    },
    getTodo(context){
          database.ref('todo/').on('value', function(snapshot){
            let playerArr = []
            let todo = snapshot.val();
            for(var item in todo){
              let itemCode = item;
              database.ref('todo/' + itemCode).on('value', function(snapshot){
                let todoObj = {
                  todoCode : itemCode,
                  todoTitle : snapshot.val().title,
                  todoDescription : snapshot.val().description
                }
                playerArr.push(todoObj)
              })
            }
            context.commit('GET_TODO', playerArr)
          })
    },
    getDone(context){
      database.ref('done/').on("value", function(snapshot){
        let doneArr = []
        let done = snapshot.val();
        for(var item in done){
          let itemCode = item;
          database.ref('done/' + itemCode).on("value", function(snapshot){
            doneArr.push({
              doneCode : itemCode,
              doneTitle: snapshot.val().title,
              doneDescription: snapshot.val().description
            })
          })
        };
        context.commit("GET_DONE", doneArr)
      })
        
    },
    addTodo(context, todoObj){
      database.ref('todo/').push().set(
        todoObj
      ,(err)=>{
        if(!err){
          let playerArr = []
          alert("succesfully added todo")
          database.ref('todo/').on('value', function(snapshot){
            let todo = snapshot.val();
            for(var item in todo){
              let itemCode = item;
              database.ref('todo/' + itemCode).on('value', function(snapshot){
                let todoObj = {
                  todoCode : itemCode,
                  todoTitle : snapshot.val().title,
                  todoDescription : snapshot.val().description
                }
                playerArr.push(todoObj)
              })
            }
            context.commit('GET_TODO', playerArr)
          })
        }
      })
    },
    addDone(contet, doingObj){

    },
    progressTodo(context, todoObj){
      console.log(todoObj)

      database.ref('/doing').push().set(
        {
          doingTitle : todoObj.todoTitle,
          doingDescription : todoObj.todoDescription
        },
        function(err){
          if(!err){
            // creating moving to dpoking
            
            database.ref('doing/').on('value', function(snapshot){
              let doingArr = []
              let doing = snapshot.val();
              for(var item in doing){
                let doingCode = item;
                database.ref('doing/' + doingCode).on('value', function(snapshot){
                  let doingObj = {
                    doingCode : doingCode,
                    doingTitle: snapshot.val().doingTitle,
                    doingDescription: snapshot.val().doingDescription
                  };
                  doingArr.push(doingObj)
                })
              }
              context.commit('GET_DOING', doingArr)
            })
            // deleting the todo
            database.ref('todo/' + todoObj.todoCode).remove();
            database.ref('todo/').on('value', function(snapshot){
              let todo = snapshot.val();
              let playerArr = []
              for(var item in todo){
                let itemCode = item;
                database.ref('todo/' + itemCode).on('value', function(snapshot){
                  let todoObj = {
                    todoCode : itemCode,
                    todoTitle : snapshot.val().title,
                    todoDescription : snapshot.val().description
                  }
                  playerArr.push(todoObj)
                })
              }
              context.commit('GET_TODO', playerArr);
            })
          }
        }
      )
    },
    regressDoing(context, doingObj){
      console.log(doingObj)
      database.ref('doing/' + doingObj.doingCode).remove();
      database.ref('todo/').push().set({
        title: doingObj.doingTitle,
        description: doingObj.doingDescription
       }
      ,(err)=>{
        if(!err){
          database.ref('todo/').on('value', function(snapshot){
            let playerArr = []
            let todo = snapshot.val();
            for(var item in todo){
              let itemCode = item;
              database.ref('todo/' + itemCode).on('value', function(snapshot){
                let todoObj = {
                  todoCode : itemCode,
                  todoTitle : snapshot.val().title,
                  todoDescription : snapshot.val().description
                }
                playerArr.push(todoObj)
              })
            }
            context.commit('GET_TODO', playerArr)
          })
        }
      })
    },
    proceedDoing(context, doingObj){
      console.log(doingObj)
      database.ref('doing/' + doingObj.doingCode).remove();
      database.ref('done/').push().set({
        title: doingObj.doingTitle,
        description: doingObj.doingDescription
      },(err)=>{
        if(!err){
          database.ref('done/').on("value", function(snapshot){
            let doneArr = []
            let done = snapshot.val();
            for(var item in done){
              let itemCode = item;
              database.ref('done/' + itemCode).on("value", function(snapshot){
                doneArr.push({
                  doneCode : itemCode,
                  doneTitle: snapshot.val().title,
                  doneDescription: snapshot.val().description
                })
              })
            };
            context.commit("GET_DONE", doneArr)
          })
        }
      })

    },
    regressDone(context, doneObj){
      console.log(doneObj);
      let doingObj = {
        title: doneObj.doneTitle,
        description: doneObj.description
      }
      database.ref('done/' + doneObj.doneCode).remove();
      database.ref('doing/').push().set({
        doingTitle: doneObj.doneTitle,
        doingDescription: doneObj.doneDescription
      },(err)=>{
        alert("whats done is now undone")
      })
    }

  }
})

