<template>
    <div class="navbar">
        <div class="logo">
            <img src="@/assets/logo.png" @click="$router.push('/')" alt="">
        </div>
        <div>
            <p>
                    
                <van-icon class="ipt-icon" name="search"/>
            </p>
        </div>
        <div>
            <img :src="imgUrl" @click="$router.push('/edit')" alt="" v-if="imgUrl">
            <img src="@/assets/default_img.jpg" @click="$router.push('/login')" alt="" v-else>
            <p>下载app</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            imgUrl:''
        }
    },
    async mounted(){
        if(localStorage.getItem('token')){
            const res=await this.$http.get('/user/'+localStorage.getItem('id'))
            this.imgUrl=res.data[0].user_img
        }
    }
}
</script>

<style scoped>
.navbar{
    height: 12.5vw;
    background-color: white;
    display: flex;
}
.navbar .logo{
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.navbar div:nth-child(2){
   flex: 1;
   display: flex;
   align-items: center;
   justify-content: center;
}
.navbar div:nth-child(2) p{
    background-color: #f4f4f4;
    padding: 14px 0;
    width: 90%;
    border-radius: 7px;
    position: relative;
     font-size: 12px;
    line-height: 12px;
}
.navbar div:nth-child(2) p .ipt-icon{
    position: absolute;
    top: 20%;
    transform: translate(0,22%);
    margin-left: 10px;
}
.navbar div:nth-child(3){
    display: flex;
    justify-content: center;
    align-items: center;
}
.navbar div:nth-child(3) img{
    width: 24px;
    height: 24px;
}
.navbar div:nth-child(3) p{
   
   padding: 5px 10px;
   margin: 0 8px;
   background-color: #fb7299;
   color: white;
   font-size: 13px;
   
}
.navbar .logo img{
    width: 80%;
}
</style>