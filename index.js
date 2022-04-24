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
	if (tweets.length < 10) res.json(tweets)
	else {
		for (let i = tweets.length - 1; i !== tweets.length - 11; i--) {
			// console.log(tweets[i].username)
			// console.log(users)
			let { avatar } = users.find(
				user => user.username === tweets[i].username
			)
			// console.log(avatar)
			const lastTweet = {
				username: tweets[i].username,
				avatar: avatar,
				tweet: tweets[i].tweet,
			}
			latestTweets.push(lastTweet)
		}
		res.json(latestTweets)
	}
})

app.listen(5000, () => {
	console.log("Server is running on port 5000")
})
