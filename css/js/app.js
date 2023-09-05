const cpfInput = document.querySelector("input[name='cpf']");

cpfInput.addEventListener("input", function() {
  const cpf = cpfInput.value;

  if (!/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/.test(cpf)) {
    cpfInput.setCustomValidity("CPF inválido");
  } else {
    cpfInput.setCustomValidity("");
  }
});
function mascara(i){
   
    var v = i.value;
    
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
 
 }
 function masc(i){
   
    var v = i.value;
    
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    i.setAttribute("maxlength", "14");
    if (v.length == 1) i.value = "(";
    if (v.length == 3) i.value += ")";
    if (v.length == 9) i.value += "-";
 
 }
 function showUserTypeForm(radio) {
   const userType = radio.value;

   // Esconder todos os formulários
   document.getElementById('comumForm').classList.add('hidden');
   document.getElementById('adminForm').classList.add('hidden');

   // Mostrar o formulário relevante com base na seleção
   if (userType === 'comum') {
       document.getElementById('comumForm').classList.remove('hidden');
   } else if (userType === 'admin') {
       document.getElementById('adminForm').classList.remove('hidden');
   }
}
