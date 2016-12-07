// 输入
var score = prompt("请输入成绩：");
// 判断输入是否为空
while (score === undefined || score === "") {
    alert("输入为空，请输入成绩！");
    var score = prompt("请输入成绩：");
}
// 判断成绩等级的函数
function chack(s) {
    if (s >= 0 && s < 10) {
        alert("10等生");
    } else if (s >= 10 && s < 20) {
        alert("9等生");
    } else if (s >= 20 && s < 30) {
        alert("8等生");
    } else if (s >= 30 && s < 40) {
        alert("7等生");
    } else if (s >= 40 && s < 50) {
        alert("6等生");
    } else if (s >= 50 && s < 60) {
        alert("5等生");
    } else if (s >= 60 && s < 70) {
        alert("4等生");
    } else if (s >= 70 && s < 80) {
        alert("3等生");
    } else if (s >= 80 && s < 90) {
        alert("2等生");
    } else if (s >= 90 && s <= 100) {
        alert("1等生");
    } else {
        alert("请输入1-100之间的成绩。（刷新重试）");
    }
}
// 调用成绩等级判断函数函数
chack(score);