import React,{Component} from 'react';
import Loader from 'react-loader-spinner'
class Search extends Component{
	constructor(props){
		super(props);
		this.searchTerm=React.createRef();
		this.state={
			docs:null,
			numFound:0,
			num_found:0,
			start:0,
			value: ''
			}
		
		this.openLibrarySearch=this.openLibrarySearch.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.renderSearchElements=this.renderSearchElements.bind(this);
	}
	
	handleSubmit(e) {
    		e.preventDefault();
    		this.setState({ value: this.searchTerm.current.value})
        let val=this.state.value;
        console.log(this.searchTerm.current.value);
    		this.openLibrarySearch(this.searchTerm.current.value);
  	}

	renderSearchElements(docs){
       if(docs!=null){
       	console.log(docs)
		return (
           <div className="row">
            <div className="col-lg-8 col-lg-offset-2">
				<span className='text-center'>Total Results: {docs.numFound}</span>
               	<table className="table table-stripped">
                <thead>
                 <th>Title</th>
                 <th>Title suggest</th>
                 <th>Author</th>
                 <th>Edition</th>
                </thead>
                <tbody>
              {docs["docs"].map((doc)=>{
        return(
        
       	<tr>
           <td>{doc.title}</td>
           <td>{doc.title_suggest}</td>
           <td>{(doc.author_name || []).join(', ')}</td>
           <td>{doc.edition_count}</td>
		</tr>
        )

      })}
                
                </tbody>
				</table>
             </div>
           </div>
		); 
	}
	else{
		return (
			<div className="col-12">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <Loader type="Puff"
         color="Black"
         height={50}
         width={50}/>
        </div>
		)}
	}

	openLibrarySearch(searchTerm){
       let openlibraryURI = `https://openlibrary.org/search.json?page=1&q=${searchTerm}}`;
       fetch(openlibraryURI)
       	.then(response => {
        if (response.ok) {
          return response;
        } else {
          console.log('error');
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })   
       	.then(response=>response.json())
		    .then(docs => this.setState({ docs}))
        .catch(function (ex) {
        console.log('Parsing failed',ex)
        })
        
	}
  componentWillMount(){
   
  }
	render(){
		let tabStyles = {paddingTop: '5%'};
		var obj=this.state.docs;
		return(
			<div className='container'>
            <div className="row" style={tabStyles}>
               	<div className="col-lg-8 col-lg-offset-2">
                  	<div className="input-group">
                  	<h3>Value: {this.state.value}</h3>
        			<form onSubmit={this.handleSubmit}>
              {console.log(obj)}
          			<input type="text" ref={this.searchTerm} />
                 
          			<button>Submit</button>
                {this.renderSearchElements(obj)}
        			</form>
                 	</div>
               	</div>
            </div>
          </div>

		);
	}
}

export default Search;