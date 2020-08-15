<template>
  <div class="home">
    <nav-bar></nav-bar>
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
       <!-- <div class="detailparent">
          <detail class="detailitem" :detailitem="categoryitem" v-for="(categoryitem,categoryindex) in item.list" :key="categoryindex"/>
       </div> -->
       <van-list
            v-model="item.loading"
            :immediate-check="false"
            :finished="item.finished"
            finished-text="我也是有底线的"
            @load="onLoad"
          >
            <div class="detailparent">
              <cover
                class="detailitem"
                :detailitem="categoryitem"
                v-for="(categoryitem,categoryindex) in item.list"
                :key="categoryindex"
              />
            </div>
          </van-list>
      </van-tab>
    </van-tabs>
    
  </div>
</template>

<script>
import navBar from '@/components/common/Navbar.vue'
import cover from './cover.vue'

export default {
data(){
  return{
    category:[],
    active:0
  }
},
components:{
  navBar,
  cover
},
methods:{
 async selectCategory(){
   const res=await this.$http.get('category')
  //  console.log(res)
  // this.category=res.data
  this.changeCategory(res.data)
  },
  changeCategory(data){
    const category1=data.map((item,index)=>{
      item.list=[]
      item.page=0
      item.finished=false
      item.loading=false
      item.pagesize=10
      return item
    })
    this.category=category1
    this.selectArticle()
  },
  async selectArticle(){
    const categoryitem=this.categoryItem()
    const res=await this.$http.get('/detail/'+categoryitem._id,{
      params:{
        page:categoryitem.page,
        pagesize:categoryitem.pagesize
      }
    })
    // console.log(res)
    categoryitem.list.push(...res.data)
    categoryitem.loading=false
    if(res.data.length<categoryitem.pagesize){
      categoryitem.finished=true
    }
  },
  onLoad(){
    // console.log('到底了')
    const categoryitem=this.categoryItem()
    setTimeout(()=>{
      categoryitem.page +=1
      this.selectArticle()
    },1000)
  },
  categoryItem(){
    const categoryitem=this.category[this.active]
    return categoryitem
  }
},
watch:{
  active(){
    this.selectArticle()
  }
},
created(){
  this.selectCategory()
}
  
}
</script>


<style lang="scss" scoped>
.home{
  background-color: white;
}
.detailparent{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem{
    width: 45%;
    margin: 5px 0;
  }
}
</style>