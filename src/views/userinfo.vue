<template>
    <div class="userinfo">
        <nav-bar></nav-bar>
        <img class="info" src="@/assets/bannerTop_new.png" alt="">
        <user-detail :userInfo="model"></user-detail>
        <user-article />
    </div>
</template>

<script>
import navBar from '@/components/common/Navbar.vue'
import userDetail from '@/components/userComponents/userDetail'
import userArticle from '@/components/userComponents/userArticle'

export default {
    data(){
        return{
            model:{}
        }
    },
    components:{
        navBar,
        userDetail,
        userArticle
    },
    methods:{
        async UserinfoData(){
            // console.log('成功')
        const res=await this.$http.get('/user/' + localStorage.getItem('id'))
        // console.log(res)
        this.model=res.data[0]
        }
    },
    created(){
        this.UserinfoData()
    }
}
</script>

<style scoped>
.userinfo .info{
        width:100%;
        height:110px;
    }

</style>