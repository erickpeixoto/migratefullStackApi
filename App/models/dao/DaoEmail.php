<?php
/**
* Classe Camada de Modelo de Entidaddade- MVC
* Entidade de Chamados
*
* @author Erick Eduardo <erickeduardo@systemroot.com.br>
* @version 1.0
* @copyright Accon Software Corporativo © 2015.
* @access public
* @package Models - MVC
* @example Classe de Modelo Dao - Direct Access Object [Objeto de Acesso Direto].
*/



// IMPORT
include_once ("App/mailer/class.phpmailer.php");
    
    abstract class DaoEmail{
              /**
                 * UPLOAD  function
                 *
                 * @return void
                 * @author
                 **/
                
                  public function sendDao(Array $DATA){
                      
                    $POST  = $DATA['POST']['DATA']['DATA']['USER'];
                    $EMAIL = $POST['USER']['CLI_LOGIN'];

                    $NOME  = $POST['USER']['CLI_NOME'];
                    $TOKEN = $DATA['POST']['DATA']['DATA']['TOKEN'];
                    $SETTINGS = $DATA['CONFIG']->getCONFIG();
                    $URL =  $SETTINGS['CONFIG']['URL'].'?code='.$TOKEN.'#recover';
                

                                switch ($DATA['POST']['OPERATION']):

                                        case 'CHANGE_PASS':
                                                 
                                                  $CONTENT = ' <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                                                            <html xmlns="http://www.w3.org/1999/xhtml">
                                                              <head>
                                                                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                                                                    <title>Ativação de conta - Pizza Hut</title>
                                                                    <style type="text/css">
                                                                  
                                                                  #outlook a{padding:0;} 
                                                                  .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} 
                                                                  .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} 
                                                                  body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} 
                                                                  table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} 
                                                                  img{-ms-interpolation-mode:bicubic;} 

                                                                  
                                                                  body{margin:0; padding:0;}
                                                                  img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
                                                                  table{border-collapse:collapse !important;}
                                                                  body, #bodyTable, #bodyCell{height:100% !important; margin:0; padding:0; width:100% !important;}

                                                                  

                                                                  

                                                                  #bodyCell{padding:20px;}
                                                                  #templateContainer{width:600px;}

                                                                  
                                                                  body, #bodyTable{
                                                                     background-color:#FFF;
                                                                  }

                                                                  
                                                                  #bodyCell{
                                                                    
                                                                  }

                                                                  
                                                                  #templateContainer{
                                                                    
                                                                  }

                                                                  
                                                                  h1{
                                                                     color:#202020 !important;
                                                                    display:block;
                                                                     font-family:Helvetica;
                                                                     font-size:26px;
                                                                     font-style:normal;
                                                                     font-weight:bold;
                                                                     line-height:100%;
                                                                     letter-spacing:normal;
                                                                    margin-top:0;
                                                                    margin-right:0;
                                                                    margin-bottom:10px;
                                                                    margin-left:0;
                                                                     text-align:left;
                                                                  }

                                                                  
                                                                  h2{
                                                                     color:#404040 !important;
                                                                    display:block;
                                                                     font-family:Helvetica;
                                                                     font-size:20px;
                                                                     font-style:normal;
                                                                     font-weight:bold;
                                                                     line-height:100%;
                                                                     letter-spacing:normal;
                                                                    margin-top:0;
                                                                    margin-right:0;
                                                                    margin-bottom:10px;
                                                                    margin-left:0;
                                                                     text-align:left;
                                                                  }

                                                                  
                                                                  h3{
                                                                     color:#606060 !important;
                                                                    display:block;
                                                                     font-family:Helvetica;
                                                                     font-size:16px;
                                                                     font-style:italic;
                                                                     font-weight:normal;
                                                                     line-height:100%;
                                                                     letter-spacing:normal;
                                                                    margin-top:0;
                                                                    margin-right:0;
                                                                    margin-bottom:10px;
                                                                    margin-left:0;
                                                                     text-align:left;
                                                                  }

                                                                  
                                                                  h4{
                                                                     color:#808080 !important;
                                                                    display:block;
                                                                     font-family:Helvetica;
                                                                     font-size:14px;
                                                                     font-style:italic;
                                                                     font-weight:normal;
                                                                     line-height:100%;
                                                                     letter-spacing:normal;
                                                                    margin-top:0;
                                                                    margin-right:0;
                                                                    margin-bottom:10px;
                                                                    margin-left:0;
                                                                     text-align:left;
                                                                  }

                                                                  

                                                                  
                                                                  #templatePreheader{
                                                                     background-color:#FFF;

                                                                  }

                                                                  
                                                                  .preheaderContent{
                                                                     color:#808080;
                                                                     font-family:Helvetica;
                                                                     font-size:10px;
                                                                     line-height:125%;
                                                                     text-align:left;
                                                                  }

                                                                  
                                                                  .preheaderContent a:link, .preheaderContent a:visited,  .preheaderContent a .yshortcuts {
                                                                     color:#606060;
                                                                     font-weight:normal;
                                                                     text-decoration:underline;
                                                                  }

                                                                  
                                                                  #templateHeader{
                                                                     background-color:#FFF;

                                                                  }

                                                                  
                                                                  .headerContent{
                                                                     color:#505050;
                                                                     font-family:Helvetica;
                                                                     font-size:20px;
                                                                     font-weight:bold;
                                                                     line-height:100%;
                                                                     padding-top:0;
                                                                     padding-right:0;
                                                                     padding-bottom:0;
                                                                     padding-left:0;
                                                                     text-align:left;
                                                                     vertical-align:middle;
                                                                  }

                                                                  
                                                                  .headerContent a:link, .headerContent a:visited,  .headerContent a .yshortcuts {
                                                                     color:#EB4102;
                                                                     font-weight:normal;
                                                                     text-decoration:underline;
                                                                  }

                                                                  #headerImage{
                                                                    height:auto;
                                                                    max-width:600px;
                                                                  }

                                                                  

                                                                  
                                                                  #templateBody{
                                                                     background-color:#FFF;

                                                                  }

                                                                  
                                                                  .bodyContent{
                                                                     color:#505050;
                                                                     font-family:Helvetica;
                                                                     font-size:14px;
                                                                     line-height:150%;
                                                                    padding-top:20px;
                                                                    padding-right:20px;
                                                                    padding-bottom:20px;
                                                                    padding-left:20px;
                                                                     text-align:left;
                                                                  }

                                                                  
                                                                  .bodyContent a:link, .bodyContent a:visited,  .bodyContent a .yshortcuts {
                                                                     color:#EB4102;
                                                                     font-weight:normal;
                                                                     text-decoration:underline;
                                                                  }

                                                                  .bodyContent img{
                                                                    display:inline;
                                                                    height:auto;
                                                                    max-width:560px;
                                                                  }

                                                                  

                                                                  
                                                                  #templateFooter{
                                                                     background-color:#FFF;
                                                                  }

                                                                  
                                                                  .footerContent{
                                                                     color:#808080;
                                                                     font-family:Helvetica;
                                                                     font-size:10px;
                                                                     line-height:150%;
                                                                    padding-top:20px;
                                                                    padding-right:20px;
                                                                    padding-bottom:20px;
                                                                    padding-left:20px;
                                                                     text-align:left;
                                                                  }

                                                                  
                                                                  .footerContent a:link, .footerContent a:visited,  .footerContent a .yshortcuts, .footerContent a span {
                                                                     color:#606060;
                                                                     font-weight:normal;
                                                                     text-decoration:underline;
                                                                  }

                                                                  

                                                                        @media only screen and (max-width: 480px){
                                                                    
                                                                    body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} 
                                                                            body{width:100% !important; min-width:100% !important;} 

                                                                    
                                                                    #bodyCell{padding:10px !important;}

                                                                    

                                                                    

                                                                    
                                                                    #templateContainer{
                                                                      max-width:600px !important;
                                                                       width:100% !important;
                                                                    }

                                                                    
                                                                    h1{
                                                                       font-size:24px !important;
                                                                       line-height:100% !important;
                                                                    }

                                                                    
                                                                    h2{
                                                                       font-size:20px !important;
                                                                       line-height:100% !important;
                                                                    }

                                                                    
                                                                    h3{
                                                                       font-size:18px !important;
                                                                       line-height:100% !important;
                                                                    }

                                                                    
                                                                    h4{
                                                                       font-size:16px !important;
                                                                       line-height:100% !important;
                                                                    }

                                                                    

                                                                    #templatePreheader{display:none !important;} 

                                                                    
                                                                    #headerImage{
                                                                      height:auto !important;
                                                                       max-width:600px !important;
                                                                       width:100% !important;
                                                                    }

                                                                    
                                                                    .headerContent{
                                                                       font-size:20px !important;
                                                                       line-height:125% !important;
                                                                    }

                                                                    

                                                                    
                                                                    .bodyContent{
                                                                       font-size:18px !important;
                                                                       line-height:125% !important;
                                                                    }

                                                                    

                                                                    
                                                                    .footerContent{
                                                                       font-size:14px !important;
                                                                       line-height:115% !important;
                                                                    }

                                                                    .footerContent a{display:block !important;} 
                                                                  }
                                                                </style>
                                                                </head>
                                                                <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="font-family:Helvetica, Arial, Verdana;">
                                                                  <center>
                                                                      <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                                                                          <tr>
                                                                              <td align="center" valign="top" id="bodyCell">

                                                                                  <table border="0" cellpadding="0" cellspacing="0" id="templateContainer">
                                                                                     
                                                                                      <tr>
                                                                                          <td align="center" valign="top">
                                                                      
                                                                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader">
                                                                                                    <tr>
                                                                                                        <td valign="top" class="headerContent">

                                                                                                            <img src="'. $SETTINGS['CONFIG']['URL'].'App/views/public/images/logo-alt.png" width="150" height="auto" style="margin-left: 15px" alt="Pizza Hut"/>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                               
                                                                                            </td>
                                                                                        </tr><br>
                                                                                      <tr>
                                                                                          <td align="center" valign="top">
                                                                          
                                                                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody">
                                                                                                    <tr>
                                                                                                        <td valign="top" class="bodyContent" mc:edit="body_content">
                                                                                                            
                                                                                                             Olá, '.$NOME.'.<br>
                                                                                                            
                                                                                                            Atendendo à sua solicitação, segue abaixo o link para alteração da senha:
                                                                                                            <br />
                                                                                                            <br />
                                                                                                            <br>
                                                                                                            <a href="'.$URL.'" style="padding: 15px 25px; background: #EB4102; color: #FFFFFF; text-decoration: none; border-radius: 5px;">Redefinir senha</a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                              
                                                                                            </td>
                                                                                        </tr><br><br>
                                                                                      <tr>
                                                                                          <td align="center" valign="top">
                                                                   
                                                                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateFooter">
                                                                                                    <tr>

                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                     <td>
                                                                                                            <strong>'.date('d/m/Y').', às '.date('H:i:s').'</strong>
                                                                                                     </td>
                                                                                                     <td valign="top" class="footerContent" style="padding-top:0;" mc:edit="footer_content01">

                                                                                                       <br><br> <p><center>Copyright &copy; 2015 Pizza Hut, Todos os direitos reservados.<center> <br><br><a href="http://accon.com.br" style="float: right"><img src="'. $SETTINGS['CONFIG']['URL'].'App/views/public/images/accon-black.png" width="70" height="auto" alt="_accon"/></a></p>

                                                                                                     </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                    </tr>
                                                                                                </table>
                                                                   
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                   
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </center>
                                                                </body>
                                                            </html> '; 
                                                                                                                                       


     
                                                                           
                                                                              $mail = new PHPMailer();
                                                                              $To = $EMAIL;                  
                                                                              
                                                                              // Define os dados do servidor e tipo de conexão
                                                                              $mail->IsSMTP(); // Define que a mensagem será SMTP
                                                                           
                                                                              $mail->SMTPAuth = true; // Usar autenticação SMTP (obrigatório para smtp.seudomínio.com.br)
                                                                              $mail->Username = 'chamados@acconsuporte.com.br'; // Usuário do servidor SMTP (endereço de email)
                                                                              $mail->Password = 'cham2125'; // Senha do servidor SMTP (senha do email usado)
                                                                               
                                                                              // Define o remetente
                                                                              $mail->From = "no-reply@portalpizzahut.com.br"; // Seu e-mail
                                                                              $mail->Sender = "no-reply@portalpizzahut.com.br"; // Seu e-mail
                                                                              $mail->FromName = "Pizza Hut - Pedido Online"; // Seu nome
                                                                               

                                                                             // Define os destinatário(s)
                                                                              $mail->AddAddress($To, "");

                                                                              // Define os dados técnicos da Mensagem
                                                                                 $mail->IsHTML(true); // Define que o e-mail será enviado como HTML
                                                                                                
                                                                              // Define a mensagem (Texto e Assunto)
                                                                              $mail->Subject  = utf8_decode("Recuperação de Senha - [".date('d/m/Y').' - '.date('H').'h'.date('i')."]"); // Assunto da mensagem
                                                                              $mail->Body = utf8_decode($CONTENT);
                                                                                                 

                                                                             // Envia o e-mail
                                                                              $enviado = $mail->Send();

                                                                                  return $enviado;

                                      break;
                         endswitch;
                                   
                     
                                                   
                                        }
} // CLASS END
              
