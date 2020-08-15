<template>
    <div>
        <van-field v-model="content" :rule="rule" :label="lable" :type="type" :placeholder="placeholder" />
    </div>
</template>

<script>
export default {
    data(){
        return {
            content:''
        }
    },
    name:'LoginText',
    props:['lable','rule','type','placeholder'],
    methods:{
        handlerulg(){
            const rue=new RegExp(this.rule)
            if(rue.test(this.content)){
                // console.log('成功')
                this.$emit('inputChage',this.content)
            }
        }
    },
    watch:{
        content(){
            //console.log('aaa')
            this.handlerulg()
        }
    }
}
</script>

<style scoped>
</style>