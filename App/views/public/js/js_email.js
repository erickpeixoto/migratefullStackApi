$(function(){


              /***
                 *   @author Erick Eduardo - _accon Softaware Corporativo
                 *   @access public
                 *   @exemple  METHOD INITIALIZE
                 *
                 **/
                  setEmail();


        })



  /***
     *   @author Erick Eduardo - _accon Softaware Corporativo
     *   @access public
     *   @exemple  METHOD DE ENVIO DE E-MAIL
     *   @param { } [DATA] [SERVICE DE ENVIO]
     **/

      function setEmail(){


                  $(document).on('submit', 'form[submit="sac"]', function(event) {
                 
                        $('form[submit="sac"]').find('button').text('Enviando mensagem...').attr('disabled', true);
                        
                         sendEmail({
                                   ACTION: 'SAC',
                                   POST:  $(this).serializeArray()
                          })
                                    event.preventDefault();
                     })

                      
                      $(document).on('click', '[target="Contato"]', function(event) {
                              
                              composerViewMailer("SAC");
                      })

                       $(document).on('click', '[target="Finaliza"]', function(event) {
                              
                              composerViewMailer("PEDIDO");
                      })
                      $(document).on('click', '[action="recoverPwd"]', function(event) {
                              
                              composerViewMailer("SENHA");
                           
                      })
                      $(document).on('click', '[action="executeRecover"]', function(event) {
                              
                              $('button[action="executeRecover"]').text('Enviando e-mail...').attr('disabled', true);
                      }) 
      }





  /***
     *   @author Erick Eduardo - _accon Softaware Corporativo
     *   @access public
     *   @exemple  METHOD DE VERIFICACAO DE SERVICO E-MAIL
     *   @param { } [DATA] [SERVICE DE ENVIO]
     **/
          function sendEmail(DATA){

                  switch(DATA.ACTION) {
                    
                     
                        case 'CHANGE_PASS':
                                
                       
                     
                                /***
                                   *   @author Erick Eduardo - _accon Softaware Corporativo
                                   *   @exemple  OBJETOS DE CONSUMO DE RECURSO
                                   **/
                                      var   _token   = getDominio() + '?code='+ DATA.DATA.TOKEN + '#recover'
                                          , _name    = DATA.DATA.USER.USER.CLI_NOME
                                          , _email   = DATA.DATA.USER.USER.CLI_LOGIN
                                          , _hour    = getHour();
                                      
                                /***
                                   *   @author Erick Eduardo - _accon Softaware Corporativo
                                   *   @exemple  CONSUMO DE RECURSO
                                   **/
                                        $('[data-mailer="nome-cliente-pass"]').html(_name);
                                        $('[data-mailer="token-cliente-pass"]').attr('href', _token)
                                        $('[data-mailer="hora-cliente-pass"]').html(_hour);
                                        
                                /***
                                   *   @author Erick Eduardo - _accon Softaware Corporativo
                                   *   @exemple  CONFIGURAÇÃO DE ENVIO
                                   **/     
                                       var _EMAIL = {
                                                      html: $('[data-container="Mailer"]').html(),
                                                      header: "Dídio Pizza",
                                                      to: _email,
                                                      subject: "Dídio Pizza - Recuperação de Senha :: Pedido Online"
                                                    }

                                /***
                                   *   @author Erick Eduardo - _accon Softaware Corporativo
                                   *   @exemple  API DE ENVIO DE EMAIL
                                   **/
                                       getApiMailer(_EMAIL, function(response){ 

                                                   if(response.return){
                                                             
                                                           $('[data-container="recover-pwd"]').addClass('hide');
                                                           $('.success-email').removeClass('hide');
                                                           $('.email-seccess').text(DATA.DATA.USER.USER.CLI_LOGIN);
                                                           $('button[action="executeRecover"]').attr('action','recoverPwd').text('Esqueci a senha').attr('disabled', false); 
                                                              alert('<big><i class="fa fa-thumbs-o-up"></i></big>', 'Mensagem enviada com sucesso! \n Por favor, siga as instruções recebidas por e-mail para alterar sua senha.');
                                                         }else{
                                                              alert('<big><i class="fa fa-thumbs-o-down"></i></big>', 'Falha ao enviar e-mail');
                                                         }

                                         }) 

                                            

                                                           

                                                               
                                 

                          break;  



                          case 'SAC':     
                                    

                                /***
                                   *   @author Erick Eduardo - _accon Softaware Corporativo
                                   *   @exemple  OBJETOS DE CONSUMO DE RECURSO
                                   **/
                                      var   _name    = DATA.POST[0]
                                          , _email   = DATA.POST[1]
                                          , _phone   = DATA.POST[2]
                                          , _message = DATA.POST[3];
                                      
                                /***
                                   *   @author Erick Eduardo - _accon Softaware Corporativo
                                   *   @exemple  CONSUMO DE RECURSO
                                   **/
                                        $('[data-mailer="name"]').html(_name.value);
                                        $('[data-mailer="email"]').html(_email.value);
                                        $('[data-mailer="phone"]').html(_phone.value);
                                        $('[data-mailer="message"]').html(_message.value);
                              
                                /***
                                   *   @author Erick Eduardo - _accon Softaware Corporativo
                                   *   @exemple  CONFIGURAÇÃO DE ENVIO
                                   **/     
                                       var _EMAIL = {
                                                      html: $('[data-container="Mailer"]').html(),
                                                      header: "Dídio Pizza",
                                                      to: "contato@pizzahutdf.com.br",
                                                      cc: "suporte@accon.com.br",
                                                      subject: "Dídio Pizza - SAC :: Pedido Online"
                                                    }

                                /***
                                   *   @author Erick Eduardo - _accon Softaware Corporativo
                                   *   @exemple  API DE ENVIO DE EMAIL
                                   **/
                                       getApiMailer(_EMAIL, function(response){ 

                                                   if(response.return){
                                                              
                                                              $('form[submit="sac"]').find('button').text('Enviar').attr('disabled', false);
                                                              $('form[submit="sac"]').find('input').val('');
                                                              $('form[submit="sac"]').find('textarea').val('');
                                                              alert('<big><i class="fa fa-thumbs-o-up"></i></big>', 'Mensagem enviada com sucesso!');
                                                         }else{
                                                              alert('<big><i class="fa fa-thumbs-o-down"></i></big>', 'Falha ao enviar e-mail');
                                                         }
                                         }) 
                          break;



                        case 'PEDIDO':     
                                      
                                      /***
                                         *   @author Erick Eduardo - _accon Softaware Corporativo
                                         *   @exemple  OBJETOS DE CONSUMO DE RECURSO
                                         **/
                                              var  _PEDIDO         = DATA.POST.PEDIDO                                   
                                                 , _ITENS          = DATA.POST.ITENS                                   
                                                 , _LOJA_ATENDENTE = getLojaIn(_PEDIDO.PED_LOJA)
                                                 , _USER           = __GETLocalStorage('ACCESS')  
                                                 , _ADDRESS        = getInAddress(_PEDIDO.PED_ID_ENDERECO)
                                                 , _FORMAS         = getInPgto(_PEDIDO.PED_LOJA)
                                                 , _FRM_PAGAMENTO  = getInPgtoLoja(_PEDIDO.PED_ID_PGTO,_FORMAS)       
                                                 , _htmlItens      = '';
                             
                                      /***
                                         *   @author Erick Eduardo - _accon Softaware Corporativo
                                         *   @exemple  DADOS DO CLIENTE
                                         **/
                                              var   _name    = _USER.CLI_NOME
                                                  , _email   = _USER.CLI_LOGIN
                                                  , _phone   = _USER.CLI_FONE;

                                      /***
                                         *   @author Erick Eduardo - _accon Softaware Corporativo
                                         *   @exemple  DADOS DO ENDEREÇO
                                         **/
                                              var   _loja    =  _LOJA_ATENDENTE.REST_ECOMMERCE_NOME
                                                  , _address =  _ADDRESS.CDA_LOGRADOURO
                                                  , _cep     =  _ADDRESS.CDA_CEP
                                                  , _cidade  =  _ADDRESS.CDA_CIDADE;

                                      /***
                                         *   @author Erick Eduardo - _accon Softaware Corporativo
                                         *   @exemple  DADOS DO PEDIDO
                                         **/
                                              var   _id      =  _PEDIDO.PED_ID
                                                  , _total   =  _PEDIDO.PED_VLR_PEDIDO
                                                  , _VOUCHER = ((_PEDIDO.PED_OBS) ? _PEDIDO.PED_OBS.split('-') : []);
                                      
                                        /***
                                         *   @author Erick Eduardo - _accon Softaware Corporativo
                                         *   @exemple  FORMA DE PAGAMENTO
                                         **/                                              
                                              var   _formaPgto  = _FRM_PAGAMENTO.FPG_DESCRICAO
                                                  , _trocoPara  = _PEDIDO.PED_VLR_RECEBIDO
                                                  , _valorTroco = _PEDIDO.PED_VLR_TROCO;

                                      /***
                                         *   @author Erick Eduardo - _accon Softaware Corporativo
                                         *   @exemple  ITENS DO PEDIDO
                                         **/
                                              _ITENS.forEach(function(item){
                                                            
                                                           var   $PRODUTO = getInProduto(item.PIT_PROD_ID)
                                                               , _PRODUTO = $PRODUTO.PRODUTO;
                                                      
                                                              _htmlItens += ((item.PIT_FRACAO == 0.5) ? '1/2' : item.PIT_QTD)+'X  </span>'+_PRODUTO.PRO_DESCRICAO_ECOMMERCE+' <br />'+
                                                                             'PREÇO UND: R$ '+( number_format(item.PIT_PRC_UNITARIO, 2, ',', '.') )+' <br />'+
                                                                             'PREÇO TOTAL: R$ '+( number_format((item.PIT_PRC_TOTAL), 2, ',', '.')  )+' <br /> ----------------------<br /><br />';
                                              })

                                      /***
                                         *   @author Erick Eduardo - _accon Softaware Corporativo
                                         *   @exemple  CUPOM DE DESCONTO
                                         **/
                                              var   _codigoCupom = (_VOUCHER[0]) ? _VOUCHER[0] : null
                                                  , _valorCupom  = parseFloat((_VOUCHER[2]) ? _VOUCHER[2] : 0);
          
                                      /***
                                         *   @author Erick Eduardo - _accon Softaware Corporativo
                                         *   @exemple  CONSUMO DE RECURSO
                                         **/
                                            $('[data-mailer="num-pedido"]').html(_id);
                                            $('[data-mailer="nome-cliente-pedido"]').html(_name);
                                            $('[data-mailer="email-cliente-pedido"]').html(_email);
                                            $('[data-mailer="telefone-cliente-pedido"]').html(_phone);
                                            $('[data-mailer="loja-atendente-pedido"]').html(_loja);
                                            $('[data-mailer="end-entrega-pedido"]').html(_address);
                                            $('[data-mailer="cep-entrega-pedido"]').html(_cep);
                                            $('[data-mailer="cidade-entrega-pedido"]').html(_cidade);
                                            $('[data-mailer-list="itens-pedido"]').html(_htmlItens);
                                            $('[data-mailer="total-pedido"]').html(number_format(_total, 2, ',', '.'));
                                            $('[data-mailer="hora-pedido"]').html(parseDate(_PEDIDO.PED_DATA).DATE + ' às ' +getHour());

                                 
                                      /***
                                         *   @author Erick Eduardo - _accon Softaware Corporativo
                                         *   @exemple  CONSUMO DE RECURSO - CUPOM
                                         **/
                                            if(_VOUCHER.length > 0){

                                                  $('.cupom-hidden').css('display',"block");
                                            }else{
                                                  $('.cupom-hidden').css('display',"none");
                                            }
                                            $('[data-mailer="codigo-cupom-pedido"]').html(_codigoCupom);
                                            $('[data-mailer="valor-cupom-pedido"]').html('R$ '+ number_format(_valorCupom, 2, ',', '.'));
                                            $('[data-mailer="forma-pagamento-pedido"]').html(_formaPgto);
                                            $('[data-mailer="troco-para-pedido"]').html('R$ '+number_format(_trocoPara, 2, ',', '.'));
                                            $('[data-mailer="valor-troco-pedido"]').html('R$ '+number_format(_valorTroco, 2, ',', '.'));
                                            
                                                if(isNaN(_valorTroco)){
                                                      $('[data-mailer="txt-valor-troco-pedido"],[data-mailer="valor-troco-pedido"]').addClass('hide'); 
                                                      $('[data-mailer="txt-troco-para-pedido"],[data-mailer="troco-para-pedido"]').addClass('hide'); 
                                                  }else{
                                                      $('[data-mailer="txt-troco-para-pedido"],[data-mailer="valor-troco-pedido"]').removeClass('hide'); 
                                                      $('[data-mailer="txt-valor-troco-pedido"],[data-mailer="troco-para-pedido"]').removeClass('hide'); 
                                                   }

                                           
                                            var _EMAIL = {
                                                          html: $('[data-container="Mailer"]').html(),
                                                          header: "Dídio Pizza",
                                                          to: _email,
                                                          cc: "suporte@accon.com.br",
                                                          subject: "Dídio Pizza - Pedido Online :: #"+_id 
                                                        }

                                            getApiMailer(_EMAIL, function(response){ }) 
                          break;
                 }
          }







  /***
     *   @author Erick Eduardo - _accon Softaware Corporativo
     *   @access public
     *   @exemple  METHOD DE CONSUMO FRON-END, RESPONSAVEL PELA RENDERIZACAO DO HTML A SER ENVIADO
     **/
        function composerViewMailer(VIEW){

                switch(VIEW){
                 
                    case "SAC":
                              $.get("App/views/public/email/email-sac.html", function(data) {
                                   $('section[data-container="Mailer"]').append(data);
                             });
                    break;

                    case "PEDIDO":
                             $.get("App/views/public/email/email-documento.html", function(data) {
                                   $('section[data-container="Mailer"]').html(data);
                             });
                    break;

                     case "SENHA":
                             $.get("App/views/public/email/email-senha.html", function(data) {
                                   $('section[data-container="Mailer"]').html(data);
                             });
                    break;
                 }

        }





