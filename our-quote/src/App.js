
import React from "react";
import axios from "axios";
import Form from "./components/Form"
import eventbus from "./components/eventBus";
  
class App extends React.Component {
    state = {
        details: [],
    };
  
    async componentDidMount() {
        console.log("in cdm")
        eventbus.on("submit", (data)=>{
          if(typeof data !== "undefined"){
          console.log("listening:", data)
          this.setState({
            details: this.state.details.concat(data.detail)
          })
        }
        })
        let resp = await axios.get("http://localhost:8000/wel/")
        let data = await resp.data;         
        console.log("DATA:", data);
        this.setState({details: data})
        console.log("data in state:", this.state.details);
    }
  
    renderSwitch = (param) => {
        switch (param + 1) {
            case 1:
                return "primary ";
            case 2:
                return "secondary";
            case 3:
                return "success";
            case 4:
                return "danger";
            case 5:
                return "warning";
            case 6:
                return "info";
            default:
                return "yellow";
        }
    };
  
    
  
    render() {
        return (
            <div className="container jumbotron ">
                <Form/>
  
                <hr
                    style={{
                        color: "#000000",
                        backgroundColor: "#000000",
                        height: 0.5,
                        borderColor: "#000000",
                    }}
                />

                {this.state.details.map((detail, id) => (
                    <div key={id}>
                        <div className="card shadow-lg">
                            <div className={"bg-" + this.renderSwitch(id % 6) + 
                                          " card-header"}>Quote {id + 1}</div>
                            <div className="card-body">
                                <blockquote className={"text-" + this.renderSwitch(id % 6) + 
                                                   " blockquote mb-0"}>
                                    <h1> {detail.detail} </h1>
                                    <footer className="blockquote-footer">
                                        {" "}
                                        <cite title="Source Title">{detail.name}</cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                        <span className="border border-primary "></span>
                    </div>
                ))}
            // </div>
        );
    }
}
export default App;