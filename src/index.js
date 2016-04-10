import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/searchbar';
import VideoList from './components/video_list';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyAwaMoZoMigJWZR-gSNoqW1Gedzfx6rXE0';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = { videos: [] };

		YTSearch({key: API_KEY, term: 'surf'}, (data) => {
			this.setState({ videos: data });
		});

	}

	render() {
		return (
			<div>
				<SearchBar />
				<VideoList videos={this.state.videos} />
			</div>
		);
	}	
}

ReactDOM.render(<App />, document.querySelector('.container'));