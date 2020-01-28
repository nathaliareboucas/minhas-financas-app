import toastr from 'toastr'

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

export function exibeMensagem(titulo, mensagem, tipo) {
    toastr[tipo](mensagem, titulo)
}

export function mensagemErro(mensagem) {
    exibeMensagem('Erro', mensagem, 'error')
}

export function mensagemAlerta(mensagem) {
    exibeMensagem('Atenção', mensagem, 'warning')
}

export function mensagemSucesso(mensagem) {
    exibeMensagem('Sucesso', mensagem, 'success')
}

export function mensagemInfo(mensagem) {
    exibeMensagem('Informação', mensagem, 'info')
}