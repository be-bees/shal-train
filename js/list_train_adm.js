  $("#header").load("_header.html");

  function listData() {
    // alert("Train Listed successful 11");
var content="";

    TrainService.getTrains().then(res=>{
        let data = res.data.rows;
        let train_list = data.map(obj=>obj.doc);
        let trains = train_list.filter(obj=>obj.status!=='INACTIVE');

        // alert("Train Listed successful");
        console.log(train_list);
       // alert("yes");
        //localStorage.setItem("Added_Train",JSON.stringify(res.data));
        //alert("added in local storage");
let i=0;
        for(let listTrain of trains)
        {
            i=i+1;
            // let trainLink =`<a href='booking.html?name=${listTrain.name}'>${listTrain.name}</a>`;

            let trainEdit =`<button><a href='edit_train_adm.html?id=${listTrain._id}' style="text-decoration:none;">Edit</a></button>`;

            let trainDelete =`<button type='button'  onclick = "cancel_train('${listTrain._id}','${listTrain._rev}');"> Cancel </button>`;

            content= content + "<tr><td>" + i + "</td>" + "<td>" + listTrain.trainNo + "</td>" + "<td>" + listTrain.name + "</td>" + "<td>" + listTrain.noPassenger + "</td>" + "<td>" + listTrain.source + "</td>" + "<td>" + listTrain.destination + "</td>" + "<td>" + listTrain.startTime + "</td>" + "<td>" + listTrain.endTime + "</td>" + "<td>" + listTrain.duration + "</td>" + "<td>" + listTrain.price + "</td>"  + "<td>" + listTrain.stations + "</td>" + "<td>" + trainEdit + trainDelete + "</td></tr>";

            
        document.querySelector("#listTrainDataAdm").innerHTML=content;
        }
        // window.location.href="list.html";
    }).catch(err=>{
        console.log(err.response.data);
        alert("Register failed");
    });
   
}
listData();

function cancel_train(id,rev){
    alert("Do you want to delete this data?");
    console.log(id);
    console.log(rev);
    let url ="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_trains/"+id ;
        const dbusername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
        const dbpassword = "aabcfd48d07fe38f4760f6cd11b83b4a";
    const basicAuth = 'Basic '  + btoa(dbusername+ ":" +dbpassword);

   // axios.delete(url+id+"?rev="+rev, { headers: {'Authorization': basicAuth}})
   
   axios.get(url, { headers: {'Authorization': basicAuth}}).then(res=>{

    let product  = res.data;
    console.log(product);
    product.status ="INACTIVE";

    axios.put(url, product,  { headers: {'Authorization': basicAuth}}).then(res => {
        alert("Deleted succesfully");
        listData();
    
        }).catch(err =>{
            alert("error in deleting");
    
        })
      
   })
    
}


function isStationContains(trains, stationName) {

    let stations = trains.stations.split(",");
    return stations.includes(stationName);

}


function displaysearchTrains(results) {
    let i = 0;
    let content1 = `<table>
   `;
    for (let result of results) {
        i = i + 1;
        trainLink = `<a href='booking.html?name=${result.name}&trainNo=${result.trainNo}&source=${result.source}&destination=${result.destination}&price=${result.price}'>${result.name}</a>`;

        trainEdit = ``;
        trainview = `<a href='booking.html?name=${result.name}&trainNo=${result.trainNo}&source=${result.source}&destination=${result.destination}&price=${result.price}'>Book</a>`;

        content1  = content1 + "<tr><td>" + i + "</td>" + "<td>" + result.trainNo + "</td>" + "<td>" + trainLink + "</td>" + "<td>" + result.noPassenger + "</td>" + "<td>" + result.source + "</td>" + "<td>" + result.destination + "</td>" + "<td>" + result.startTime + "</td>" + "<td>" + result.endTime + "</td>" + "<td>" + result.duration + "</td>" + "<td>" + result.price + "</td>" + "<td>" + result.stations + "</td>" + "<td>" + trainEdit + " " + trainview + "</td></tr>";
        
        // += `<tr>
        // <td> i </td>
        // <td>${result.trainNo}</td>
        // <td>${result.name}</td>
        // <td>${result.noPassenger}</td>
        // <td>${result.source}</td>
        // <td>${result.destination}</td>
        // <td>${result.startTime}</td>
        // <td>${result.endTime}</td>
        // <td>${result.duration}</td>
        // <td>${result.endTime}</td>
        // <td>${result.duration}</td>
        // </tr>`;
    }

    document.querySelector("#listTrainDataAdm").innerHTML = content1;
}

function getStationList() {
    let i = 0;
    let content = [];
    let value="";
    
    TrainService.getTrains().then(res => {
        let data = res.data.rows;
        let trains = data.map(obj => obj.doc);    

    for (let trainObj of trains) {
        let stations= trainObj.stations.split(",");
        content.push(...stations);
            for(let station of stations){
                value+=`
                <option value="${station}">${station}</option>
                `;
            }
            document.querySelector("#sourceStationSearch").innerHTML = value;
            document.querySelector("#destinationStationSearch").innerHTML = value;

        
        
    
    }
    console.log(content);
//    document.querySelector("#listTrainData").innerHTML = content;

    });
}

getStationList();


function searchTrains(trains, sourceSearch, destinationSearch) {

    let results = trains.filter(obj => (obj.source == sourceSearch && obj.destination == destinationSearch) || (isStationContains(obj, sourceSearch) && isStationContains(obj, destinationSearch)));
    
    return results;

}


function abc() {

    event.preventDefault();

    const sourceSearch = document.querySelector("#sourceStationSearch").value;
    const destinationSearch = document.querySelector("#destinationStationSearch").value;
    console.log(sourceSearch + "-" + destinationSearch);

    TrainService.getTrains().then(res => {
        let data = res.data.rows;
        let train_list = data.map(obj => obj.doc);    
    
        let filteredTrains = searchTrains(train_list, sourceSearch, destinationSearch);
        console.table(filteredTrains);
        displaysearchTrains(filteredTrains);

    });
}