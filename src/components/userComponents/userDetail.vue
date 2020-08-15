<template>
    <div class="userdetail">
        <div style="display:flex">
            <div class="user_img">
                <img :src="userInfo.user_img" v-if="userInfo.user_img">
                <img src="@/assets/head_img.jpg" v-else>
            </div>
                <div class="user_edit">
                    <div>
                        <p>
                            <span>0</span>
                            <span class="user_text">粉丝</span>
                        </p>
                        <p>
                            <span>54</span>
                            <span class="user_text">关注</span>
                        </p>
                        <p>
                            <span>0</span>
                            <span class="user_text">获赞</span>
                        </p>
                    </div>
                    <div @click="$router.push('/edit')">
                         <div class="user_editBtn" >编辑资料</div>
                    </div>                  
            </div>
        </div>
        <div>
            <!-- <p style="border-bottom: 1px solid #aaa;color:#aaa; padding-bottom:10px; font-size: 13px;">这个人很神秘，神秘都没有哦</p> -->
            <!-- <span style="color:#aaa;margin-right: 5px; display: inline;line-height: 30px;">动态</span>
            <span style="color:#aaa;margin-right: 5px; display: inline;line-height: 30px;">视频</span> -->
            <h2>{{userInfo.name}}</h2>
            <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
            <p v-else>这个人很神秘，什么都没有写</p>
        </div>       
    </div>
</template>

<script>
export default {
    props:['userInfo']
}
</script>

<style scoped>
.userdetail{
    background-color: white;
    padding: 0 12px;
    font-size: 13px;
    margin-right: 5px;
    
}
.user_img{
    margin-right: 20px;
}
.user_img img{
    height: 85px;
    height: 85px;
    border-radius: 50%;
}
.user_edit{
    flex: 1;
    margin: 10px;
}

.user_edit div:nth-child(1){
    display: flex;
}
.user_edit div:nth-child(1) p{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 13px;
}
.user_edit div:nth-child(1) p .user_text{
    color: #aaa;
}
.user_edit div:nth-child(1) p:nth-child(1),p:nth-child(2){
    border-right: 1px solid #ccc;
}

.user_edit div:nth-child(2) .user_editBtn{
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #fb7a9f;
    padding: 3px;
    color: #fb7a9f;
    border-radius: 3px;
    margin-top: 10px;
}
</style>>
