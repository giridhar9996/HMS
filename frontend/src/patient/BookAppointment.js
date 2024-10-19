import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify'
import book from "../images/appointment1.jpeg";
function BookAppointment() {
    const navigate = useNavigate();

    var [details, setDetails] = useState({ p_id: "", d_id: "", specialization: "", appoint: "" })
    var [appointdate,setAppointdate]=useState("");
    var [departments, setDepartments] = useState([]);
    var [doctors, setDoctors] = useState([]);
    var [message, setMessage] = useState();
    const nav = useNavigate();
    useEffect(() => {
        setDetails({ ...details, p_id: sessionStorage.getItem("id") })
        axios.get("http://localhost:7070/appointment/getdept", {

        }).then((response) => {
            setDepartments([...response.data]);
        })
    }, [])

    var handleChange = (args) => {
        debugger;
        if (args.target.name == "appoint") {
            setAppointdate(args.target.value);
            var date = "";
            date = args.target.value;
            var newdate = date.substring(0, 10) +" "+date.substring(11, 16)
            var newDetails={...details}
            newDetails[args.target.name]=newdate
            setDetails(newDetails);
        }
        else {
            var newDetails = { ...details };
            newDetails[args.target.name] = args.target.value
            setDetails(newDetails);
            if (args.target.name == "specialization" && args.target.value != "default") {
                axios.get(`http://localhost:7070/doctor/doctors/${args.target.value}`, {

                }).then((response) => {
                    setDoctors(response.data);
                })


            }

        }

    }


    var handleSubmit = () => {

        axios({
            method: 'post',
            url: 'http://localhost:7070/appointment/book',
            data: details
        })
            .then(function (response) {
                console.log(response.data);
               toast.success('Appointment Booked successfully');
                navigate("/patient/profile");
                
            })
            .catch(function (error) {
                console.log(error);
                
                if(error.response.data.message=="No such dept")
                {
                    toast.error('please select dept')

                }
                if(error.response.data.message=="No such doctor")
                {
                    toast.error('please select Doctor')

                }
                if(error.response.data.appoint=="invalid date" || error.response.data.appoint=="date is blank")
                {
                    toast.error('invalid Date')

                }
               
            })

    }

    return <form><div className="container-fluid">
        <div className="row justify-content-center">
            <div className="col-sm-6" style={{ marginTop: "40px" }}>
                <div className="card "style={{ borderRadius: "30px" }}>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card-body">
                                <div className="card-title">
                                    <h5>Book An Appointment</h5>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-sm-10">
                                        <div className="form-group">
                                            <p className="form-label">Department</p>
                                            <select className="form-select" aria-label="Default select example" name="specialization" value={details.specialization} onChange={handleChange}>
                                                <option value={"default"}>
                                                    Select Department
                                                </option>
                                                {

                                                    departments.map(dept => {
                                                        return <option value={dept.id} key={dept.id}>
                                                            {dept.department}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-sm-10">
                                        <div className="form-group">
                                            <p className="form-label">Doctor</p>
                                            <select className="form-select" aria-label="Default select example" name="d_id" value={details.d_id} onChange={handleChange}>
                                                <option value={"default"}>
                                                    Select Doctor
                                                </option>
                                                {
                                                    doctors.map(doctor => {
                                                        return <option value={doctor.id} key={doctor.id}>
                                                            {doctor.name}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-sm-10">
                                        <div className="form-group">
                                            <p className="form-label">Appointment Date</p>
                                            <input type={"date"} name={"appoint"} value={appointdate} onChange={handleChange} className={"input-group date"} required />
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="row justify-content-center">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <input type={"button"} value={"Book"} onClick={handleSubmit} className={"btn btn-primary"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <img src={book} style={{ height: "100%", width: "100%" }}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br></br>
    </div>
    </form>
}

export default BookAppointment;