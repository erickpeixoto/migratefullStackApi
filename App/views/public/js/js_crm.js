//Chamada mudança de views
/*$(document).on('click', '[action="view"]', function(event){
    mixpanel.track( $(this).attr('target') );
    console.log($(this).attr('target'))
});*/

//Login automatico
if(__GETLocalStorage('ACCESS')){
	var user = __GETLocalStorage('ACCESS');
	mixpanel.people.set({ "name": user.CLI_NOME, "email" : user.CLI_LOGIN });
	mixpanel.identify(user.CLI_ID);
}
// Login manual e-mail/senha
function setUserMixpanel(){
	var user = __GETLocalStorage('ACCESS');
	mixpanel.people.set({ "name": user.CLI_NOME, "email" : user.CLI_LOGIN });
	mixpanel.identify(user.CLI_ID);
}

//Logo superior
$('header #logoleft').on('click', function(e){
	mixpanel.track("Clique logo superior");
}); 

//Links superiores
$('header #nav a').on('click', function(e){
	mixpanel.track("Clique link superior " + $(this).attr('target'));
});

//Links inferiores
$("footer a").on('click', function(){
	if($(this).attr('target') == "_blank"){
		mixpanel.track("Clique link inferior externo", { "HREF" : $(this).attr('href') });
	} else {
		mixpanel.track("Clique link inferior " + $(this).attr('target'));
	}
})

//Cesta aberta
$('#cart').on('click', function(e){
	if( $('#basket').css('right') != '0px' ){
		mixpanel.track("Abertura cesta");
	}
});

//Cesta continuar
$('header #basket .back').on('click', function(e){
	mixpanel.track("Continuar Cesta");
});

//Click menu de categoria de produtos
$(document).on('click', '#categs .col', function(e){
	mixpanel.track("Menu de produtos", { "CATEGORIA" : $(this).attr('data-ref') });
});

//Busca de produtos
$(document).on('focus', '#groups .search input', function(e){
	mixpanel.track("Busca de produtos");
});

//Clique no banner
$(document).on('click', '#promocoes .slide', function(e){
	mixpanel.track("Click no banner");
});

//Cadastro via validacao do CEP no login
$(document).on('click', '#login button[alt="cadastro"]', function(e){
	mixpanel.track("Login Cadastro");
});

//Recuperar senha
$(document).on('click', '#login button[alt="recuperar"]', function(e){
	mixpanel.track("Login Recuperar Senha");
});

//Login
$(document).on('click', '#login button[alt="login"]', function(e){
	mixpanel.track("Login");
});

//Cadastro
$(document).on('click', 'form[submit="cadastro-cliente"] button[data-track="criar"]', function(e){
	mixpanel.track("Cadastro Cliente");
});

//Cadastro ToGo
$(document).on('click', 'form[submit="cadastro-togo"] button[data-track="criar"]', function(e){
	mixpanel.track("Cadastro ToGo");
});


//Abertura dos detalhes do produto
$(document).on('click', '.products li.product [action="details-product"]', function(e){
	if(e.originalEvent){
		var prod = getInProduto($(this).closest('li.product').attr('data-id'));
		mixpanel.track("Abertura de produto", { "DESCRICAO" : prod.PRODUTO.PRO_DESCRICAO, "GRUPO" : prod.PRODUTO.PRO_GRUPO });
	}
});

//Abertura dos detalhes da promoção
$(document).on('click', '.products li.product [action-details="combo"]', function(e){
	if(e.originalEvent){
		var combo = getInCombo($(this).closest('li.product').attr('data-cmb'));
		mixpanel.track("Abertura de combo", { "DESCRICAO" : combo.CMB_DESCRICAO });
	}
});

//Adicao do pedido na cesta
$(document).on('click', '#product [action="save"]', function(e){
	mixpanel.track("Adição de item na cesta");
});

//Botao finalizar pedido
$(document).on('click', 'header #basket a.checkout', function(e){
	mixpanel.track("Cesta Finalizar Pedido");
});

//Seleção do canal
$(document).on('click', '#finalizar .address li[action="set-togo"]', function(e){
	mixpanel.track("Canal ToGo");
});

//Seleção do canal
$(document).on('click', '#finalizar .address li[action="set-address"]', function(e){
	mixpanel.track("Canal Delivery");
});

//Continuar comprando
$(document).on('click', '#finalizar [target="Cardapio"]', function(e){
	mixpanel.track("Finalizar Pedido Continuar Comprando");
});

//Validando cupom
$(document).on('click', '#finalizar #cupom button', function(e){
	mixpanel.track("Finalizar Pedido Validando Cupom");
});

//Forma de pagamento
$(document).on('click', '#finalizar form input[name="pagamento"]', function(e){
	mixpanel.track("Finalizar Pedido Forma Pagamento: " + $(this).attr('as') );
});

//Finalizando pedido
$(document).on('click', '#finalizar a[action="finaliza-pedido"]', function(e){
	mixpanel.track("Finalizar Pedido");
});

//Status de pedido aberto
$(document).on('click', '#content .pedidos .pedido h3', function(e){
	mixpanel.track("Status de Pedido Aberto");
});