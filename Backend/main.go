package main

import (
	"siriwan-backend/controller"
	"siriwan-backend/entity"

	"github.com/gin-gonic/gin" // เพิ่มบรรทัดนี้เข้ามา
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()

	// User Routes
	r.GET("/users", controller.ListUsers)
	r.GET("/user/:id", controller.GetUser)
	r.POST("/users", controller.CreateUser)
	r.PATCH("/users", controller.UpdateUser)
	r.DELETE("/users/:id", controller.DeleteUser)

	// Run the server
	r.Run()
}