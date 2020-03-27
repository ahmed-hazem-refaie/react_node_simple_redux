
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'jquery/dist/jquery'
import axios from 'axios'
import { BrowserRouter, Route,Link,Redirect } from 'react-router-dom' 
import ListStudents from './ListStudent';
import Header from './Header'
import Home from './home'


import React ,{Component} from 'react'

class App  extends Component {
    state = { speaker_list:[] }

    
    
    componentDidMount(){this.get_speaker_list()    }
    get_speaker_list=()=>{
        axios("http://localhost:8090/speaker/list")
        .then((res)=>{
                console.log(res.data);
                this.setState({
                    speaker_list:res.data
                })
        })
    
    }

  
///////
    delete_handle=()=>{
        console.log('deleter handel')
        // this.get_speaker_list() 
       return <Redirect to='/home'/>
    }    

    render() { 
        console.log(this.state)

        return (

                          <BrowserRouter>
                          <Header />
                          {/* <Route exact path="/" component={() => <ListStudents deleteStudent={this.deleteStudent} mydata={this.state.Data} />} /> */}
                          {/* <Route exact path="/List" component={() => <ListStudents  deleteStudent={this.deleteStudent} mydata={this.state.Data} />} /> */}
                          {/* <Route exact path="/AddStudent" component={AddStudent}/> */}
                          <Link to ='/student/list'>student lsit</Link>

                          <Link to="/liststudent">list</Link>
                          {Header}
                          <Route path='/header' component={Header}></Route>
                          <Route path='/home' component={Home}></Route>

                          <Route exact path="/student/list" component={()=><ListStudents my_delete_handle={this.delete_handle}  my_list={this.state.speaker_list}/>}></Route>
                          </BrowserRouter>
                );
    }
}
 
export default  App;