import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const users = []

app.post("/sign-up", (req, res) => {
	const { username, avatar } = req.body
	const user = {
		id: users.length + 1,
		username,
		avatar,
	}
	users.push(user)
	console.log(users)
	res.json("OK")
})

app.listen(5000, () => {
	console.log("Server is running on port 5000")
})
