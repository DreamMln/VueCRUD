const baseUrl = "https://restapiwinecooleropga.azurewebsites.net/api/WineCoolers"

// appen oprettes
// Properties der returneres fra data() become reactive state
// and will be exposed on `this`.
// data() VUE bruger denne metode til at få adgang til de info man har brug for 
//til at kunne oprette appen. data() man creater returnere objecter. 
//Vue.js gør at der automatisk er et obj. tilrådighed, så man ikke 
//behøver at kalde data().
const app = Vue.createApp({
    data() { // appens værdier defineres //Prop
        return { //returnere obj der indeholder prop
            ListArray: [], //tomt array til at indeholde data
            error: "",
            getData: "",
            getMessage: "",
            //obj { }
            addData: {capacityOfBottles:"", temp:"",bottlesInStorage:""},
            addMessage:"",
            deleteMessage: "",
            updateData: { id: 0, capacityOfBottles: "", temp: "", bottlesInStorage: "" },
            updateMessage: "",
            getWineData: "", //null
            //var - skal erklæres
            coolerId: 0,
            addMessage1: "",
            filter: null,
            filter1: null
        }
    },
    //GetAll kommer blot uden knap, den dukker op når programmet startes
    created() { // Livcyklus-metoder, der står inde i created(), 
        //bliver kaldt ved appens "fødsel" når den bliver ''mounted''
        //, aka start, når programmet starter kører metoden
        this.getAll()
    }, 
// Methods are functions that mutate state and trigger updates.
// They can be bound as event listeners in templates.
    methods: {
            getAll(){
                //this: dette obj.
                this.getAllHelper(baseUrl)
            },
            //måske kan bruges i flere sammenhænge
            async getAllHelper(url){ // helper-metode til at hente alle info om vind
                // (200)OK - TRY
                try { //fejlhåndtering
                    const result = await axios.get(url) // axios laver http-request(get) til REST-service
                    this.ListArray = result.data // her bliver det tomme array fyldt ud med GET data Fra REST
                    console.log(this.ListArray) // udskrift til konsollen
                // (404)Not Found - CATCH
                } catch(ex) { //ex = exception 
                    alert(ex.message) //fejlmeddelelse i tilfælde af noget går galt

                }
            },
            async getById(){
                const url = baseUrl + "/" + this.id
                try{
                    const response = await axios.get(url)
                    this.getWineData = response.data //her bliver getCoolerData fyldt ud med data
                    this.getMessage = response.status + " " + response.statusText
                }catch (ex) {
                    alert(ex.message)
                }
            },
        async postCooler(){
            try{
                response= await axios.post(baseUrl, this.addData)
                this.addMessage="Response: " + response.status + " " + response.statusText
                this.getAll()
            }catch(ex){
                alert(ex.message)
                //this.addMessage = response.status + " " + response.statusText
            }
        },
        async deleteCooler(coolerId){
            const url = baseUrl + "/" + coolerId
            try {
                const response = await axios.delete(url)
                this.ListArray = "Response: " + response.status + " " + response.statusText
                this.getAll()
            }catch(ex)
            {
                alert(ex.message)
            }
        },
        async updateCooler(){
                const url = baseUrl + "/" + this.updateData.id
                try {
                    response = await axios.put(url, this.updateData)
                    this.updateMessage = "Response " + response.status + " " + response.statusText
                    this.getAll()
                } catch (ex) {
                    alert(ex.message)
                }
        },
        //Opg 7 - tilføjer en bottle mere
        async addEkstraBottle(){
            const url = baseUrl + "/" + this.idCooler
            try{
                response= await axios.post(url)
                this.addMessage1="Response " + response.status + " " + response.statusText
                this.getAll()
            }catch(ex){
                alert(ex.message)
            }
        },
        //sort method - acsending. minus på tal
        sortByTemp() {
            // https://www.w3schools.com/js/js_array_sort.asp
            this.ListArray.sort((cooler1, cooler2) => cooler1.temp - cooler2.temp)
        },
        //sorter på titlen eller navnet f.eks
        //localeCompare() sammenligner to strings i current locale (current locale - language settings der er i browser.)
        //sortByTitle() {
           // this.books.sort((cooler1, cooler2) => cooler1.title.localeCompare(cooler2.title))
        //},

        //filtrer på bottles fra REST - /filter/6
        //med filter https://localhost:44358/api/filter/6
        //bruger helper-metoden, refactor, mindre arbejde, smartere
        //this: dette obj.
        async getFilter(){
            const url = baseUrl+"/filter/"+this.filter1
            this.getAllHelper(url);
            //try { //fejlhåndtering
                //filteret tilføjer, ekstra på URL
                //const result = await axios.get(baseUrl+"/filter/"+this.filter1) // axios laver http-request(get) til REST-service
                //this.ListArray = result.data // her bliver det tomme array fyldt ud med data
                //console.log(this.ListArray) // udskrift til konsollen
            //} catch(ex) { //ex = exception
                //alert(ex.message) //fejlmeddelelse i tilfælde af noget går galt
            //}
        },

    }
}).mount("#app") //her bliver appen mounted
