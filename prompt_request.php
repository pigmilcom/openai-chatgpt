<?php 

if(isset($_GET['prompt'])){

    function iso8859_1_to_utf8(string $s): string {
        $s .= $s;
        $len = \strlen($s);
    
        for ($i = $len >> 1, $j = 0; $i < $len; ++$i, ++$j) {
            switch (true) {
                case $s[$i] < "\x80": $s[$j] = $s[$i]; break;
                case $s[$i] < "\xC0": $s[$j] = "\xC2"; $s[++$j] = $s[$i]; break;
                default: $s[$j] = "\xC3"; $s[++$j] = \chr(\ord($s[$i]) - 64); break;
            }
        }
    
        return substr($s, 0, $j);
    }

    require_once('openai.php');
 
    $request = iso8859_1_to_utf8($_GET['prompt']);
    $openai = new ChatGPT;
    if(isset($_GET['img'])){
        $response = $openai->generateImage($request);
    } else { 
        $response = $openai->generateText($request);
    }
 
    echo json_encode(array( 
        'status'=> 'success',
        'data'=> $response['data']
    )); 
} else {

    echo json_encode(array( 
        'status'=> 'error',
        'data'=> 'Invalid params'
    )); 
}