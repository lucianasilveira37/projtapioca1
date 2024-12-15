// Função para alternar a visibilidade do menu
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
  }
  
  
    
    
    // Função para exibir uma mensagem de confirmação ao clicar nos links sociais
    document.querySelectorAll('.social-icon, .social-icon1').forEach(link => {
      link.addEventListener('click', function(e) {
          alert('Você será redirecionado para a rede social!');
      });
    });
  
  
  
    document.getElementById('contact-form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário
    
        // Pegando os dados do formulário
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
    
        try {
            // Envia os dados para o backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const result = await response.json();
    
            // Exibe a resposta do servidor
            if (response.ok) {
                document.getElementById('response').innerHTML = '<span style="color: green;">Mensagem enviada com sucesso!</span>';
            } else {
                document.getElementById('response').innerHTML = `<span style="color: red;">Erro: ${result.message}</span>`;
            }
        } catch (error) {
            document.getElementById('response').innerHTML = '<span style="color: red;">Erro ao enviar a mensagem. Tente novamente.</span>';
        }
    });
    