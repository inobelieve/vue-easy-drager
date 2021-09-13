<template>
    <div class="container">
        <div v-drag="{
              handler: handleDrag,
              limit
             }" class="drager">1234</div>
    </div>
</template>

<script>
    export default {
        name: "demo01",
        data () {
            return {
                limit: {
                    y: [0, 870],
                    x: [0, 1820]
                }
            }
        },
        methods: {
            handleDrag (e) {
                console.log(e)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        width: 100vw;
        height: 100vh;
        background-color: #ffffff;
        overflow: hidden;
        position: relative;
        user-select: none;
        .drager {
            width: 100px;
            height: 100px;
            background-color: #cccccc;
        }
    }
</style>