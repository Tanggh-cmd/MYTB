<?php
//读懂php文件。
include "conn.php";//引入数据库

$pagesize = 8; //单个页面展示的数据条数，自由设置

$sql = "select * from product"; //获取所有的数据

$result = $mysqli->query($sql); //获取数据的结果集(记录集)

$num = $result->num_rows; //记录集的总条数  41

$pagenum = ceil($num / $pagesize); //获取页数  向上取整  3


//获取前端的传来的页面，根据页码查询对应的数据，返回给前端。
if (isset($_GET['page'])) {//接收传入的页面
    $pagevalue = $_GET['page'];
} else {//没有传入页码，页码为1.
    $pagevalue = 1;
}

//偏移量(截取数据库数据)的索引
//$pagesize = 10; //单个页面展示的数据条数，自由设置
$page = ($pagevalue - 1) * $pagesize;

//limit
//limit接收一个或者两个数字参数(整数)
//参1：数据开始位置的索引(从0开始)，偏移量
//参2：返回的记录集数目。
//select * from taobaogoods limit 0 , 10  从偏移量0开始 取8条
//limit 10,10  从偏移量10开始 取8条
//limit 20,10 从偏移量20开始  取8条

$sql1 = "select * from product limit $page,$pagesize";
$res = $mysqli->query($sql1);


//通过二维数组输出
// $result->num_rows; //记录集的条数
// $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
echo json_encode($arr);//输出接口




// include('./conn.php');

// $sql="select * from product";

// $res = $mysqli->query($sql);

// $arr = array();

// while($row = $res->fetch_assoc()){

    // array_push($arr,$row);
// }

// $json = json_encode($arr);

// echo $json;

// $mysqli->close(); -->