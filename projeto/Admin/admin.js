document.addEventListener('DOMContentLoaded', (event) => {
    // Função para gerar um ID único
    function gerarIdUnico() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Função para adicionar um novo cadastro à lista
    function adicionaCadastroNaLista(cadastro) {
        const lista = document.getElementById('cadastroLista');
        const item = document.createElement('li');
        item.innerHTML = ` Data : ${cadastro.data} <br> Nome: ${cadastro.nome}<br > Email: ${cadastro.email}`;
        item.setAttribute('data-id', cadastro.id);

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = function() {
            excluirCadastro(cadastro.id);
        };
        item.appendChild(btnExcluir);
        lista.appendChild(item);
    }

    // Função para carregar os cadastros do Local Storage e exibi-los na lista
    function carregaCadastros() {
        const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
        cadastros.forEach(adicionaCadastroNaLista);
    }

    // Função chamada quando o botão "Cadastrar" é clicado
    window.clicou = function() {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const data = new Date().toLocaleString();
        const id = gerarIdUnico();

        const cadastro = { id, nome, email, data };
        let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
        cadastros.push(cadastro);
        localStorage.setItem('cadastros', JSON.stringify(cadastros));

        adicionaCadastroNaLista(cadastro);

        // Limpar campos do formulário
        limparCampos();
    }

    // Função para limpar os campos do formulário
    window.limparCampos = function() {
        document.getElementById('adminForm').reset();
    }

    // Função para excluir um cadastro específico
    window.excluirCadastro = function(id) {
        let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
        cadastros = cadastros.filter(cadastro => cadastro.id !== id);
        localStorage.setItem('cadastros', JSON.stringify(cadastros));
        atualizarLista();
    }

    // Função para excluir todos os cadastros
    window.excluirTodos = function() {
        localStorage.removeItem('cadastros');
        atualizarLista();
    }

    // Função para atualizar a lista de cadastros
    function atualizarLista() {
        const lista = document.getElementById('cadastroLista');
        lista.innerHTML = '';
        carregaCadastros();
    }

    // Função para pesquisar cadastros
    window.pesquisar = function() {
        const pesquisa = document.getElementById('pesquisa').value.toLowerCase();
        const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
        const lista = document.getElementById('cadastroLista');
        lista.innerHTML = '';
        cadastros.forEach(cadastro => {
            if (cadastro.nome.toLowerCase().includes(pesquisa) || cadastro.email.toLowerCase().includes(pesquisa)) {
                adicionaCadastroNaLista(cadastro);
            }
        });
    }

    // Carregar cadastros ao carregar a página
    carregaCadastros();
});
