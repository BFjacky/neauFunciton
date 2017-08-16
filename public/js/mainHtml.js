$(document).ready(function () {
    $('#button1').click(function () {
        console.log('进入成绩课表页面');
        $.get('/main/Sche_Score', function (data, status, xhr) {
            console.log('进入成绩课表页面');
        })
    })
})