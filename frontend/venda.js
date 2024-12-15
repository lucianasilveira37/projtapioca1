// Função para carregar os recheios baseados na comida selecionada
function loadRecheios() {
    const foodId = document.getElementById('food').value;
    const recheiosList = document.getElementById('recheiosList');
    recheiosList.innerHTML = ''; // Limpa a lista de recheios
    
    if (foodId == 0) return; // Se não houver comida selecionada, não faz nada
    
    // Chama o endpoint para buscar os dados da comida e seus recheios
    fetch(`http://localhost:8080/food?id=${foodId}`)
      .then(response => response.json())
      .then(data => {
        const recheios = data.recheio;  // Array de recheios recebidos
        let totalPrice = data.price;    // Preço base da comida

        console.log(data);  // Para depuração: veja o formato de 'data' no console
        
        //Adiciona os recheios à lista
        recheios.forEach(recheio => {
          const recheioElement = document.createElement('div');
          recheioElement.classList.add('recheio-item');
          
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = recheio.price;  // O valor do recheio será o seu preço
          checkbox.onchange = updatePrice;  // Atualiza o preço total quando um recheio for selecionado
          
          const label = document.createElement('label');
          label.textContent = `${recheio.name} - R$ ${recheio.price.toFixed(2)}`;
          
          recheioElement.appendChild(checkbox);
          recheioElement.appendChild(label);
          recheiosList.appendChild(recheioElement);
        });
        
        // Função para atualizar o preço total com base nos recheios selecionados
        function updatePrice() {
          let selectedRecheiosPrice = 0;
          document.querySelectorAll('.recheio-item input:checked').forEach(checkbox => {
            selectedRecheiosPrice += parseFloat(checkbox.value);
          });
          // Exibe o preço total atualizado
          document.getElementById('totalPrice').textContent = (totalPrice + selectedRecheiosPrice).toFixed(2);
        }
      })
      .catch(error => console.error('Error fetching recheios:', error));  // Em caso de erro na requisição
}
