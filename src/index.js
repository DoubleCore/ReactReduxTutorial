import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/searchbar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

const API_KEY = 'AIzaSyAwaMoZoMigJWZR-gSNoqW1Gedzfx6rXE0';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			videos: [], 
			selectedVideo: null
		};
		this.videoSearch('cat');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (data) => {
			this.setState({ 
				videos: data,
				selectedVideo: data[0]
			 });
		});
	}

	render() {
		const videoSearch = _.debounce((term) =>  {this.videoSearch(term)}, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={ videoSearch }/>
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList videos={this.state.videos} onVideoSelect={ (selectedVideo) => this.setState({selectedVideo}) } />
			</div>
		);
	}	
}

ReactDOM.render(<App />, document.querySelector('.container'));