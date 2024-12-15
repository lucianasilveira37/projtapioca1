package com.example.projetoTapioca



import jakarta.persistence.Id
import jakarta.persistence.Entity
import jakarta.persistence.Table
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param


@Entity
@Table(name = "recheios")
data class recheios(
    @Id val id: Int,
    val idFood: Int,
    val name: String,
    val  price: Float
)
interface  recheiosRepository: JpaRepository<recheios, Int>{
    @Query("select name, price from recheios where idfood  = :id", nativeQuery = true)
    fun  getAllrecheiosByfoodId(@Param("id") id: Int): List<Map<String, Float>>



        }

