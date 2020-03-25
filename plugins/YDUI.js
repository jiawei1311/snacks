import Vue from 'vue';

import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.px.css';
import District from 'ydui-district/dist/jd_province_city_area_id';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */

Vue.prototype.$District = District
Vue.use(YDUI);
