<template>
    <div class="container">
        <div v-drag="{
              handler: handleDrag,
              limit
             }" class="drager drager-area">area</div>
        <div v-drag-x="true" class="drager drager-x">x</div>
        <div v-drag-y="true" class="drager drager-y">y</div>
    </div>
</template>

<script>
    export default {
        name: "demo01",
        data () {
            return {
                limit: {
                    y: [0, 200],
                    x: [0, 500]
                }
            }
        },
        methods: {
            handleDrag (e) {
                // console.log(e)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        width: 600px;
        height: 300px;
        border: 1px solid #cccccc;
        background-color: #ffffff;
        overflow: visible;
        position: relative;
        left: 100px;
        top: 50px;
        user-select: none;
        .drager {
            width: 100px;
            height: 100px;
            background-color: #959595;
            font-size: 30px;
            text-align: center;
            line-height: 100px;
        }
        .drager-x {
            top: 400px;
            left: 0;
        }
        .drager-y {
            top: 400px;
            left: 400px;
        }
    }
</style>