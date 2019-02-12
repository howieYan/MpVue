<template>
    <div class="login">
        <div class="adminCardLogin">
            <img src="/static/Logo@3x.png" alt="" class="adminCardLoginImg">
        </div>
      <div class="admin">
          <div class="adminStyle">
              <div class="loginTitleText">Krungsri</div>
              <div class="loginTitleText">Merchant Portal</div>
              <div class="adminCard">
                  <Form ref="formCustom" :model="formCustom"
                        @keydown.native.enter.prevent="handleSubmit('formCustom')">
                      <div v-show="Number(newpass) === 0" class="NewpassLogin">
                          <div class="NewpassLoginPadd">
                              <div class="row">
                                  <img src="/static/Check@2x.png" alt="" class="NewpassLoginPaddImg">
                                  <div class="NewpassLoginPaddText">Password successfully reset.
                                      Please sign in below.</div>
                              </div>
                          </div>
                      </div>
                      <div class="loginNumberMes" v-show="masg">
                          <div class="row">
                              <img src="/static/ico-error@2x.png" alt="" class="NewpassLoginPaddImg">
                              <div class="loginNumberMesText">
                                 {{masg}}
                              </div>
                          </div>
                      </div>
                      <FormItem prop="username">
                          <Input
                              type="text"
                              placeholder="Username"
                              v-model="formCustom.username"
                              @input="onUsername(formCustom.username)"
                              @on-blur="onUsernameBlur"
                              @on-focus="onUsernameFocus"
                          ></Input>
                      </FormItem>
                      <div v-show="isUsernameValue" style="color: #ed4014">{{UsernameMsg}}</div>
                      <FormItem prop="password">
                          <Input
                              type="password"
                              placeholder="Password"
                              v-model="formCustom.password"
                              @input="onPassword(formCustom.password)"
                              @on-blur="onPasswordBlur"
                              @on-focus="onPasswordFocus"
                          ></Input>
                      </FormItem>
                      <div v-show="isPasswordValue" style="color: #ed4014">{{PasswordMsg}}</div>
                      <FormItem>
                          <Button style="margin-top: 10px" class="adminCardButton onClassCursor" :class="!formCustom.password || !formCustom.username ? 'disabled' : ''" @click="handleSubmit('formCustom')">Sign In</Button>
                      </FormItem>
                  </Form>
                  <div class="adminCardRight" @click="onForgotPassword()">
                      <a>Forgot password?</a>
                  </div>
              </div>
              <div class="copyright">Copyright © 2018 Bank of Ayudhya Public Co, Ltd. All rights reserved.</div>
          </div>

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
    import {formatTsA, formatTs, formatTime} from '../../store/index'
    import api from '../../api/api'
    export default {
        name: "Login",
        data () {
          return {
              formCustom: {
                  // username: '201811061421',
                  // password: 'Yy123456',
                  username: '',
                  password: '',
              },
              isModal: false,
              list: {},
              masg: '',
              UsernameMsg: null,
              PasswordMsg: null,
              isUsernameValue: false,
              isPasswordValue: false,
          };
        },
        computed: {
            ntId () {
                return this.$route;
            },
            newpass () {
                return this.$route.query.newpass;
            }
        },

        methods: {
            formatTs: formatTs,
            formatTsA: formatTsA,
            formatTime: formatTime,
            onUsernameFocus () {
                this.isUsernameValue = true
            },
            onUsername (value) {
                if (value === '') {
                    this.UsernameMsg = 'Please enter a user name'
                } else {
                    this.UsernameMsg = null
                }
            },
            onUsernameBlur () {
                if (this.UsernameMsg) {
                    this.isUsernameValue= true
                } else {
                    this.UsernameMsg = null
                    this.isUsernameValue = false
                }
            },
            onPasswordFocus () {
                this.isPasswordValue = true
            },
            onPassword (value) {
                if (value === '') {
                    this.PasswordMsg = 'Please enter password'
                } else {
                    this.PasswordMsg = null
                }
            },
            onPasswordBlur () {
                if (this.PasswordMsg) {
                    this.isPasswordValue= true
                } else {
                    this.PasswordMsg = null
                    this.isPasswordValue = false
                }
            },
            handleSubmit (name) {
                if (!this.formCustom.password || !this.formCustom.username) {
                } else {
                    this.list.username = this.formCustom.username
                    this.list.password = this.formCustom.password
                    this.list.password = this.$md5(this.list.password)
                    this.LoadData(this.list);
                }
            },
            onCloseModel () {
                this.isModal = false
            },
            async LoadData (record) {
                try {
                    let data = await api.Login(record);
                    this.masg = '';
                    if (Number(data.code) === 200) {
                        if (Number(data.data.userInfo.needModifyPassword) === 1) {
                            this.$router.push({path: `/mp/setnewPass`});
                        }  else if (Number(data.data.userInfo.passwordExpireTime) <= 0) {
                            this.$router.push({path: `/mp/setnewPass`});
                        }else if (Number(data.code) === 40016) {
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
                        }  else if (Number(data.code) === 40018) {
                            this.$message({
                                message: data.msg,
                                type: 'error'
                            });
                            this.$store.commit('out');
                            this.$router.push({path: `/mp/login`});
                        } else {
                            this.$store.commit('setUserInfo', JSON.stringify(data.data.userInfo));
                            this.$router.push({path: `/mp`, query: {type: data.data.userInfo.type}});
                        }
                    } else {
                        // this.masg = data.msg
                        this.$message({
                            message: data.msg,
                            type: 'error'
                        });
                    }
                }
                catch (e) {
                    console.log(e);
                }
            },
            onForgotPassword () {
                this.$router.push({path: `/mp/forgotPass`});
            },
            getOffsetDays(time1, time2) {
                let offsetTime = Math.abs(time1 - time2);
                return Math.floor(offsetTime / (3600 * 24 * 1e3));
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
    @import "../../css/reset.css";
    @import "../../css/index.css";
    .ivu-form-item{
        padding: 10px 0;
    }
    .NewpassLogin{
        background: #ECF6EA;
        border: 1px solid #21B002;
        border-radius: 2px;
    }
    .NewpassLoginPadd{
        padding: 10px 15px;
    }
    .NewpassLoginPaddImg{
        margin-top: 13px;
        width: 16px;
        height: 16px;
    }
    .NewpassLoginPaddText{
        padding-left: 16px;
        font-family: AvenirNext-Medium;
        font-size: 14px;
        color: #2D9F14;
        letter-spacing: 0;
    }
    .copyright{
        position: fixed;
        font-family: Helvetica;
        font-size: 12px;
        color: #fff;
        letter-spacing: 0;
        text-align: center;
        line-height: 13px;
        bottom: 50px;
    }
    .loginNumberMes{
        padding: 10px 15px;
        background: #FFF7F8;
        border: 1px solid #E9001C;
        border-radius: 2px;
    }
    .loginNumberMesText{
        padding-left: 16px;
        font-family: AvenirNext-Medium;
        font-size: 14px;
        color: #E9001C;
        letter-spacing: 0;
    }

</style>
