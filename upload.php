<?php
$id = $_REQUEST['id'];
$fileName = $_FILES['photofile']['name'];
$fileType = $_FILES['photofile']['type'];
$fileContent = file_get_contents($_FILES['photofile']['tmp_name']);
file_put_contents('uploads/avatar/'.$id.'.jpg',$fileContent);
// move_uploaded_file($_FILES['photofile']['tmp_name'],'uploads/'.$fileName);
// $dataUrl = 'data:' . $fileType . ';base64,' . base64_encode($fileContent);
// $fileName1 = $_FILES['snapshot']['name'];
// $fileType1 = $_FILES['snapshot']['type'];
// $fileContent1 = file_get_contents($_FILES['snapshot']['tmp_name']);
// file_put_contents('uploads/snapshot/'.$id.'.jpg',$fileContent1);
$json = json_encode(array(
  'name' => $fileName,
  'type' => $fileType
));
echo $json;
?>