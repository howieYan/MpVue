<template>
    <div>
        <div class="SubMerchantHeader">Only reports from the past 6 months are available.</div>
        <div class="SubMerchantHeaderSelect">Select a date range</div>
        <div class="SubMerchantHeaderTime">
            <DatePicker type="daterange" :options="options" v-model="dataTime" split-panels placeholder="Select date" style="width: 230px"></DatePicker>
        </div>
        <div class="SubMerchantHeaderButton">
            <div class="SubMerchantHeaderButtonItem floatLeft"  @click="onSearch()">
                <button class="SubMerchantHeaderButtonItemSize onClassCursor SubMerchantHeaderButtonItemSizeActive">Search</button>
            </div>
            <div class="SubMerchantHeaderButtonItem floatLeft">
                <button class="SubMerchantHeaderButtonItemSize onClassCursor" @click="onReset()">Reset</button>
            </div>
        </div>
        <div class="clearfix"></div>
        <div style="border: 1px solid #D8D8D8;"></div>
        <div class="row SubMerchantHeaderDownloadAll">
            <div class="col">
                <Button type="warning" ghost style="float: right" :class="!spinShow ? 'SubMerchantHeaderDownloadAllButton' : 'disabled'" @click="onDownloadAll"><i class="el-icon-download"></i>Download All</Button>
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="SubMerchantHeaderTable">
            <table  class="tableHover">
                <thead >
                <tr style="position: relative">
                    <th class="SubMerchantDate" :style="{width: getTextWidth()  +'px'}">
                        <div style="position: relative">
                            Date
                            <i class="iconQuestion" @mouseenter="enter" @mouseleave="leave"></i>
                        </div>
                    </th>
                    <div style="position: absolute;top: -64px;left: 0; " v-show="isTooltip">
                        <div class="demoDateMode">
                            <div class="text">
                                Date of report. Each report includes all transactions from 2:00
                                am on the date of report to 2:00 am the next day.
                            </div>
                        </div>
                        <div class="triangle_border_down"></div>
                    </div>
                    <th class="" :style="{width: getTextWidth()  +'px'}">Report Name</th>
                    <th :style="{width: '120px',display: '-webkit-box', borderLeft: '1px solid #d8d8d8', paddingLeft: '10px' }">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr class="" v-for="(item,i) in list">
                    <td  data-label="Date" class="SubMerchantDate" :style="{width: getTextWidth()  +'px'}">{{item.generateDate}}</td>
                    <td  data-label="Report Name" class="" :style="{width: getTextWidth()  +'px'}">{{item.fileName}}</td>
                    <td  data-label="Action" class="SubMerchantAction" style="width: 120px">
                        <div>
                            <Button type="warning" ghost class="SubMerchantHeaderDownloadAllButton" @click="onDownload(item)"><i class="el-icon-download"></i>Download</Button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="" v-show="spinShow">
                <table cellspacing="0" cellpadding="0" border="0" style="border: none;width: 100%;">
                    <tbody style="width: 100%;height: 50px;text-align: center;line-height: 50px;border-bottom: 1px solid #d8d8d8;border-right: 1px solid #d8d8d8;">
                    <span>No Data</span>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="SubMerchantPage" style="padding-bottom: 10px">
            <el-pagination
                @size-change="onChangePageSize"
                @current-change="onChangePage"
                :current-page="formData.pn"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="formData.rn"
                layout="prev, pager, next, sizes, jumper, total"
                :total="total">
            </el-pagination>
        </div>
        <div class="clearfix"></div>
        <Modal v-model="isDownloadAll" width="360" footer-hide>
            <div style="text-align:center">
                <img src="/static/ico-error@2x.png" alt="" class="DownloadAllImg">
                <div class="DownloadAllTitle">Confirmation</div>
                <div class="DownloadAllContent">
                    You are downloading <b>Transaction Detail Reports</b> from {{time.dateStart}} ~ {{time.dateEnd}} <br/>    Proceed?
                </div>
                <div class="row DownloadAllButton">
                    <div class="col DownloadAllButtonLeft">
                        <div class="DownloadAllButtonLeftStyle" @click="onModalClose()">
                            <button>Cancel</button>
                        </div>
                    </div>
                    <div class="col DownloadAllButtonRight">
                        <div class="DownloadAllButtonRightStyle" @click="onDownloadAllUpdata()">
                            <button>Proceed</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
        <Spin fix v-show="isSpin" size="large">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
</template>

