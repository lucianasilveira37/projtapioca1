package com.example.projetoTapioca

import org.springframework.web.bind.annotation.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*

@RestController
class TapiocasController(
    val foodsRepository_: foodsRepository,
    val recheiosRepository: recheiosRepository,
    val salesRepository: SalesRepository
) {

    // Endpoint para consultar os recheios de um alimento
    @GetMapping("/food")
    fun getRecheiosByFoodId(@RequestParam("id") id: Int = 0): Map<String, Any> {
        return try {
            val food = foodsRepository_.findById(id)
            val recheios: List<Map<String, Float>> = recheiosRepository.getAllrecheiosByfoodId(id)
            mapOf(
                "price" to food.get().price,
                "recheio" to recheios
            )
        } catch (e: Exception) {
            mapOf("error" to e.message.toString())
        }
    }

    // Endpoint para consultar o histórico de compras por CPF
    @GetMapping("/history")
    fun getAllSalesByCpfClient(@RequestParam("cpf") cpf: String): List<Sales> {
        return salesRepository.getAllSalesByCpfClient(cpf)
    }

    // Endpoint para processar o pagamento e salvar a venda
    @PostMapping("/payment")
    fun processPayment(@RequestBody paymentRequest: PaymentRequest): Map<String, Any> {
        return try {
            // Validar se o alimento existe
            val food = foodsRepository_.findById(paymentRequest.id_food).orElseThrow {
                Exception("Food not found")
            }

            // Gerar a data da venda
            val dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
            val currentDate = LocalDate.now().format(dateFormatter)

            // Criar uma nova venda
            val newSale = Sales(
                id = 0,  // O banco de dados vai gerar o id automaticamente
                id_food = paymentRequest.id_food,
                cpf = paymentRequest.cpf,
                date_sale = currentDate,
                description = paymentRequest.description,
                price = paymentRequest.price
            )

            // Salvar a venda no banco de dados
            val savedSale = salesRepository.save(newSale)

            // Retornar uma resposta de sucesso
            mapOf("message" to "Payment processed successfully", "sale" to savedSale)
        } catch (e: Exception) {
            mapOf("error" to e.message.toString())
        }
    }
}




