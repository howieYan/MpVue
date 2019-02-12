<template>
    <div style="padding:  0 2%"  class="TabsHeightA">
        <div class="ReportsHeader">Reports</div>
        <!--<Tabs @on-click="clickTab"  class="TabsHeightA">-->
            <!--<TabPane v-for="(item, i) in tabHeader" :label="item.name" :key="i" :name="item.component" class="TabsHeightA">-->
                <!--<router-view/>-->
            <!--</TabPane>-->
        <!--</Tabs>-->
        <div class="borderBottom clearfix">
            <div v-for="(item, i) in tabHeader" @click="clickTab(i, item.component)" :key="i" class="floatLeft" :class="index === i ? 'navStyleActive' : 'navStyle'">
                {{item.name}}
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "Reports",
        data () {
            return {
              tabHeader: [],
              index: 0
            };
        },
        computed: {
            type () {
                return this.$route.query.type
            }
        },

        methods: {
            clickTab (index, name) {
                this.index = index;
                this.$router.push({path: `/mp/${name}` ,query: {type: this.type}});
            },
            LoadData () {
                if (Number(this.type) === 3) {
                    let array = [
                        {name: 'Sub Merchant Summary Report', component: 'subMerchant'},
                        {name: 'Transaction Detail Report', component: 'transaction'},
                    ];
                    this.$router.push({path: `/mp/subMerchant` ,query: {type: this.type}});
                    this.tabHeader = array;
                }
                if (Number(this.type) === 0) {
                    let array = [
                        {name: 'Transaction Detail Report', component: 'transaction'},
                    ];
                    this.$router.push({path: `/mp/transaction` ,query: {type: this.type}});
                    this.tabHeader = array;
                }
            }

        },
        created () {
            this.LoadData()
        },

        mounted () {
        },

        updated () {
        }
    }
</script>

<style scoped>
  @import '../../css/reset.css';
  @import '../../css/index.css';
    .borderBottom{
        border-bottom: 1px solid #dcdee2;;
    }
    .navStyle{
        display: inline-block;
        height: 100%;
        padding: 16px 0;
        margin-right: 16px;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 14px;
        text-decoration: none;
        font-family: Helvetica;
        position: relative;
        opacity: 0.5;
    }
    .navStyleActive{
        font-family: Helvetica-Bold;
        display: inline-block;
        height: 100%;
        padding: 16px 0;
        margin-right: 16px;
        box-sizing: border-box;
        cursor: pointer;
        text-decoration: none;
        position: relative;
        font-size: 14px;
        color: #70605F;
        border-bottom: 1px solid #70605F;
        opacity: 1;
    }
    .TabsHeightA{
        width: 100%;
    }
</style>
