'use strict';

/* Criando a função constutora */
function Qrcode() {
    /* Propriedades */
    this.campo = document.getElementById('campo-texto');
    this.msgSpan = document.getElementById('msg');

    this.iniciar = function() {
        this.clicaBotao();
        this.pressionaEnter();
    };

    this.clicaBotao = function() {
        window.addEventListener('click', function(event) {
            const el = event.target;

            if(el.classList.contains('btn-criar-qrcode')) {

                if(!this.campo.value) {
                    this.msgSpan.classList.remove('ocultar');
                    this.msgSpan.classList.add('mostrar');
                    return;
                } 

                
                this.msgSpan.classList.add('ocultar');
                this.msgSpan.classList.remove('mostrar');
                this.buscarDadosAPI(this.campo.value);
                
            }

        }.bind(this));
    };
    
    this.pressionaEnter = function() {
        document.addEventListener('keydown', event => {
            const tecla = event.key;

            if(tecla !== 'Enter') {
                return;
            } else {
                if(!this.campo.value) {
                    this.msgSpan.classList.remove('ocultar');
                    this.msgSpan.classList.add('mostrar');
                    return;
                } 

                
                this.msgSpan.classList.add('ocultar');
                this.msgSpan.classList.remove('mostrar');
                this.buscarDadosAPI(this.campo.value);
            }
        });
    };

    /* Método para buscar dados na API */
    this.buscarDadosAPI = async function(conteudo) {
        const key = '3905|8r8iZQL7oOT0eZWGssx0KeOzyagwW9Yl'; // Chave da API
        const url = `https://api.invertexto.com/v1/qrcode?scale=10&error_level=3&download=true&token=${key}&text=${conteudo}`;

        const response = await fetch(url); // Recebendo um promise

        if(!response.ok) {
            window.alert('Alguma coisa está errado!');
            throw new Error('A buscar gerou um erro');
        }

        const data = await response.blob(); // Obtendo os dados JSON
        this.mostrarResult(data);
    };

    this.criarElementoHTML = (tag) => document.createElement(tag); 

    this.mostrarResult = function(dado) {
        this.campo.value = '';

        const result = document.getElementById('resultado');
        result.innerHTML = '';

        const img = this.criarElementoHTML('img'); // Criando um elemento <img>
        img.src = URL.createObjectURL(dado); // Definindo o atributo src com a URL do blob
        result.appendChild(img);
		
		const linkDownload = this.criarElementoHTML('a');
        linkDownload.href = URL.createObjectURL(dado);
        linkDownload.className = 'btn-download';
        linkDownload.textContent = 'Download do QrCode';
        linkDownload.setAttribute('download', 'qrcode-imagem');
        result.appendChild(linkDownload);
    };
};

const qrcode = new Qrcode(); // Instanciado o objeto
qrcode.iniciar();