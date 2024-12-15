package com.example.projetoTapioca

data class PaymentRequest(
    val cpf: String,
    val id_food: Int,
    val description: String,
    val price: Float
)