<script>
    import {formatTime, formatTs, formatTsA, formatTimeA} from '../../../store/index'
    import moment from 'moment'
    import axios from 'axios';
    import api from '../../../api/api'
    export default {
        name: "SubMerchant",
        data () {
            return {
                tableData: [],
                currentPage: 1,//当前页码
                limit: 10,//每页显示条数
                formData: {
                    pn: 1,
                    rn: 10
                },
                list: [],
                spinShow: false,
                isSpin: true,
                axios: axios,
                isDownloadAll: false,
                isTooltip: false,
                total: null,
                time: {
                    dateStart: '',
                    dateEnd: '',
                },
                options: {
                    disabledDate (date) {
                        let dataNew = new Date()
                        dataNew.setMonth(dataNew.getMonth() - 6);
                        return date.valueOf() < dataNew - 86400000 || date.valueOf() > Date.now();
                    }
                },
                dataTime: '',
                DownloadAllTime: '',
                tableHeader: [
                    { name: 'Date', activeClass:'tableHeaderLeft', size: '35%'},
                    { name: 'Report Name', activeClass:'tableHeaderLeft',  size: '35%'},
                    { name: 'Action', activeClass: 'tableHeaderRight',  size: '30%'},
                ],
            };
        },
        computed: {
            userInfo () {
                return this.$store.getters.getUserInfo;
            },
        },

        methods: {
            formatTime: formatTime,
            formatTs: formatTs,
            formatTsA: formatTsA,
            formatTimeA: formatTimeA,
            getTextWidth () {
                return (window.innerWidth- 200 - 122) / 2;
            },
            enter () {
                this.isTooltip = true
            },
            leave () {
                this.isTooltip = false
            },
            onSearch () {
                this.DownloadAllTime = this.dataTime
                if (this.dataTime[0]) {
                    let time = String(this.dataTime[1])
                    let timeEnd = formatTimeA(time)
                    this.dataTime[1] = time.replace(timeEnd, "23:59:59")
                    this.formData.dateStart = formatTime(this.dataTime[0])
                    this.formData.dateEnd = formatTime(this.dataTime[1])
                    this.LoadData()
                }
            },
            onReset () {
                this.formData = {}
                this.dataTime = this.getLast30Days();
                this.formData.pn = 1
                this.formData.rn = 10
                this.formData.merchantId =  this.userInfo.merchantId
                // this.LoadData()
            },
            onChangePage (page) {
                this.formData.pn = page;
                this.LoadData()
            },
            onChangePageSize (size) {
                this.formData.rn = size;
                this.LoadData()
            },
            async LoadData () {
                try {
                    this.formData.merchantId =  this.userInfo.merchantId
                    let data = await api.getTransaction(this.formData);
                    if (Number(data.code) === 200) {
                        this.total = Number(data.data.total)
                        this.list = data.data.list
                        this.tableData = data.data.list;
                        this.isSpin = false
                        if (this.total <= 0) {
                            this.spinShow = true
                        } else {
                            this.spinShow = false
                        }
                    } else if (Number(data.code) === 40016) {
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
                    } else if (Number(data.code) === 10001) {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                        });
                        this.$store.commit('out');
                        this.$router.push({path: `/mp/login`});
                    }
                }
                catch (e) {
                    console.log(e);
                }
            },

            getLast30Days () {
                let date = []
                date.push(moment().subtract('days', 29)._d)
                date.push(moment().subtract('days', 0)._d)
                return date
            },
            onDownload (record) {
                window.open('/xmp/v1/report/download/transaction?id=' + record.id)
            },

            onDownloadAll () {
                if (!this.spinShow) {
                    let timea = String(this.DownloadAllTime[0])
                    let timeStart = formatTimeA(timea)
                    this.DownloadAllTime[0] = timea.replace(timeStart, "00:00:00")
                    this.time.dateStart = formatTsA(this.DownloadAllTime[0])
                    let timeb = String(this.DownloadAllTime[1])
                    let timeEnd = formatTimeA(timeb)
                    this.DownloadAllTime[1] = timeb.replace(timeEnd, "23:59:59")
                    this.time.dateEnd = formatTsA(this.DownloadAllTime[1])
                    if (this.time.dateStart || this.time.dateEnd) {
                        this.isDownloadAll = true
                    } else {
                        this.$message({
                            message: 'Please click the search button',
                            type: 'error'
                        });
                    }
                }
            },
            onDownloadAllUpdata () {
                window.open('/xmp/v1/report/download/all/transaction?merchantId='+ this.userInfo.merchantId + '&dateStart=' + formatTime(this.DownloadAllTime[0])+'&dateEnd='+formatTime(this.DownloadAllTime[1]))
                this.onModalClose()
            },
            onModalClose () {
                this.time = {}
                this.isDownloadAll = false
            }
        },
        created () {
            this.getTextWidth()
            this.dataTime = this.getLast30Days();
            this.DownloadAllTime = this.getLast30Days();
            this.LoadData();
        },

        mounted () {
        },

        updated () {
        }
    }
</script>

<style scoped>
    @import '../../../css/reset.css';
    @import '../../../css/index.css';
    .DownloadAllImg{
        margin-top: 35px;
        width: 60px;
        height: 60px;
        border-radius: 30px;
    }
    .DownloadAllTitle{
        padding-top: 28px;
        font-family: Helvetica-Bold;
        font-size: 18px;
        color: #000000;
        letter-spacing: 0;
        text-align: center;
        line-height: 20px;
    }
    .DownloadAllContent{
        padding-top: 10px;
        font-family: Helvetica;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0;
        text-align: center;
        line-height: 20px;
    }
    .DownloadAllButton{
        padding-top: 10px;
    }
    .DownloadAllButtonLeft{
        text-align: right;
        padding-right: 10px;
    }
    .DownloadAllButtonLeftStyle button{
        font-family: Helvetica;
        font-size: 12px;
        color: #4A4A4A;
        letter-spacing: 0;
        text-align: center;
        background: #F7F7F7;
        padding: 8px 20px;
        border: 1px solid #BBBBBB;
        border-radius: 2px;
        outline: none;
    }
    .DownloadAllButtonRight{
        text-align: left;
        padding-left: 10px;
    }
    .DownloadAllButtonRightStyle button{
        background: #ECF6EA;
        border: 1px solid #21B002;
        border-radius: 2px;
        font-family: Helvetica;
        font-size: 12px;
        color: #269B25;
        padding: 8px 20px;
        letter-spacing: 0;
        text-align: center;
        outline: none;
    }
</style>
