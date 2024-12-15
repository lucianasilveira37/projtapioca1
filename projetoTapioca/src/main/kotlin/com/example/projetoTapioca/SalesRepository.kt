package com.example.projetoTapioca

import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

@Entity
@Table(name = "sales")
data class Sales(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0,  // O id será gerado automaticamente
    val id_food: Int,
    val cpf: String,
    val date_sale: String,
    val description: String,
    val price: Float
)

interface SalesRepository: JpaRepository<Sales, Int> {
    @Query("select * from sales where cpf = :cpf", nativeQuery = true)
    fun  getAllSalesByCpfClient(@Param("cpf") cpf:String): List<Sales>
}