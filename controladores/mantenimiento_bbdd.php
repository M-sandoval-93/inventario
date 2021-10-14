<?php

    function backup(){
        date_default_timezone_set('America/Santiago');
        include_once 'conexion.php';
        $error = 0;

        $fecha = date("d_m_Y_(H-i-s");
        $DataBASE=$fecha."_hrs).sql";
        $tables=array();
        $result=$conexion->query('SHOW TABLES'); 

        if($result){
            while($row=mysqli_fetch_row($result)){
            $tables[] = $row[0];
            }
            $sql='SET FOREIGN_KEY_CHECKS=0;'."\n\n";
            $sql.='CREATE DATABASE IF NOT EXISTS '.$bbdd.";\n\n";
            $sql.='USE '.$bbdd.";\n\n";;
            foreach($tables as $table){
                $result=$conexion->query('SELECT * FROM '.$table);  
                if($result){
                    $numFields=mysqli_num_fields($result);
                    $sql.='DROP TABLE IF EXISTS '.$table.';';
                    $row2=mysqli_fetch_row($conexion->query('SHOW CREATE TABLE '.$table));
                    $sql.="\n\n".$row2[1].";\n\n";
                    for ($i=0; $i < $numFields; $i++){
                        while($row=mysqli_fetch_row($result)){
                            $sql.='INSERT INTO '.$table.' VALUES(';
                            for($j=0; $j<$numFields; $j++){
                                $row[$j]=addslashes($row[$j]);
                                $row[$j]=str_replace("\n","\\n",$row[$j]);
                                if (isset($row[$j])){
                                    $sql .= '"'.$row[$j].'"' ;
                                }
                                else{
                                    $sql.= '""';
                                }
                                if ($j < ($numFields-1)){
                                    $sql .= ',';
                                }
                            }
                            $sql.= ");\n";
                        }
                    }
                    $sql.="\n\n\n";
                }else{
                    $error=1;
                }
            }
            if($error==1){
                return false;
            }else{
                // chmod(BACKUP_PATH, 777); 
                $sql.='SET FOREIGN_KEY_CHECKS=1;';
                $handle=fopen(BACKUP_PATH.$DataBASE,'w+');
                if(fwrite($handle, $sql)){
                    fclose($handle);
                    return true;
                }else{
                    return false;
                }
            }
        } else{
            return false;
        }
        $conexion->close();
        $result->free_result();
    }

    function restore($file){
        include_once "conexion.php";

        /* $ruta = "../".$file; */

        $sql=explode(";",file_get_contents($file));
        /* $sql=explode(";",file_get_contents($ruta)); */
        $totalErrors=0;
        set_time_limit (60);
        $conexion->query("SET FOREIGN_KEY_CHECKS=0");
        for($i = 0; $i < (count($sql)-1); $i++){
            if ($conexion->query($sql[$i].";")){  
            } else{
                $totalErrors++;
            } 
        }
        $conexion->query("SET FOREIGN_KEY_CHECKS=1");
        $conexion->close();
        if ($totalErrors <= 0){
            return true;
        } else{
            return false;
        }
    }


    if (isset($_POST['accion'])){
        $accion = $_POST['accion'];
        switch ($accion){
            case "respaldar":
                $data = backup();
                break;

            case "restaurar":
                $select = "../".$_POST['select'];
                $data = restore($select);
                break;
        }
        print json_encode($data);
    }
    
?>