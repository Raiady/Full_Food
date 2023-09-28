
// criar a variável modalKey sera global
let modalKey = 0

// variavel para controlar a quantidade inicial de lanches na modal
let quanLanche = 1

let cart = [] // carrinho


// funcoes auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.menuWindowArea').style.opacity = 0 // transparente
    seleciona('.menuWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.menuWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.menuWindowArea').style.opacity = 0 // transparente
    setTimeout(() => seleciona('.menuWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    // BOTOES FECHAR MODAL
    selecionaTodos('.Descricao--cancelButton, .Descricao--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDosLanches = (lancheItem, item, index) => {
    
    // setar um atributo para identificar qual elemento foi clicado
	lancheItem.setAttribute('data-key', index)
    lancheItem.querySelector('.lanche-item--img img').src = item.img
    lancheItem.querySelector('.lanche-item--price').innerHTML = formatoReal(item.price[2])
    lancheItem.querySelector('.lanche-item--name').innerHTML = item.name
    lancheItem.querySelector('.lanche-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.lancheBig img').src = item.img
    seleciona('.Descricao h1').innerHTML = item.name
    seleciona('.Descricao--desc').innerHTML = item.description
    seleciona('.Descricao--actualPrice').innerHTML = formatoReal(item.price[2])
}


const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .lanche-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.lanche-item').getAttribute('data-key')
    console.log('Lanche clicada ' + key)
    console.log(foodJson[key])

    // garantir que a quantidade inicial de lanches é 1
    quanLanche = 1

    // Para manter a informação de qual lanche foi clicado
    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    // tirar a selecao de tamanho atual e selecionar o tamanho grande
    seleciona('.Descricao--size.selected').classList.remove('selected')

    // selecionar todos os tamanhos
    selecionaTodos('.Descricao--size').forEach((size, sizeIndex) => {
        // selecionar o tamanho grande
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = foodJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    // Ações nos botões de tamanho
    // selecionar todos os tamanhos
    selecionaTodos('.Descricao--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
            // tirar a selecao de tamanho atual e selecionar o tamanho grande
            seleciona('.Descricao--size.selected').classList.remove('selected')
            // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
            size.classList.add('selected')

            // mudar o preço de acordo com o tamanho
            seleciona('.Descricao--actualPrice').innerHTML = formatoReal(foodJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.Descricao--qtmais').addEventListener('click', () => {
        quanLanche++
        seleciona('.Descricao--qt').innerHTML = quanLanche
    })

    seleciona('.Descricao--qtmenos').addEventListener('click', () => {
        if(quanLanche > 1) {
            quanLanche--
            seleciona('.Descricao--qt').innerHTML = quanLanche	
        }
    })
}



const adicionarNoCarrinho = () => {
    seleciona('.Descricao--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')

        // pegar dados da janela modal atual
    	// qual lanche? pegue o modalKey para usar foodJson[modalKey]
    	console.log("Lanche " + modalKey)
    	// tamanho
	    let size = seleciona('.Descricao--size.selected').getAttribute('data-key')
	    console.log("Tamanho " + size)
	    // quantidade
    	console.log("Quant. " + quanLanche)
        // preco
        let price = seleciona('.Descricao--actualPrice').innerHTML.replace('R$&nbsp;', '')
    
        // crie um identificador que junte id e tamanho
	    // concatene as duas informacoes separadas por um símbolo, vc escolhe
	    let identificador = foodJson[modalKey].id+'t'+size

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        // para adicionarmos a quantidade
        let key = cart.findIndex( (item) => item.identificador == identificador )
        console.log(key)

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quanLanche
        } else {
            // adicionar objeto lanche no carrinho
            let lanche = {
                identificador,
                id: foodJson[modalKey].id,
                size, // size: size
                qt: quanLanche,
                price: parseFloat(price) // price: price
            }
            cart.push(lanche)
            console.log(lanche)
            console.log('Sub total R$ ' + (lanche.qt * lanche.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        // mostrar o carrinho
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-open').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '95vw' // usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
	seleciona('.menu-open span').innerHTML = cart.length
	
	// mostrar ou nao o carrinho
	if(cart.length > 0) {

		// mostrar o carrinho
		seleciona('aside').classList.add('show')

		// zerar meu .cart para nao fazer insercoes duplicadas
		seleciona('.cart').innerHTML = ''

        // crie as variaveis antes do for
		let subtotal = 0
		let desconto = 0
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal
		for(let i in cart) {
			// use o find para pegar o item por id
			let lancheItem = foodJson.find( (item) => item.id == cart[i].id )
			console.log(lancheItem)

            // em cada item pegar o subtotal
        	subtotal += cart[i].price * cart[i].qt
            //console.log(cart[i].price)

			// fazer o clone, exibir na telas e depois preencher as informacoes
			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let lancheSizeName = cart[i].size

			let lancheName = `${lancheItem.name} (${lancheSizeName})`

			// preencher as informacoes
			cartItem.querySelector('img').src = lancheItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = lancheName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			// selecionar botoes + e -
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		} // fim do for

		// fora do for
		// calcule desconto 10% e total
		//desconto = subtotal * 0.1
		desconto = subtotal * 0
		total = subtotal - desconto

		// exibir na tela os resultados
		// selecionar o ultimo span do elemento
		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

	} else {
		// ocultar o carrinho
		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}



// MAPEAR foodJson para gerar lista de lanches
foodJson.map((item, index ) => {
    //console.log(item)
    let lancheItem = document.querySelector('.models .lanche-item').cloneNode(true)
    //console.log(lancheItem)
    //document.querySelector('.menu-area').append(lancheItem)
    seleciona('.menu-area').append(lancheItem)
   

    // preencher os dados de cada lanches
    preencheDadosDosLanches(lancheItem, item, index)
    
    // Lanche clicada
    lancheItem.querySelector('.lanche-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou no lanche')

        
        let chave = pegarKey(e)
        

        // abrir janela modal
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

        
        // pegar tamanho selecionado
        preencherTamanhos(chave)

		// definir quantidade inicial como 1
		seleciona('.Descricao--qt').innerHTML = quanLanche

        // selecionar o tamanho e preco com o clique no botao
        escolherTamanhoPreco(chave)
        

    })

    botoesFechar()

}) // fim do MAPEAR foodJson para gerar lista de lanches
// Função para abrir o modal
// ...

document.addEventListener("DOMContentLoaded", function () {
    const finalizarCompraButton = document.querySelector(".cart--finalizar");
    const paymentModal = document.getElementById("paymentModal");
    const orderSummaryModal = document.getElementById("orderSummaryModal");
    const creditCardButton = document.getElementById("creditCardButton");
    const confirmOrderButton = document.getElementById("confirmOrderButton");
    const closeButtons = document.querySelectorAll(".close");

    // Função para abrir o modal de pagamento
    finalizarCompraButton.addEventListener("click", function () {
        paymentModal.style.display = "block";
    });

    // Função para fechar qualquer modal
    closeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            paymentModal.style.display = "none";
            orderSummaryModal.style.display = "none";
        });
    });

    // Função para abrir o modal de resumo do pedido
    function processPaymentAndDisplaySummary() {
        paymentModal.style.display = "none"; // Fecha o modal de pagamento
        orderSummaryModal.style.display = "block"; // Abre o modal de resumo do pedido
    
        // Itere sobre os itens no carrinho e calcule subtotal
        let itemsHTML = ""; // String para armazenar os itens do carrinho
        let subtotal = 0; // Variável para armazenar o subtotal
    
        for (const item of cart) {
            const lancheItem = foodJson.find((foodItem) => foodItem.id == item.id);
            const itemName = `${lancheItem.name} (${lancheItem.sizes[item.size]})`;
            const itemPrice = formatoReal(item.price * item.qt);
    
            // Adicione o item à string de itens do carrinho
            itemsHTML += `
                <div class="cart-item-name">${itemName}</div>
                <div class="cart-item-quantity">${item.qt}</div>
                <div class="cart-item-price">${itemPrice}</div>
            `;
    
            // Atualize o subtotal
            subtotal += item.price * item.qt;
        }
    
        // Defina o valor do desconto, se aplicável
        const desconto = 0; // Substitua 0 pelo valor real do desconto
    
        // Calcule o total
        const total = subtotal - desconto;
    
        // Atualize o conteúdo do resumo do pedido
        const orderSummaryContent = document.querySelector(".order-summary");
        orderSummaryContent.innerHTML = `
            <p>Itens no carrinho:</p>
            ${itemsHTML}
            <p>Subtotal: R$ ${formatoReal(subtotal)}</p>
            <p>Desconto: R$ ${formatoReal(desconto)}</p>
            <p>Total: R$ ${formatoReal(total)}</p>
        `;
    }
    document.getElementById("creditCardButton").addEventListener("click", function () {
        processPaymentAndDisplaySummary(); // Chame a função quando o botão de cartão de crédito for clicado
    });
    
    document.getElementById("debitCardButton").addEventListener("click", function () {
        processPaymentAndDisplaySummary(); // Chame a função quando o botão de cartão de débito for clicado
    });
    
    document.getElementById("cashButton").addEventListener("click", function () {
        processPaymentAndDisplaySummary(); // Chame a função quando o botão de dinheiro for clicado
    });
    // Agora você pode chamar a função processPaymentAndDisplaySummary() sempre que precisar realizar esse processamento
    
    

    // Função para confirmar o pedido (enviar para o banco, etc.)
    confirmOrderButton.addEventListener("click", function () {
        // Coloque o código para enviar o pedido para o banco de dados aqui
        alert("Pedido confirmado! Obrigado por sua compra.");
    });
});



// mudar quantidade com os botoes + e -
mudarQuantidade()



adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()

