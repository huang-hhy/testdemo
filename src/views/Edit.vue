<template>
    <div class="editViews">
        <div style="margin-bottom:10px"><nav-bar></nav-bar></div>
       
       <div class="uploadfile">
           <van-uploader class="uploadimg" :after-read="afterHead" preview-size="100vw" />
           <edit-banner  left="头像">    
                <img :src="model.user_img"  slot="right" v-if="model.user_img" alt="">
                <img src="@/assets/default_img.jpg"  slot="right" alt="" v-else>
           </edit-banner>
       </div>
       <edit-banner left="昵称" @bannerClick="show=true">
           <a href="javascript:;" slot="right">{{model.name}}</a>
       </edit-banner>
       <edit-banner left="账号">
           <a href="javascript:;" slot="right">{{model.username}}</a>
       </edit-banner>
       <edit-banner left="姓别" @bannerClick="gendershow=true">
            <a href="javascript:;" slot="right">{{model.gender==1?'男':'女'}}</a>
       </edit-banner>
       <edit-banner left="个性签名" @bannerClick="textshow=true"></edit-banner>

        <div class="editback" @click="$router.back()">返回个人中心</div>

       <van-dialog v-model="show" title="昵称" @cancel="content=''" show-cancel-button @confirm="confirmClick">
           <van-field v-model="content" autofocus=""/>
       </van-dialog>

        <van-dialog v-model="textshow" title="个性" @cancel="content=''" show-cancel-button @confirm="textareaClick">
           <van-field v-model="content"  type="textarea" autofocus=""/>
       </van-dialog>

        <van-action-sheet v-model="gendershow" :actions="actions" cancel-text="取消" @select="onSelect"/>

    </div>
</template>

<script>
import navBar from '@/components/common/Navbar.vue'
import editBanner from '@/components/common/editBanner.vue'

export default {
    data(){
        return{
            model:{},
            show:false,
            textshow:false,
            gendershow:false,
            content:'',
            actions:[
                 {name:'男',val:1},
                {name:'女',val:0},
                
            ],
        }
    },
    components:{
        navBar,
        editBanner
    },
    methods:{
       async selectUser(){
            const res=await this.$http.get('/user/' + localStorage.getItem('id'))
            // console.log(res)
            this.model=res.data[0]
        },
       async afterHead(file){
            // console.log(file)
            const fromdata=new FormData()
            fromdata.append('file',file.file)
            const res=await this.$http.post('/upload',fromdata)
            // console.log(res)
            this.model.user_img=res.data.url
             this.UserUpdate()
        },
        async UserUpdate(){
            const res=await this.$http.post('/update/'+localStorage.getItem('id'),this.model)
            if(res.data.code==200){
                this.$msg.fail('修改成功')
            }
        },
        confirmClick(){
            this.model.name=this.content
             this.UserUpdate()
             this.content=""
        },
        textareaClick(){
            this.model.user_desc=this.content
             this.UserUpdate()
             this.content=""
        },
        onSelect(data){
            this.model.gender=data.val
             this.UserUpdate()
             this.gendershow=false
        }
    },
    created(){
        this.selectUser()
    }
}
</script>

<style lang="scss" scoped>
.editViews a{
    color: #333;
}
.editViews img{
   width: 46px;
   height: 46px;
   border-radius: 50%;
}
.uploadfile{
    position: relative;
    overflow: hidden;
    .uploadimg{
        position: absolute;
        opacity: 0;
    }
}
.editback{
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    padding: 15px 0;
    font-size: 5vw;
    background-color: white;
    cursor: pointer;
}
</style>