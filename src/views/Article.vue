<template>
    <div v-if="model">
        <nav-bar></nav-bar>
        <div class="detailinfo">
            <div class="video">
                <video controls="controls" :src="model.content"></video>
            </div>
            <div class="detailinfoText">
                <div>
                    <span>{{model.category.title}}</span>
                    <span>{{model.name}}</span>
                </div>
                <div>
                    <span>{{model.userinfo.name}}</span>
                    <span>1314次观看</span>
                    <span>520弹幕</span>
                    <span>{{model.date}}</span>
                </div>
                <div>
                    <p @click="collectionClick" :class="{activeColor:collectionActive}">
                        <span></span>
                        <span>收藏</span>
                    </p>
                    <p>
                        <span></span>
                        <span>缓存</span>
                    </p>
                    <p>
                        <span></span>
                        <span>分享</span>
                    </p>
                </div>
            </div>         
        </div>
        <div class="detailparent">
            <cover class="detailitem" v-for="(item,index) in commendList" :key="index" :detailitem="item" />
            
        </div>
        <div style="background-color: white;">
             <comment-title :dataLength="lens" @Postcomment="PostSuccess" ref="commentIpt"></comment-title>
            <comment ref="commentPublish"  @publishClick="PostChildClick" @lengthselect="len => lens=len"></comment>
        </div>
       
    </div>
</template>

<script>
import navBar from '@/components/common/Navbar.vue'
import cover from './cover'
import commentTitle from '@/components/article/commentTitle.vue'
import comment from '@/components/article/comment.vue'

export default {
    data(){
        return{
            model:null,
            commendList:null,
            myuser:null,
            lens:null,
            Postcom:{
                comment_content:'',
                comment_date:'',
                parent_id:null,
                article_id:null
            },
            collectionActive:null
        }
    },
    components:{
        navBar,
        cover,
        commentTitle,
        comment
    },
    methods:{
       async articleitemData(){
        //    console.log(this.$route)
           const res=await this.$http.get('/article/'+this.$route.params.id)             
            this.model=res.data[0]
            // console.log(res)
       },
       async commendData(){
           const res=await this.$http.get('/commend')
            this.commendList=res.data
       },
       //发送评论
      async PostSuccess(res){
           const date=new Date()
           let m=date.getMonth()+1
           let d=date.getDate()
           if(m<10){
               m='0'+m
           }
           if(d<10){
               d='0'+d
           }
            let str=`${m}-${d}`

            // console.log(str)
        this.Postcom.comment_content=res
        this.Postcom.comment_date=str
        this.Postcom.article_id=this.$route.params.id
       const result =await this.$http.post('/comment_post/'+localStorage.getItem('id'),this.Postcom)
    //    console.log(result)
        this.$refs.commentPublish.commentData()
       },
       PostChildClick(id){
           this.Postcom.parent_id=id
           this.$refs.commentIpt.focusIpt()
       },
       //收藏
       async collectionClick(){
        //    console.log('jjj')
        if(localStorage.getItem('token')){
            const res=await this.$http.post("/collection/"+localStorage.getItem('id'),{article_id:this.$route.params.id})
            // console.log(res)
            if(res.data.msg=='收藏成功'){
                this.collectionActive=true
            }else{
                this.collectionActive=false
            }
        }
       },

       async collectionInit(){
           if(localStorage.getItem('token')){
               const res=await this.$http.get('/collection/'+localStorage.getItem('id'),{
                   params:{
                       article_id:this.$route.params.id
                   }
               })
               this.collectionActive=res.data.success
           }
       }
       
    },
    created(){
        this.articleitemData()
        this.commendData()
        this.collectionInit()
        
    },
    watch:{
        $route(){
            this.articleitemData()
            this.commendData()
             this.collectionInit()
        }
    }
}
</script>

<style lang="scss" scoped>
.detailinfo{
    background-color: white;
    .video{
        width: 100%;
        video{
            width: 100%;
        }
    }
}
.detailinfoText{
    padding: 15px;
    div:nth-child(1){
        span:nth-child(1){
            padding-right: 0 10px;
            color: #fb7299;
            background-color: #f4f4f4;
            border-radius: 10px;
        }
    }
    div:nth-child(2){
        padding: 2.778vw 0.778vw;
        span{
            color: #aaa;
            font-size: 3.333vw;
            margin-right: 5px;
        }
        span:nth-child(1){
            color: black;
            font-size: 4vw;
            padding-right: 2.778vw;
        }
    }
    div:nth-child(3){
        display: flex;
        .activeColor{
            color: brown;
        }
        p{
            color: #757575;
            margin-right: 15px;
            span{
                padding-right: 3px;
            }
        }
    }
}
.detailparent{
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  justify-content: space-around;
  .detailitem{
    width: 45%;
    margin: 5px 0;
  }
}
</style>