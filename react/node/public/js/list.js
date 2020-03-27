console.log("hhhhhhahahahahahah")


function deletespeaker(id,button){
    console.log(id)
  $.ajax({

url:"http://localhost:8090/speaker/delete?_id="+  id,
method:"get",
dataType:"text",
success:function(result){

$(button).parents("tr").remove();
console.log("hihi ajax",result)},
error:function(error){console.log(error+"")}
})

}



function deleteevent(id,button)
{
  console.log(id);
  $.ajax({


    url:"http://localhost:8090/event/delete?_id="+id,
    method:"get",
    dataType:"text",
    success:function(result)
    {
      $(button).parents("tr").remove();
    },
    error:function(err){
      console.log(err+"");
    }
  });



}