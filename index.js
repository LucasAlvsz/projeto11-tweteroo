import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const tweets = []

function validateRequests(validate, req) {
	console.log(req.body, "12")
	console.log(req.headers.user, "13")
	const errorList = []
	const keysValidate =
		validate === "post-/sign-up" ? ["username", "avatar"] : ["tweet"]
	const keys = Object.keys(req.body)
	keys.forEach(key => {
		if (!keysValidate.includes(key))
			errorList.push(`The key "${key}" is not valid`)
	})
	if (!req.body.username && validate === "post-/sign-up")
		errorList.push("username is required")
	if (!req.body.avatar && validate === "post-/sign-up")
		errorList.push("avatar is required")
	if (!req.headers.user && validate === "post-/tweet")
		errorList.push("Header User is required")
	if (!req.body.tweet && validate === "post-/tweet")
		errorList.push("tweet is required")

	return errorList
}

app.post("/sign-up", (req, res) => {
	const validate = validateRequests("post-/sign-up", req)
	if (validate.length === 0) {
		const { username, avatar } = req.body
		const user = {
			id: users.length + 1,
			username,
			avatar,
		}
		users.push(user)
		console.log(users, "44")
		res.status(201).json("OK")
	} else {
		res.status(400).json({ error: validate })
	}
})

app.post("/tweets", (req, res) => {
	const validate = validateRequests("post-/tweet", req)
	if (validate.length === 0) {
		const { tweet } = req.body
		const { user } = req.headers
		console.log(user, "56")
		const tweetObj = {
			id: tweets.length + 1,
			username: user,
			tweet,
		}
		tweets.push(tweetObj)
		console.log(tweets, "59")
		res.status(201).json("OK")
	} else {
		res.status(400).json({ error: validate })
	}
})

app.get("/tweets", (req, res) => {
	console.log(tweets, "71")
	const page = parseInt(req.query.page)
	let start = page === 1 ? tweets.length : tweets.length - (page - 1) * 10
	const latestTweets = []
	let count = 10
	if (tweets.length > 0) {
		console.log("entrei")
		for (let i = start - 1; i >= 0; i--) {
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
		res.status(200).json(latestTweets)
	} else res.json(latestTweets)
})

app.get("/tweets/:USERNAME", (req, res) => {
	const { USERNAME } = req.params
	console.log(USERNAME)
	const userTweets = tweets.filter(tweet => tweet.username === USERNAME)
	res.status(200).json(userTweets)
})

app.listen(5000, () => {
	console.log("Server is running on port 5000")
})
