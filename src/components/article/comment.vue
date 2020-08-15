<template>
    <div class="commentParent">
        <div v-for="(item,index) in commentList" :key="index">
            <div class="commentItem">
                <div class="userImg">
                    <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img">
                    <img v-else src="@/assets/default_img.jpg">
                </div>
                <div class="commentContent">
                    <p>
                        <span v-if="item.userinfo">{{item.userinfo.name}}</span>
                        <span v-else>此用户无名</span>
                        <span>{{item.comment_date}}</span>
                    </p>
                    <div>
                        {{item.comment_content}}
                        <span class="publishs" @click="publishClick(item.comment_id)">回复</span>
                    </div>
                </div>
            </div>
            <div style="padding-left:30px">
                <commentitem :commentChild="item.child"></commentitem>
            </div>
        </div>
    </div>
</template>

<script>
import commentitem from '@/components/article/commentitem.vue'

export default {
    data(){
        return{
            commentList:null
        }
    },
    components:{
        commentitem
    },
    methods:{
      async commentData(){
          const res=await this.$http.get('/comment/' + this.$route.params.id)
        //  console.log(res.data)
        if(res.data){
            this.$emit('lengthselect',res.data.length)
        }
        this.commentList = this.changeCommentData(res.data)
        },

        changeCommentData(data){
        function fn(temp){
            let arr1=[]
            for(var i=0; i<data.length; i++){
                if(data[i].parent_id==temp){
                    arr1.push(data[i])
                    data[i].child=fn(data[i].comment_id)
                }
            }
            return arr1
         }
         return fn(null)
        },

        publishClick(id){
            this.$emit('publishClick',id)
        }
    },
    
    created(){
        this.commentData()
    }
}
</script>

<style lang="scss">
.commentParent{
     padding: 10px 10px;
     >div{
           border-bottom: 1px solid #e7e7e7;
     }
    .commentItem{
        display: flex;
      
        padding: 10px 0;
        .userImg{
            margin-right: 10px;
            img{
                width: 35px;
                height: 35px;
            }
        }
        .commentContent{
            flex: 1;
            position: relative;
            p{
                display: flex;
                justify-content: space-between;
                color: #555;
                margin: 5px;
            }
            div{
                color: #555;
            }
            .publishs{
                color: red;
                position: absolute;
                right: 0;
            }
        }
    }
   
}
</style>