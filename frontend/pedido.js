document.addEventListener('DOMContentLoaded', function () {
  const cpfInput = document.getElementById('cpf');
  const foodOptions = document.querySelectorAll('input[name="food"]');
  const recheiosOptionsContainer = document.getElementById('recheios-options');
  const totalPriceElement = document.getElementById('total-price');
  const payButton = document.getElementById('pay-button');
  const historyButton = document.getElementById('history-button');
  const historyModal = document.getElementById('history-modal');
  const closeHistoryButton = document.getElementById('close-history');
  let totalPrice = 0;
  let selectedFoodId = null;
  let selectedRecheios = [];

  // Função para buscar os recheios de uma comida
  function loadRecheios(foodId) {
      fetch(`/food?id=${foodId}`)
          .then(response => response.json())
          .then(data => {
              selectedRecheios = [];
              recheiosOptionsContainer.innerHTML = ''; // Limpar recheios anteriores
              data.recheio.forEach(recheio => {
                  const recheioLabel = document.createElement('label');
                  const recheioCheckbox = document.createElement('input');
                  recheioCheckbox.type = 'checkbox';
                  recheioCheckbox.value = recheio.name;
                  recheioCheckbox.dataset.price = recheio.price;
                  recheioLabel.appendChild(recheioCheckbox);
                  recheioLabel.appendChild(document.createTextNode(`${recheio.name} - R$ ${recheio.price}`));
                  recheiosOptionsContainer.appendChild(recheioLabel);

                  // Evento para atualizar o preço total ao selecionar um recheio
                  recheioCheckbox.addEventListener('change', function () {
                      updateTotalPrice();
                  });
              });
              updateTotalPrice();
          });
  }

  // Função para atualizar o preço total
  function updateTotalPrice() {
      totalPrice = 0;
      const selectedFood = Array.from(foodOptions).find(food => food.checked);
      if (selectedFood) {
          selectedFoodId = selectedFood.value;
          const foodPrice = parseFloat(selectedFood.nextElementSibling.textContent.split(' - R$ ')[1]);
          totalPrice += foodPrice;
      }

      // Adicionar o preço dos recheios selecionados
      const recheios = recheiosOptionsContainer.querySelectorAll('input[type="checkbox"]:checked');
      recheios.forEach(recheio => {
          totalPrice += parseFloat(recheio.dataset.price);
      });

      totalPriceElement.textContent = totalPrice.toFixed(2);
  }

  // Carregar recheios quando uma comida for selecionada
  foodOptions.forEach(food => {
      food.addEventListener('change', function () {
          loadRecheios(food.value);
      });
  });

  // Enviar os dados de pagamento para o backend
  payButton.addEventListener('click', function () {
      const cpf = cpfInput.value;
      const description = selectedRecheios.map(recheio => recheio.name).join(', ');
      const price = totalPrice;

      if (!cpf || !selectedFoodId) {
          alert("Por favor, complete todos os campos.");
          return;
      }

      fetch('/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cpf, id_food: selectedFoodId, description, price })
      })
          .then(response => response.json())
          .then(data => {
              alert(data.message);
          })
          .catch(error => {
              console.error('Erro ao processar pagamento:', error);
              alert('Ocorreu um erro ao processar o pagamento.');
          });
  });

  // Exibir histórico de compras no modal
  historyButton.addEventListener('click', function () {
      const cpf = cpfInput.value;
      if (!cpf) {
          alert('Digite seu CPF primeiro.');
          return;
      }

      fetch(`/history?cpf=${cpf}`)
          .then(response => response.json())
          .then(data => {
              const historyList = document.getElementById('history-list');
              historyList.innerHTML = data.map(sale => `
                  <div>
                      <strong>${sale.date_sale}</strong><br>
                      ${sale.description} - R$ ${sale.price}
                  </div>
              `).join('');
              historyModal.style.display = 'flex';
          })
          .catch(error => {
              console.error('Erro ao carregar histórico:', error);
              alert('Ocorreu um erro ao carregar o histórico de compras.');
          });
  });

  // Fechar o modal de histórico
  closeHistoryButton.addEventListener('click', function () {
      historyModal.style.display = 'none';
  });
});
