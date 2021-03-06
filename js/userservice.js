
const dbUsername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
const dbPassword = "aabcfd48d07fe38f4760f6cd11b83b4a";

const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);


class UserService {

    static login(email, password1,role) {


        const url = "https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_users/_find";

        const requestData = {
            selector: {
                email: email,
                password: password1,
                role: role
            },
            fields: ["_id", "name", "email", "role"],
        };

        return axios.post(url, requestData, { headers: { Authorization: basicAuth } });
    }
    
    static register(formValues) {



        const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_users";

        return   axios.post(url,formValues,{ headers: { 'Authorization': basicAuth } });

    }

    
    static getUsers(){
        
        const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_users/_all_docs?include_docs=true";
    
    
        return axios.get(url, { headers: { Authorization: basicAuth } });
    }



}