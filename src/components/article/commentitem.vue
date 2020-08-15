<template>
    <div class="commenttitle">
        <div class="commentItem" v-for="(item,index) in commentChild" :key="index">
                <div class="userImg">
                     <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img">
                     <img v-else src="@/assets/default_img.jpg">
                </div>           
                    <p>
                        <span v-if="item.userinfo">{{item.userinfo.name}}</span>
                        <span v-else>此用户无名</span>
                        <span>{{item.comment_date}}</span>
                    </p>
                <div class="commentContent">
                    <div v-if="!temp">
                        {{item.comment_content}}<span class="publish">回复</span>
                    </div>
                    <div v-else>
                        回复 <span style="color:#478efe">{{item.parent_user_info.name}}</span> :{{item.comment_content}}
                    </div>
                </div>
                <commentchild-item :commentChild="item.child" temp="true"></commentchild-item>
        </div>  
            
    </div>
</template>

<script>
export default {
    name:'commentchildItem',
    props:['commentChild','temp']
}
</script>

<style lang="scss" scoped>
.commenttitle{
    .commentItem{
        display: flex;
        flex-direction: column;
    }
    .userImg{
        display: flex;
        p{
            flex: 1;
            display: flex;
            justify-content: space-between;
            color: #555;
            margin: 5px;
        }
    }
    .commentContent{
        position: relative;
        margin-bottom: 2.778vw;
        .publish{
            position: absolute;
            right: 15px;
            color: red;
        }
    }
}
</style>