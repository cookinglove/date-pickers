<template>
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
		</transition>
	</div>  	
</template>

<script>
   export default {
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
	}
</script>

<style lang="scss">
.date-pickers .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.date-pickers .fade-enter, .fade-leave-to{
  opacity: 0;
}
.date-pickers .cur-date{
	height: 30px;
	line-height: 30px;
	padding-left: 8px;
	width: 192px;
	border-radius: 0;
	border: 1px solid #ccc;
}
.date-pickers .cur-date:focus{
	border-color: #3C99FC;
}
.date-pickers{
	position: relative;
}
.date-pickers .month-picker{
	width: 276px;
	height: 230px;
	border: 1px solid #ccc;
	color: #333;
	background: #fff;
	position: absolute;
	left: 0;
	top: 33px;
}
.month-picker .pre-arrow,
.month-picker .next-arrow{
	cusor: pointer;
	position: absolute;
	top: 18px;
	color: #aaa;
	border: 0;
	background: none;
}
.date-pickers .pre-arrow{
	left: 18px;
}
.date-pickers .next-arrow{
	right: 18px;
}
.year-month{
	width: 100%;
	text-align: center;
	padding-top: 15px;
}
.year-month .choose-year{
	font-size: 16px;
	cursor: pointer;
}
.date-pickers .fade-enter-active, .date-pickerss .fade-leave-active {
    transition: all 0.5s; 
}
.date-pickers .fade-enter, .date-pickerss .fade-leave-active {
    opacity: 0;
    transform: translateY(-10px); 
}
.date-pickers .month{
	display: block;
	width: 40px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	float: left;
	font-size: 14px;
	color: #333;
	margin: 10px 10px;
	cursor: pointer;
}
.date-pickers .years{
	display: block;
	width: 55px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	float: left;
	font-size: 14px;
	color: #333;
	margin: 10px 2px;
	cursor: pointer;
}
.date-pickers .years:hover,
.date-pickers .month:hover,
.date-pickers .years.active,
.date-pickers .month:active{
	background-color: #6AA4F5;
	color: #fff;
}
.date-pickers .day-screen{
	padding: 0 18px;
}
.date-pickers .month-cont,
.date-pickers .year-cont{
	clear: both;
	overflow: hidden;
}
</style>
