<template>
    <div class="container">
        <div v-drag="true" class="drager">1234</div>
    </div>
</template>

<script>
    export default {
        name: "demo01"
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