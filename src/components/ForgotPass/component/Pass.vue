<template>
    <div class="ForgotPasswordCard">
        <div class="ForgotPasswordCardSize">
            <div class="ForgotPasswordTitle">Forgot Password</div>
            <div class="ForgotPasswordText">Please enter your username</div>
            <Form ref="formCustom" :model="formCustom"
                  @keydown.native.enter.prevent="handleSubmit('formCustom')">
                <FormItem>
                    <Input v-model="formCustom.username"
                           @input="onUsername(formCustom.username)"
                           class="ForgotPasswordInput"
                           @on-blur="onNewPasswordBlur"
                           @on-focus="onNewPasswordFocus"
                    />
                </FormItem>
                <div v-show="isNewPasswordFocus" style="color: #ed4014">{{newPassMsg}}</div>
                <div class="ForgotPasswordRightText" @click="onOpenModel()">
                    <a>Still cannot remember?</a>
                </div>
                <FormItem>
                    <div :class="!formCustom.username ? 'ForgotPasswordContentButton' : 'ForgotPasswordContentButtonis'" @click="handleSubmit('formCustom')">
                        Next
                    </div>
                </FormItem>
            </Form>
        </div>
        <div class="Modal" v-show="isModal">
            <div class="ModalSize">
                <div class="ModalContent">
                    <a class="modalClose" @click="onCloseModel()">
                        <img src="/static/Close.png" alt="" style="width: 10px;height: 10px">
                    </a>
                    <div class="ModalTitle">Contact us for account support</div>
                    <div class="ModalContentPadd">
                        <div class="row">
                            <img src="/static/telephone.png" alt="" class="ModalContentTelephone">
                            <div class="col ModalContentTelephoneText">Contact our operation team at <b>662-296-4555</b></div>
                        </div>
                        <div class="row ModalContentEmail">
                            <img src="/static/email.png" alt="" class="ModalContentTelephone">
                            <div class="col ModalContentTelephoneText">Email us at <b>Krungsri_authorization@krungsri.com</b></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../../api/api'
    export default {
        name: "Pass",
        data () {
            return {
                flag: true,
                isModal: false,
                Height: null,
                formCustom: {
                    username: ''
                },
                newPassMsg: null,
                isNewPasswordFocus: false,
            };
        },
        computed: {
        },
        watch: {
        },
        methods: {
            onOpenModel () {
                this.isModal = true
            },
            onCloseModel () {
                this.isModal = false
            },
            handleSubmit (name) {
                if (this.formCustom.username) {
                    this.LoadData(this.formCustom)
                }
            },
            onNewPasswordFocus () {
                this.isNewPasswordFocus = true
            },
            onUsername (value) {
                if (value === '') {
                    this.newPassMsg = 'Please enter a user name'
                } else {
                    this.newPassMsg = null
                }
            },
            onNewPasswordBlur () {
                if (this.newPassMsg) {
                    this.isNewPasswordFocus= true
                } else {
                    this.newPassMsg = null
                    this.isNewPasswordFocus = false
                }
            },

            async LoadData (record) {
                try {
                    let data = await api.ForgotPass(record)
                    if (Number(data.code) === 200) {
                        this.$router.push({path: `/mp/code/${record.username}`});
                    } else if (Number(data.code) === 40018) {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                        });
                        this.$store.commit('out');
                        this.$router.push({path: `/mp/login`});
                    } else if (Number(data.code) === 40016) {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                        });
                        this.$store.commit('out');
                        this.$router.push({path: `/mp/login`});
                    } else if (Number(data.code) === 10001) {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                        });
                        this.$store.commit('out');
                        this.$router.push({path: `/mp/login`});
                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                        });
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
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
    @import "../../../css/index.css";
    @import "../../../css/reset.css";
</style>
