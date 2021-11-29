var estados = [];
var cidades = [];
const inputUF = document.getElementById("uf");
const inputCidade = document.getElementById("cidade");

function carregarEstados() {
    if (estados.length > 0) {
        inserirEstados(inputUF);
        inputUF.setAttribute("disabled", "enabled");
    } else {
        fetch("assets/js/estadosemunicipios/estados.json")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                estados = data;
                inserirEstados(inputUF);
                inputCidade.removeAttribute("disabled");
            })
            .catch(function (error) {
                inputCidade.setAttribute("disabled", "disabled");
                console.log(error);
            });
    }
}
function inserirEstados(element) {
    var label = label ? label : "Selecione um Estado";
    var options = '<option value="">' + label + "</option>";
    for (var i in estados) {
        options +=
            '<option value="' +
            estados[i].sigla +
            '">' +
            estados[i].nome +
            "</option>";
    }
    element.innerHTML = options;
}

function carregarCidades(estado_sigla) {
    fetch("assets/js/estadosemunicipios/" + estado_sigla + ".json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cidades = data;
            inputCidade.innerHTML =
                "<option value='-1'>Selecione uma cidade</option>";
            inserirCidades(inputCidade);
        })
        .catch(function (error) {
            inputCidade.setAttribute("disabled", "disabled");
            console.log(error);
        });
}

function inserirCidades(element) {
    inputCidade.innerHTML = "<option value='-1'>Selecione uma cidade</option>";
    var label = label ? label : "Selecione uma Cidade";
    var options = '<option value="">' + label + "</option>";
    for (var i in cidades) {
        options +=
            '<option value="' +
            cidades[i].id +
            '">' +
            cidades[i].nome +
            "</option>";
    }
    element.innerHTML = options;
}
document.addEventListener("DOMContentLoaded", function () {
    inputUF.onchange = function () {
        inputCidade.innerHTML =
            "<option value='-1'>Selecione uma cidade</option>";
        carregarCidades(this.value);
    };
    carregarEstados();
});
