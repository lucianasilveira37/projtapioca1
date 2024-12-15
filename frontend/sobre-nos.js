document.addEventListener('DOMContentLoaded', function () {
  const orderButton = document.getElementById('order-button');
  const submitOrderButton = document.getElementById('submit-order');
  const foodOptions = document.querySelectorAll('input[name="food"]');
  const recheiosOptionsContainer = document.getElementById('recheios-options');
  const totalPriceElement = document.getElementById('total-price');
  const orderForm = document.getElementById('order-form');
  
  // Redirecionar para a página de pedidos
  orderButton.addEventListener('click', function () {
      window.location.href = 'pedido.html';
  });

  // Carregar recheios e calcular o preço total
  function loadRecheios(foodId) {
      // Exemplo de recheios para cada comida
      const recheiosData = {
          1: [{ name: 'Queijo', price: 2 }, { name: 'Frango', price: 3 }],
          2: [{ name: 'Queijo', price: 2 }, { name: 'Presunto', price: 1.5 }],
          3: [{ name: 'Queijo', price: 2 }, { name: 'Frango', price: 3 }]
      };

      recheiosOptionsContainer.innerHTML = ''; // Limpar recheios anteriores
      recheiosData[foodId].forEach(recheio => {
          const recheioLabel = document.createElement('label');
          const recheioCheckbox = document.createElement('input');
          recheioCheckbox.type = 'checkbox';
          recheioCheckbox.value = recheio.price;
          recheioLabel.textContent = `${recheio.name} - R$ ${recheio.price}`;
          recheioLabel.prepend(recheioCheckbox);
          recheiosOptionsContainer.appendChild(recheioLabel);
      });

      // Atualizar o preço total
      updateTotalPrice(foodId);
  }

  // Atualizar o preço total
  function updateTotalPrice(foodId) {
      let basePrice = 0;
      switch(foodId) {
          case '1': basePrice = 10; break;
          case '2': basePrice = 12; break;
          case '3': basePrice = 15; break;
      }

      let recheiosPrice = 0;
      document.querySelectorAll('#recheios-options input:checked').forEach(checkbox => {
          recheiosPrice += parseFloat(checkbox.value);
      });

      totalPriceElement.textContent = (basePrice + recheiosPrice).toFixed(2);
  }

  // Ações ao enviar o pedido
  orderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const cpf = document.getElementById('cpf').value;
      const foodId = document.querySelector('input[name="food"]:checked').value;

      alert(`Pedido realizado com sucesso! CPF: ${cpf}, Comida: ${foodId}, Total: R$ ${totalPriceElement.textContent}`);
  });

  // Carregar recheios iniciais
  foodOptions.forEach(option => {
      option.addEventListener('change', function () {
          loadRecheios(this.value);
      });
  });

  // Carregar recheios da comida padrão
  loadRecheios('1');
});
