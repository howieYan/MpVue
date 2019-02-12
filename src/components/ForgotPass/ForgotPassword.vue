<template>
    <div class="layout ForgotPassword">
        <Layout>
            <Header>
                <div class="LayoutHeaderLoginImgSize">
                    <img src="/static/logo.png" alt="" class="LayoutHeaderLogo">
                </div>
                <div class="LayoutHeaderAddRi">
                    <div class="ForgotPasswordButton onClassCursor floatRight" @click="onBack()">Sign In</div>
                </div>
            </Header>
            <Content class="ForgotPasswordContent">
                <router-view style="height: 100%"/>
            </Content>
        </Layout>
    </div>
</template>

<script>
    import api from '../../api/api'
    export default {
        name: "ForgotPassword",
        data () {
            return {
                flag: true,
                formCustom: {
                    username: ''
                },
                ruleCustom: {
                    username: [
                        { required: true,  message: 'Please enter a user name', trigger: 'blur' }
                    ]
                }
            };
        },
        computed: {
        },

        methods: {
            onBack () {
                this.$router.push({path: `/mp/login`});
            },
        },
        created () {
        },

        mounted () {
        },

        updated () {
        }
    }
</script>

<style scoped>
    @import "../../css/index.css";
    @import "../../css/reset.css";
    .ForgotPassword .ivu-layout-header{
        padding: 0;
    }
    .LayoutHeader{
        line-height: 60px;
    }
    .ForgotPasswordButton{
        margin-top: 15px;
        height: 30px;
        line-height: 30px;
        margin-right: 15px;
        font-family: Helvetica;
        font-size: 18px;
        padding: 0 6px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        border: 1px solid rgba(255,255,255,0.43);
        border-radius: 2px;
    }
    .ForgotPasswordContent{
        width: 100%;
        height: 90%;
        display: table;
    }
</style>
