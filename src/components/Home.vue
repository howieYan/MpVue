<template>
  <div class="layout">
    <Layout style="height: 100%">
        <Header class="clearfix">
            <div class="row LayoutHeader clearfix">
                <div class="LayoutHeaderLoginImgSize">
                    <div class="LayoutHeaderLogo"></div>
                </div>
                <div class="LayoutHeaderAddRi" :style="{width: getHeaderWidth()}">
                  <!-- <div class="LayoutHeaderBorder floatRight"></div> -->
                  <Poptip placement="bottom-end" class="LayoutHeaderPoptip floatRight">
                      <div class="LayoutHeaderRight LayoutHeaderPoptip onClassCursor">
                          <div class="LayoutHeaderRightDiv onClassCursor floatLeft">
                              <img src="/static/user_default.png" alt="" class="LayoutHeaderRightIcon">
                          </div>
                          <div class="LayoutHeaderRightNickName floatLeft">{{userData.merchantName}}</div>
                      </div>
                      <div slot="content" style="text-align: left;">
                          <div class="PoptipContent">
                              <div class="PoptipContentTitle">{{userData.username}}</div>
                              <div class="PoptipContentEmails">{{userData.email}}</div>
                          </div>
                          <div class="PoptipBorder"></div>
                          <div class="PoptipContent onClassCursor" @click="onUpdatePass()">
                              <div class="PoptipContentEmails">Update password</div>
                              <div class="PoptipContentTime"  v-show="Number(userData.passwordExpireTime) <= 7">Password expires in {{userData.passwordExpireTime}} days</div>
                          </div>
                          <div class="PoptipBorder"></div>
                          <div class="PoptipContent onClassCursor" @click="onSignOut()">
                              <div class="PoptipContentOut">Sign Out</div>
                          </div>
                      </div>
                  </Poptip>
                  <div class="LayoutHeaderUser floatRight">
                      <p class="LayoutHeaderUserName">Timezone:</p>
                      <div class="LayoutHeaderUserNameTime">Tokyo, Japan (GMT+9) </div>
                  </div>
                  <div class="col onClassCursor floatLeft">
                      <div v-show="isUpdate" class="headerBackContent onClassCursor" @click="onBack()">
                          <img src="/static/ico-back@2x.png" alt="" class="headerBack floatLeft">
                          <div class="headerBackText floatLeft col">Back to Dashboard</div>
                      </div>
                  </div>
                </div>

            </div>
        </Header>
      <Layout style="height: 100%;width: 100%;">
        <Sider hide-trigger :style="{background: '#fff',height: '100%',width : '20%',}" class="floatLeft">
          <Menu active-name="1" theme="light" width="auto" :open-names="['1']">
            <MenuItem name="1">
              <div class="row navLeftItem" v-for="(item, i) in NavList" :key="i" @click="navClick(item)">
                <div class="navLeftIcon floatLeft">
                  <img :src="item.icon" alt="" class="navLeftIcon ">
                </div>
                <span class="navLeftIconText floatLeft">{{ item.name }}</span>
              </div>
            </MenuItem>
          </Menu>
        </Sider>
        <div style="overflow-y:auto" class="floatLeft" :style="{height: getTextHeight(),width: getTextWidth()}">
          <div style="position: relative;">
            <router-view/>
          </div>
          <div class="clearfix"></div>
          <div style="height: 40px;line-height: 40px;width: 100%;padding: 0 20px;border-top: 1px solid #eee;">
              <div style="float: left;width: 60%">
                  <strong>Copyright © 2018</strong> <a href="https://www.krungsri.com/bank/en/home.html"><strong>Bank of Ayudhya Public Co, Ltd.</strong></a> All rights reserved.
              </div>
              <div style="float: right;width: 40%">
                  <strong class="floatRight" style="padding-left: 5px">{{version}}</strong>
                  <strong style="color: #000;font-size: 13px" class="floatRight">Version</strong>
              </div>
              <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>

      </Layout>

    </Layout>
    <Modal v-model="isUpdate" header-hide footer-hide fullscreen>
      <div style="display: table;height: 100%;width: 100%">
          <div class="ForgotPasswordCard">
              <div class="ForgotPasswordCardSize">
                  <div class="ForgotPasswordTitle">Update Password</div>
                  <Form ref="formCustom" :model="formCustom"
                        @keydown.native.enter.prevent="handleSubmit('formCustom')">
                      <div class="ForgotPasswordText" style="margin-top: 35px">Current password</div>
                      <FormItem>
                          <!--<Input type="password"-->
                                 <!--v-model="formCustom.oldPassword"-->
                                 <!--class="ForgotPasswordInput"-->
                                 <!--@input="onOldPassword(formCustom.oldPassword)"-->
                                 <!--@on-blur="onOldPasswordBlur"-->
                                 <!--@on-focus="onOldPasswordFocus"-->
                          <!--/>-->
                          <Input type="password"
                                 v-model="formCustom.oldPassword"
                                 class="ForgotPasswordInput"/>
                      </FormItem>
                      <div v-show="isOldPasswordFocus" style="color: #ed4014">{{oldPassMsg}}</div>
                      <div class="ForgotPasswordText" style="margin-top: 10px">New password</div>
                      <FormItem>
                          <Input type="password" v-model="formCustom.password" @input="onPassKeypress(formCustom.password)" class="ForgotPasswordInput"/>
                      </FormItem>
                      <div class="Keypress">
                          <div class="row">
                              <div class="col KeypresCrossHei">
                                  <div>
                                      <div class="row">
                                          <img :src="!isOneUppercase ? '/static/cross2@2x.png': '/static/check2@2x.png'" alt="" class="KeypresCrossImg">
                                          <div :class="!isOneUppercase ? 'KeypresCrossSpan' : 'KeypresCrossSpanActiver'" class="col">One uppercase character</div>
                                      </div>
                                  </div>

                              </div>
                              <div class="col KeypresCrossHei">
                                  <div>
                                      <div class="row">
                                          <img :src="!isLowerCase ? '/static/cross2@2x.png' : '/static/check2@2x.png'" alt="" class="KeypresCrossImg">
                                          <div :class="!isLowerCase ? 'KeypresCrossSpan' : 'KeypresCrossSpanActiver'" class="col">One lower case character</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="row">
                              <div class="col KeypresCrossHei">
                                  <div>
                                      <div class="row">
                                          <img :src="!isNumber ? '/static/cross2@2x.png' : '/static/check2@2x.png'" alt="" class="KeypresCrossImg">
                                          <div :class="!isNumber ? 'KeypresCrossSpan' : 'KeypresCrossSpanActiver'" class=" col">One number</div>
                                      </div>
                                  </div>

                              </div>
                              <div class="col KeypresCrossHei">
                                  <div>
                                      <div class="row">
                                          <img :src="!isLength ? '/static/cross2@2x.png' : '/static/check2@2x.png'" alt="" class="KeypresCrossImg">
                                          <div :class="!isLength ? 'KeypresCrossSpan' : 'KeypresCrossSpanActiver'" class="col">At least 8 characters</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="row">
                              <div class="col KeypresCrossHei">
                                  <div>
                                      <div class="row">
                                          <img :src="isSpaces ? '/static/cross2@2x.png' : '/static/check2@2x.png'" alt="" class="KeypresCrossImg">
                                          <div :class="isSpaces ? 'KeypresCrossSpan' : 'KeypresCrossSpanActiver'" class="col">No spaces</div>
                                      </div>
                                  </div>

                              </div>
                              <div class="col KeypresCrossHei">
                                  <div>
                                      <div class="row">
                                          <img :src="isSymbols ? '/static/cross2@2x.png' : '/static/check2@2x.png'" alt="" class="KeypresCrossImg">
                                          <div :class="isSymbols ? 'KeypresCrossSpan' : 'KeypresCrossSpanActiver'" class="col">Symbols allowed:!@#$%^&*()-_=+</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="ForgotPasswordText" style="margin-top: 20px">Confirm account password</div>
                      <FormItem>
                          <Input type="password"
                                 v-model="formCustom.newPassword"
                                 class="ForgotPasswordInput"
                                 @input="onNewPassword(formCustom.newPassword)"
                                 @on-blur="onNewPasswordBlur"
                                 @on-focus="onNewPasswordFocus"
                          />
                      </FormItem>
                      <div v-show="isNewPasswordFocus" style="color: #ed4014">{{newPassMsg}}</div>
                      <div class="ForgotNewPasswordText" style="margin-top: 20px">* Password Rule: For your account security, you must update your
                          password every 60 days.</div>
                      <FormItem>
                          <div v-if="!formCustom.password || !formCustom.newPassword || !formCustom.oldPassword" class="ForgotPasswordContentButton">
                              Next
                          </div>
                          <div v-else class="ForgotPasswordContentButtonis" @click="handleSubmit()">
                              Next
                          </div>
                      </FormItem>
                  </Form>
              </div>
          </div>
      </div>
  </Modal>
      <Modal
          v-model="isOut"
          title="Sign out"
          ok-text="ok"
          @on-ok="LoadLogout"
          cancel-text="Cancel">
          <p>Do you want to Sign out</p>
      </Modal>
  </div>
