<template>
    <div @click="pathPush()">
        <div class="detailItem">
            <div class="imgparent">
                <img :src="detailitem.img" alt="" style="width:100%">
                <p>{{detailitem.name}}</p>
                <div class="yy">
                    <span class="video">1314</span>
                    <span class="comment">{{!detailitem.commentlen ? 66: detailitem.commentlen}}</span>
                </div>
            </div>
        
        </div>
    </div>
    
</template>

<script>
export default {
    props:['detailitem'],
    methods:{
        pathPush(){
           if(this.$route.path != `/article/${this.detailitem.id}`){
                this.$router.push(`/article/${this.detailitem.id}`)
           }
        }
    }
}
</script>

<style lang="scss" scoped>
.detailItem{
    p{
        font-size: 12px;
    }
}
.imgparent{
    position: relative;
    .yy{
        background-color: #ccc;
        .video{
        position: absolute;
        left: 5px;
        bottom: 35px;
    }
    .comment{
        position: absolute;
        right: 5px;
        bottom: 35px;
    }
    }
    
}
</style>