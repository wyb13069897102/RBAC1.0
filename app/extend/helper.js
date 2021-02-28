const dateformate = require('dateformat');
module.exports = {
    // 使用格式化日期
    dateFormate(timestap) {
        return dateformate(new Date(timestap) , 'yyyy-mm-dd');
    },
};