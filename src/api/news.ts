import axios from 'axios';

export default axios.create({
	baseURL: 'https://daily-news-express.herokuapp.com'
});