</template>

<script>
    import {formatTsA, formatTs, formatTime} from '../store/index'
    import moment from 'moment'
    import api from '../api/api'
export default {
    name: 'Home',
    data () {
        return {
            NavList: [
                {name: 'Reports', icon: '/static/ico-report.png', uri: 'reports'},
            ],
            isUpdate: false,
            isOut: false,
            userData: {},
            time: 60,
            isOldPasswordFocus: false,
            isNewPasswordFocus: false,
            oldPassMsg: null,
            newPassMsg: null,
            formCustom: {
                oldPassword: '',
                password: '',
                newPassword: ''
            },
            isIe: true,
            isOneUppercase: false,
            isLowerCase: false,
            isNumber: false,
            isSymbols: false,
            isLength: false,
            isSpaces: false,
            expires: null,
            CodeName: 'Resend Code',
        };
    },
    computed: {
        userInfo () {
            return this.$store.getters.getUserInfo;
        },
        version () {
            return this.$store.state.versionNumber
        },
        router () {
            return this.$route
        },
        type () {
            return this.$route.query.type
        }
    },
    methods: {
        formatTs: formatTs,
        formatTsA: formatTsA,
        formatTime: formatTime,
        navClick (record) {
            this.$router.push({path: `${this.router.path}`, query: {type: this.type}});
        },
        onPassKeypress (value) {
            if (!this.isOneUppercase) {
                let OneUppercase = /(?=.*?[A-Z])/
                this.isOneUppercase = OneUppercase.test(value)
            } else {
                let OneUppercase = /(?=.*?[A-Z])/
                this.isOneUppercase = OneUppercase.test(value)
            }
            if (!this.isLowerCase) {
                let lowerCase = /(?=.*?[a-z])/
                this.isLowerCase = lowerCase.test(value)
            } else {
                let lowerCase = /(?=.*?[a-z])/
                this.isLowerCase = lowerCase.test(value)
            }
            if (!this.isNumber) {
                let number = /(?=.*?[0-9])/
                this.isNumber = number.test(value)
            } else {
                let number = /(?=.*?[0-9])/
                this.isNumber = number.test(value)
            }
            if (this.isSymbols) {
                let Symbols = /[`~|{}':;"',\[\].<>/?~￥…… ——|{}【】‘；：”“'。，、？]/g
                this.isSymbols = Symbols.test(value)
            } else {
                let Symbols = /[`~|{}':;"',\[\].<>/?~￥…… ——|{}【】‘；：”“'。，、？]/g
                this.isSymbols = Symbols.test(value)
            }
            if (!this.isLength) {
                if (this.formCustom.password.length >= 8) {
                    this.isLength = true
                }
            } else {
                if (this.formCustom.password.length < 8) {
                    this.isLength = false
                }
            }
            if (this.isSpaces) {
                let spaces = /\s/g
                this.isSpaces = spaces.test(value)
            } else {
                let spaces = /\s/g
                this.isSpaces = spaces.test(value)
            }

        },
        onOldPasswordFocus () {
            this.isOldPasswordFocus= true
        },
        onOldPassword (value) {
            // let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{7,}/
            // let ispat = /[`~|{}':;"',\[\].<>/?~￥…… ——|{}【】‘；：”“'。，、？]/g
            if (value === '') {
                this.oldPassMsg = 'The current password cannot be empty'
            } else {
                this.oldPassMsg = null
            }
        },
        onOldPasswordBlur () {
            if (this.oldPassMsg) {
                this.isOldPasswordFocus= true
            } else {
                this.oldPassMsg = null
                this.isOldPasswordFocus = false
            }
        },
        onNewPasswordFocus () {
            this.isNewPasswordFocus = true
        },
        onNewPassword (value) {
            let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{7,}/
            let ispat = /[`~|{}':;"',\[\].<>/?~￥…… ——|{}【】‘；：”“'。，、？]/g
            if (value === '') {
                this.newPassMsg = 'You confirm that the new password for the account cannot be empty';
            } else if (value !== this.formCustom.password) {
                this.newPassMsg = 'Passwords do not match. Try again.'
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
        onSignOut () {
            this.LoadLogout()
        },
        async LoadLogout () {
            try {
                if (navigator.onLine) {
                    let data = await api.Logout();
                    if (Number(data.code) === 200) {
                        this.$store.commit('out');
                        this.$message({
                            message: 'Sign out successful!',
                            type: 'success',
                        });
                        this.$router.push({path: `/mp/login`});
                    }  else if (Number(data.code) === 40016) {
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
                    } else if (Number(data.code) === 40018) {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                        });
                        this.$store.commit('out');
                        this.$router.push({path: `/mp/login`});
                    } else {
                        this.$message({
                            message: 'Sign out failed',
                            type: 'error'
                        });
                    }
                } else {
                    this.$message({
                        message: 'Sign out failed',
                        type: 'error'
                    });
                }

            }
            catch (e) {
                console.log(e);
            }
        },
        getTextHeight () {
            return window.innerHeight - 60 + 'px';
        },
        getTextWidth () {
            return window.innerWidth - 210 + 'px';
        },
        getHeaderWidth () {
            return window.innerWidth - 160 + 'px';
        },
        LoadData () {
            this.getTextHeight();
            this.getTextWidth();
            if (this.userInfo === null) {
                this.$router.push({path: `/mp/login`});
            } else {
                this.userData =  this.userInfo
                this.$router.push({path: `/mp/subMerchant`, query: {type: this.type}});
                if (Number(this.userInfo.passwordExpireTime) <= 0) {
                    this.$store.commit('out');
                    this.$router.push({path: `/mp/setnewPass`});
                }
            }
        },
        getOffsetDays(time1, time2) {
            let offsetTime = Math.abs(time1 - time2);
            return Math.floor(offsetTime / (3600 * 24 * 1e3));
        },
        onUpdatePass () {
            this.isUpdate = true
        },
        onBack () {
            this.oldPassMsg = null
            this.newPassMsg = null
            this.formCustom = {}
            this.isSpaces = false
            this.isLength = false
            this.isSymbols = false
            this.isNumber = false
            this.isLowerCase = false
            this.isOneUppercase = false
            this.isUpdate = false
        },
        handleSubmit (name) {
            // if (this.oldPasswordHandleSubmit(this.formCustom.oldPassword) === 0) {
            //     this.$message({
            //         message: 'Your current password cannot be empty',
            //         type: 'error'
            //     });
            // } else if (this.oldPasswordHandleSubmit(this.formCustom.oldPassword) === 1) {
            //     this.$message({
            //         message: 'Your current password does not conform to the rules',
            //         type: 'error'
            //     });
            // } else
            if (this.handleSubmitNewPassword(this.formCustom.password) === 0) {
                this.$message({
                    message: 'Your new password cannot be empty',
                    type: 'error'
                });
            } else if (this.handleSubmitNewPassword(this.formCustom.password) === 1) {
                this.$message({
                    message: 'The new password you entered does not conform to the rules',
                    type: 'error'
                });
            } else  if (this.ConfirmHandleSubmitNewPassword(this.formCustom.newPassword) === 0) {
                this.$message({
                    message: 'Your confirmation password cannot be empty',
                    type: 'error'
                });
            } else if (this.ConfirmHandleSubmitNewPassword(this.formCustom.newPassword) === 1) {
                this.$message({
                    message: 'Your confirmation password does not conform to the rules',
                    type: 'error'
                });
            } else if (this.ConfirmHandleSubmitNewPassword(this.formCustom.newPassword) === 2) {
                this.$message({
                    message: 'Your confirmation password does not match the new password. Please enter it again',
                    type: 'error'
                });
            } else if (this.ConfirmHandleSubmitNewPassword(this.formCustom.newPassword) === 3 || this.handleSubmitNewPassword(this.formCustom.password) === 2) {
                this.LoadUpData(this.formCustom)
            }
        },
        oldPasswordHandleSubmit (value) {
            let data = null
            let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{7,}/
            let ispat = /[`~|{}':;"',\[\].<>/?~￥…… ——|{}【】‘；：”“'。，、？]/g
            if (value === '') {
                data = 0
            } else if (!pattern.test(value) || ispat.test(value)) {
                data = 1
            }else {
                data = 2
            }
            return data
        },
        handleSubmitNewPassword (value) {
            let data = null
            let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{7,}/
            let ispat = /[`~|{}':;"',\[\].<>/?~￥…… ——|{}【】‘；：”“'。，、？]/g
            if (value === '') {
                data = 0
            } else if (!pattern.test(value) || ispat.test(value)) {
                data = 1
            }else {
                data = 2
            }
            return data
        },
        ConfirmHandleSubmitNewPassword(value) {
            let data = null
            let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{7,}/
            let ispat = /[`~|{}':;"',\[\].<>/?~￥…… ——|{}【】‘；：”“'。，、？]/g
            if (value === '') {
                data = 0
            } else if (!pattern.test(value) || ispat.test(value)) {
                data = 1
            }else if (value !== this.formCustom.password) {
                data = 2
            } else {
                data = 3
            }
            return data
        },

        OnCode () {
            if (this.formCustom.username !== '') {
                if (Number(this.time) === 60) {
                    this.LoadCodeData();
                    let int = setInterval(() => {
                        this.time --;
                        this.CodeName = 'Resend Code（' + (this.time) + ')';
                        if (this.time === 0) {
                            this.time = 60
                            this.CodeName = 'Resend Code',
                                clearInterval(int);
                        }
                    }, 1000);
                }
            }
        },
        async LoadCodeData () {
            try {
                let data = await api.getCode({'username': this.formCustom.username});
                if (Number(data.code) === 200) {
                    this.$message({
                        message: 'A new verification code has been sent to your email.',
                        type: 'success',
                    });
                } else if (Number(data.code) === 40009){
                    this.$message({
                        message: data.msg,
                        type: 'error'
                    });
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
        },
        async LoadUpData (record) {
            try {
                let list = {
                    password : this.$md5(record.oldPassword),
                    // password : record.oldPassword,
                    newPassword: this.$md5(record.newPassword)
                    // newPassword: record.newPassword
                }
                let data = await api.updatePassword(list)
                if (Number(data.code) === 200) {
                    this.formCustom = {}
                    this.$message({
                        message: 'Password updated successfully',
                        type: 'success'
                    });
                    this.onBack()
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
        this.getHeaderWidth()
        this.LoadData();
    },

    mounted () {
    },

    updated () {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../css/reset.css';
  @import '../css/index.css';
    .PoptipContent{
        padding:15px;
    }
    .PoptipContent:hover{
        background: #f6f6f6;
    }
    .PoptipContentTitle{
        font-family: Helvetica-Bold;
        font-size: 14px;
        color: #3B3B3B;
        letter-spacing: 0;
        line-height: 14px;
    }
    .PoptipContentEmails{
        font-family: Helvetica;
        font-size: 12px;
        color: #9B9B9B;
        letter-spacing: 0;
        line-height: 14px;
    }
    .PoptipBorder{
        border-bottom: 1px solid #D8D8D8;
    }
    .PoptipContentTime{
        font-family: Helvetica-Oblique;
        font-size: 10px;
        color: #E9001C;
        letter-spacing: 0;
        line-height: 14px;
    }
    .PoptipContentOut{
        font-family: Helvetica;
        font-size: 12px;
        color: #9B9B9B;
        letter-spacing: 0;
        line-height: 14px;
    }
    .headerBackContent{
        padding-left: 20px;
    }
    .headerBack{
        margin-top: 21px;
        width: 16px;
        height: 16px;
    }

    .headerBackText{
        padding-left: 10px;
        font-family: Avenir-Medium;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
    }
    .routerStyle{
        height: 100%;
        /*position: fixed;*/
        /*top: 60px;*/
    }
    .overflowHeight{
       height: 90%;
    }
    .overflowHeight100{
        height: 100%;
    }
</style>
