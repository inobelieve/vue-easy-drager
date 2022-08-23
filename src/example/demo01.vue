<template>
    <div class="container">
        <div v-drag="{
              handler: handleDrag,
              limit
             }" class="drager drager-area">xy:{{location.join('-')}}</div>
        <div v-drag-x="{
            limit: limitX
        }" class="drager drager-x">move-x</div>
        <div v-drag-y="{
            limit: limitY
        }" class="drager drager-y">move-y</div>
        <div class="x-line"></div>
        <div class="y-line"></div>
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
                },
                limitX: {
                    x: [0, 500]
                },
                limitY: {
                    y: [0, 400]
                },
                location: [0, 0]
            }
        },
        methods: {
            handleDrag (e) {
                const {left, top} = e
                console.log(e)
                this.location = [left, top]
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
            font-size: 15px;
            text-align: center;
            line-height: 100px;
            z-index: 1;
            text-transform: uppercase;
        }
        .drager-x {
            top: 400px;
            left: 0;
        }
        .drager-y {
            top: 0;
            left: 700px;
        }
        .x-line {
            height: 1px;
            background-color: #ccc;
            position: absolute;
            top: 450px;
            width: 600px;
        }
        .y-line {
            width: 1px;
            background-color: #ccc;
            position: absolute;
            top: 0;
            left: 750px;
            height: 500px;
        }
    }
</style>
