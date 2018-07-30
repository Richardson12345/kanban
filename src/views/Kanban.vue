<template>
    <div class="container">
        <h1>wellcome to hontoni subarashi kanban</h1>
        <br>
        <add/>
        <br>
        <hr>
        <div class="row">
            <backlog/>
            <todo/>
            <doing/>
            <done/>
        </div>
    </div>
</template>

<script>

import add from "@/components/addComponent.vue"
import backlog from "@/components/backlogComponent.vue"
import todo from "@/components/todoComponent.vue"
import doing from "@/components/doingComponent.vue"
import done from "@/components/doneComponent.vue"


export default {
    components: {
        add,
        backlog,
        todo,
        doing,
        done
    }
}
</script>
