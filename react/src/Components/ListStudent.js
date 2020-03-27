
import React,{Component} from 'react'
import { Route,Redirect } from 'react-router';
import axios from 'axios'


class ListStudent  extends Component {
    // state = {  }
         delete_click=(id)=>{
        console.log(id)
        axios("http://localhost:8090/speaker/delete?_id=15")
        .then((res)=>{
         console.log(res.data);
        this.props.my_delete_handle()

        })
    }
    edit_speaket=()=>{
        console.log('edit here')
        axios.post('http://localhost:8090/test',{name:'ahmed',age:22}).then(
            (res)=>{
                    console.log(res,'done')
            })//end axios 


            axios.post("http://localhost:8090/test",{
             name:'ahmed',age:99,address:'aswan'
            }).then(res=>{
                console.log("Saved");
            })

        }
    render() { 



        console.log('s',this.props)
         var list=this.props.my_list;
         let iterate_speaker =list.map((item,i)=>{

            return(
                <tr>
         <td> <a href={"/speaker/profile?_id="+item._id}> {item._id}</a></td>  
         <td> <a href={"/speaker/profile?_id="+item._id}> {item.fullname}</a></td>  

                
                
                        <td>{item.username}</td>

                    <td>{item.age}</td>
                    <td>
                      
                    
                   
                      <ul>
                        <li><address>city: {item.address.city} </address></li>
                        <li><address>adress: {item.address.street} </address></li>
                        <li><address>building: {item.address.building} </address></li>
                       
                      </ul>

                      
                    
                    </td>

              
                    <td>
                   <button onClick={()=>{this.edit_speaket( )}} className="btn btn-success ">edit</button>
                     
                    </td>

                    <td>
                      <button onClick={()=>{this.delete_click(item._id)}}  class="btn btn-danger ">delet</button>
                     
                    </td>
                   

                </tr>

                
            )
        })

        return (
            <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">fullname</th>
                <th scope="col">username</th>
                <th scope="col">age</th>
    
                <th scope="col">address</th>
                <th scope="col">add</th>
                <th scope="col">delete</th>
    
              </tr>
                
              {/* <% speakers.forEach(element => { %>
                <!-- <p> <%=element%></p> -->
    
                    <tr>
                    <td> <a href="/speaker/profile?_id=<%= element._id %>"> <%=element._id%></a></td>  
                    <td> <a href="/speaker/profile?_id=<%= element._id %>"> <%=element.fullname%></a></td>  
                    
                    
                        <td><%=element.username%></td>
                        <td><%=element.age%></td>
                        <td>
                          
                        
                       
                          <ul>
                            <li><address>city: <%=element.address.city%> </address></li>
                            <li><address>adress: <%=element.address.street%> </address></li>
                            <li><address>building: <%=element.address.building%> </address></li>
                           
                          </ul>
    
                          
                        
                        </td>
    
                  
                        <td>
                          <a href="/speaker/update?_id=<%=element._id%>"> <button class="btn btn-success ">edit</button></a>
                         
                        </td>
    
                        <td>
                          <button onclick="deletespeaker(<%=element._id%>,this)"  class="btn btn-danger ">delet</button>
                         
                        </td>
                       
    
                    </tr>
    
                           <%}); %>  */}
                           {iterate_speaker}
            </thead>
            <tbody>
         
            </tbody>
          </table>
    

            );
    }
}
 
export default ListStudent  ;