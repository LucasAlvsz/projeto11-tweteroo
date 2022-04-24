import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const users = [
	{
		username: "bobesponja",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
	},
]
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

app.get("/tweets", (req, res) => {
	console.log(tweets)
	const latestTweets = []
	let count = 10
	if (tweets.length > 0) {
		console.log("entrei")
		for (let i = tweets.length - 1; i >= 0; i--) {
			if (count === 0) break
			let { avatar } = users.find(
				user => user.username === tweets[i].username
			)
			const lastTweet = {
				username: tweets[i].username,
				avatar: avatar,
				tweet: tweets[i].tweet,
			}
			console.log(lastTweet)
			latestTweets.push(lastTweet)
			count--
		}
		res.json(latestTweets)
	} else res.json(latestTweets)
})

app.listen(5000, () => {
	console.log("Server is running on port 5000")
})
