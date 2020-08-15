<template>
    <div @click="bannerClick">
        <div class="editbanner">
            <span>{{left}}</span>
            <span><slot name="right"/></span>
        </div>
    </div>
</template>

<script>
export default {
    props:['left'],
    methods:{
        bannerClick(){
            this.$emit('bannerClick')
        }
    }
}
</script>

<style lang="scss" scoped>
.editbanner{
    background-color: white;
    padding: 15px;
    font-size: 16px;
    color: #ccc;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #eee ;
}
</style>