<template>
  <div>
    <login-top middleTop="登陆bilibili">
        <div slot="right" style="font-size:13px" @click="$router.push('/register')">切换到注册</div>
    </login-top>
    <login-text @inputChage="res => model.username =res" rule="^.{6,16}$" lable="账号" style="margin:4.167vw 0" placeholder="请输入账号"/>
    <login-text @inputChage="res => model.password =res" rule="^.{6,16}$" lable="密码" placeholder="请输入密码" type="password"/>
    <login-btn @registerSubmit="registerSubmit" btntext="登录"></login-btn>
  </div>
</template>

<script>
import LoginTop from '@/components/common/LoginTop.vue'
import LoginText from '@/components/common/LoginText.vue'
import LoginBtn from '@/components/common/LoginBtn.vue'

export default {
    data(){
        return{
            model:{
             
              username:'',
              password:''
            }
        }
    },
    components:{
        LoginTop,
        LoginText,
        LoginBtn
    },
    methods:{
      async registerSubmit(){
        let rulg=/^.{6,16}$/
        // console.log('成功')
        if(rulg.test(this.model.username) && rulg.test(this.model.password)){
          // console.log('zz')
        const res=await this.$http.post('/Login',this.model)
          this.$msg.fail(res.data.msg)
          if(res.data.code == 301 || res.data.code == 302){
            return
          }
          localStorage.setItem('token',res.data.token)
          localStorage.setItem('id',res.data.id)
          setTimeout(()=>{
            this.$router.push('/userinfo')
          },1000)
        }else{
          this.$msg.fail('格式不正确,请重新输入')
        }
      }
    }
  
}
</script>
