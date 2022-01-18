var info_data = ["13", "24", "234", "345"]
function update_and_renew(from_date, to_date, editors, times){
    if (from_date != undefined) info_data[0] = from_date;
    if (to_date != undefined) info_data[1] = to_date;
    if (editors != undefined) info_data[2] = editors;
    if (times != undefined) info_data[3] = times;
    $("#t2").text("从 " + info_data[0])
    $("#t3").text("到 " + info_data[1])
    $("#t4").text("共 " + info_data[2] + " 个编辑者参与编辑了 " + info_data[3] + " 次")
}
update_and_renew("2020-01-03 03:48", "2020-12-29 16:40", "451", "3821")