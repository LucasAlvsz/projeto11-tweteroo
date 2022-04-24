import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const tweets = []

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

app.post("/tweets", (req, res) => {
	const { username, tweet } = req.body
	const tweetObj = {
		id: tweets.length + 1,
		username,
		tweet,
	}
	tweets.push(tweetObj)
	console.log(tweets)
	res.json("OK")
})

app.listen(5000, () => {
	console.log("Server is running on port 5000")
})
