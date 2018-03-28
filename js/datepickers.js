Vue.component('datepickers', {
    template: `
    <div class="date-pickers">
        <input class="cur-date" :value="selectDate" @focus="showDateBox" @blur="hideDateBox">
        <transition name="fade">
            <div class="month-picker" v-if="dateBoxFlag">
                <div class="year-select">
                    <button class="pre-arrow" @click.prevent="reduceYear">《</button>
                    <div class="year-month">
                        <span class="choose-year" @click="switchYear">{{ year }}年</span>
                    </div>
                    <button class="next-arrow" @click.prevent="addYear">》</button>
                </div>
                <div class="day-screen">
                    <div class="month-cont" v-show="isMonth">
                        <span 
                            class="month" 
                            v-model="clickMonth"
                            v-for="months in months"
                            @click="selectMonth($event)"
                            >
                            {{ months }}月
                        </span>
                    </div>
                    <div class="year-cont" v-show="isyear">
                        <span 
                            class="years" 
                            v-model="clickYear"
                            v-for="years in years" 
                            @click="selectYear($event)"
                            >
                            {{ years }}年
                        </span>
                    </div>
                </div>
            </div>
    `,
    name: 'datePickers',
   data () {
            return{
                dateBoxFlag: false,
                selectDate: '',
                year: 0,
                clickMonth:'',
                clickYear:'',
                isyear: false,
                isMonth: true,
                months:[1,2,3,4,5,6,7,8,9,10,11,12],
                years:[2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]
            }
        },
        methods:{
            hideDateBox(){
            },
            showDateBox(){
                var nowDate = new Date();
                var curYear = nowDate.getFullYear();
                var curMonth = nowDate.getMonth() + 1;
                 if (curMonth >= 1 && curMonth <= 9) {
                    curMonth = "0" + curMonth;
                }
                this.year = curYear;
                this.dateBoxFlag = true;
                this.selectDate = this.year +'-'+curMonth;
            },
            switchYear(){
                if(this.isMonth){
                    this.isMonth = !this.isMonth
                    this.isyear = !this.isyear
                }else{
                    this.isMonth = !this.isMonth
                    this.isyear = !this.isyear
                }
            },
            selectYear(event){
                this.isMonth = !this.isMonth
                this.isyear = !this.isyear
                var yearStr = event.currentTarget.innerHTML;
                var yearNum = parseInt(yearStr);
                this.selectDate = this.year = yearNum;
            },
            selectMonth(event){
                var monthStr = event.currentTarget.innerHTML;
                var monthNum = parseInt(monthStr);
                if (monthNum >= 1 && monthNum <= 9) {
                    monthNum = "0" + monthNum;
                }
                this.selectDate = this.year+'-'+monthNum;
                this.dateBoxFlag = false;
            },
            // 增减年份
            addYear () {
                this.dateBoxFlag = true;
                this.year++;
                var arrYear=[];
                if(this.year-1 == Math.max.apply(null, this.years)){
                    for(let i=0;i < 11;i++){
                        arrYear.push(this.year+i)
                    }
                    this.years=arrYear;
                }
            },
            reduceYear () {
                this.dateBoxFlag = true;
                this.year--;
                if(this.year+1 == Math.min.apply(null, this.years)){
                    var arrYear=[];
                    for(let i=10;i>=0;i--){
                        arrYear.push(this.year-i)
                    }
                    this.years=arrYear;
                }
            }
        }
});