<template>
    <div class="comment">
        <p class="comment-title">
            <span>评论</span>
            <span>({{dataLength}})</span>
        </p>
        <div class="commentMyinfo">
            <img :src="myuser.user_img" alt="" v-if="myuser">
            <img src="@/assets/default_img.jpg" alt="" v-else>
            <input v-model="comcontent" ref="Postipt" type="text" placeholder="说点什么吧">
            <button @click="cmmentPublish">发表</button>
        </div>
    </div>
</template>

<script>
export default {
    props:['dataLength'],
    data(){
        return{
            myuser:null,
            comcontent:''
        }
    },
    methods:{
        async myUsertinfo(){
           const res=await this.$http.get('/user/' + localStorage.getItem('id'))
            this.myuser=res.data[0]
       },
       cmmentPublish(){
           if(!this.myuser && !localStorage.getItem('token') && !localStorage.getItem('id')){
            //    alert('请先登录')
            this.$msg.fail('请先登录')
            return
           }
           this.$emit("Postcomment",this.comcontent)
           this.comcontent=""
       },
       focusIpt(){
           this.$refs.Postipt.focus()
       }
    },
    created(){
        if(localStorage.getItem('token')){
            this.myUsertinfo()
        }
       
    }
}
</script>

<style lang="scss" scoped>
.comment{
    position: relative;
    height: 40px;
    padding: 30px 10px;
    .comment-title{
        span:nth-child(2){
            color: #aaa;
            margin-left: 10px;
        }
    }
    .commentMyinfo{
        position: absolute;
        left: 0;
        bottom: 3px;
        padding: 2.778vw;
        display: flex;
        img{
            height: 7.944vw;
            width: 7.944vw;
            border-radius: 50%;
        }
        input{
            outline: none;
            border: 0;
            background-color: #f4f4f4;
            font-size: 12px;
            padding: 5px 20px;
            margin-left: 10px;
            border-radius: 10px;
        }
        button{
            outline: none;
            border: 0;
            border-radius: 50%;
            background: #fb7299;
            color: white;
            font-size: 3.33vw;
            padding: 0 4.167vw;
        }
    }
}
</style>