let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}
  // Objeto para representar o carrinho de compras
        const carrinhoDeCompras = {
            itens: [],
            adicionarItem: function(nome, preco) {
                this.itens.push({ nome, preco });
                this.atualizarCarrinho();
            },
            atualizarCarrinho: function() {
                const cartItemsContainer = document.querySelector('.cart-items-container');

                // Limpa o conteúdo atual do carrinho
                cartItemsContainer.innerHTML = '';

                // Preenche o carrinho com os itens
                this.itens.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.innerHTML = `
                        <span class="fas fa-times" onclick="removerItem('${item.nome}')"></span>
                        <img src="images/${item.nome}.png" alt="${item.nome}"> <!-- Adiciona a imagem do produto -->
                        <div class="content">
                            <h3>${item.nome}</h3>
                            <div class="price">$${item.preco.toFixed(2)}/-</div>
                        </div>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                });
            }
        };

        // Função para remover um item do carrinho
        function removerItem(nome) {
            const index = carrinhoDeCompras.itens.findIndex(item => item.nome === nome);
            if (index !== -1) {
                carrinhoDeCompras.itens.splice(index, 1);
                carrinhoDeCompras.atualizarCarrinho();
            }
        }

        // Função para adicionar um item ao carrinho quando o botão "Add ao Carrinho" é clicado
        function adicionarAoCarrinho(nome, preco) {
            carrinhoDeCompras.adicionarItem(nome, preco);
        }
  
