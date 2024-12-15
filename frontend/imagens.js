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
  
  
  