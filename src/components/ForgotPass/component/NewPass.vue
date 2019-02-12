<template>
    <div class="ForgotPasswordCard">
        <div class="ForgotPasswordCardSize">
            <div class="ForgotPasswordTitle">Set new Password</div>
            <Form ref="formCustom" :model="formCustom"
                  @keydown.native.enter.prevent="handleSubmit('formCustom')">
                <div class="ForgotPasswordText" style="margin-top: 35px">New password</div>
                <FormItem>
                    <Input type="password" v-model="formCustom.password" @input="onPassKeypress" class="ForgotPasswordInput"/>
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
                                    <div :class="isSpaces ? 'KeypresCrossSpan' : 'KeypresCrossSpanActiver'">No spaces</div>
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
                    <div v-if="!formCustom.password || !formCustom.newPassword" class="ForgotPasswordContentButton">
                        Next
                    </div>
                    <div v-else class="ForgotPasswordContentButtonis" @click="handleSubmit('formCustom')">
                        Next
                    </div>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import api from '../../../api/api';
    export default {
        name: "NewPass",
        data () {
            return {
                formCustom: {
                    password: '',
                    newPassword: ''
                },
                newPassMsg: null,
                isNewPasswordFocus: false,
                isOneUppercase: false,
                isLowerCase: false,
                isNumber: false,
                isSymbols: false,
                isLength: false,
                isSpaces: false,
            };
        },
        computed: {
            code () {
                return this.$route.params.code
            },
            username () {
                return this.$route.params.username
            },
        },

        methods: {
            onNewPasswordFocus () {
                this.isNewPasswordFocus = true
            },
            onNewPassword (value) {
                let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{7,}/
                let ispat = /[`~|{}':;"',\[\].<>/?~￥…… ——|{}【】‘；：”“'。，、？]/g
                if (value === '') {
                    this.newPassMsg = 'Please enter your password again'
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

            handleSubmit (name) {
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
                    this.LoadData(this.formCustom)
                }
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
            async LoadData (record) {
                try {
                    let list = {
                        username : this.username,
                        code: this.code,
                        newPassword: this.$md5(record.newPassword)
                        // newPassword: record.newPassword
                    }
                    let data = await api.resetPassword(list)
                    if (Number(data.code) === 200) {
                        this.formCustom = {}
                        this.$router.push({path: `/mp/login`, query: {newpass: 0}});
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
