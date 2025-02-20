import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
/* import { , useDispatch } from 'react-redux'; */
import './ReportsLayout.css';


 //data obtained from future API 
 const AllReportData = [
    {   id: 1,
        doctorName: 'Dr. Zela Lee',
        doctorSpeciality: 'General Physician',
        charges: '77.00',
        downloadUrl: 'report1.pdf',
        reportUrl: '/reports/report1.pdf',
        patientEmail: 'zack@abc.com',
    },
    {   id: 2,
        doctorName: 'Dr. Williams Huang',
        doctorSpeciality: 'Dentist',
        charges: '122.10',
        downloadUrl: 'report2.pdf',
        reportUrl: '/reports/report2.pdf',
        patientEmail: 'zack@abc.com',
    },
    {   id: 1,
        doctorName: 'Dr. Zela Lee',
        doctorSpeciality: 'General Physician',
        charges: '77.00',
        downloadUrl: 'report1.pdf',
        reportUrl: '/reports/report1.pdf',
        patientEmail: 'testing@abc.com',
    },
 ];

const Reports = () => {
 
    const [user,setUser] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();


// Get stored data from sessionStorage, if user has login successfully
 useEffect( ()=> {
    
    const storedName = sessionStorage.getItem("name");
    const storedEmail = sessionStorage.getItem("email");

    //if not successfully login, navigate to /login endpoint
    if (storedName) {
         setUser(storedName) ;
         setEmail(storedEmail);
    } else {
         navigate("/login");
    }
 }, [] );

 //filter report data based on user email
const reportData = email ? AllReportData.filter( (report) => report.patientEmail === email) : [];

 return (
        <div className="reports-container">
        <h1>Reports for {user} </h1>
        <table className="report-table">
            <thead>
            <tr>
                <th>Serial Number </th>
                <th>Doctor Name</th>
                <th>Doctor Speciality</th>
                <th>Charges</th>
                <th>View Report</th>
                <th>Download Report</th>
            </tr>
            </thead>
            <tbody>
            {reportData.map((report, index) => (
                <tr key={index}>
                <td>{report.id}</td>
                <td>{report.doctorName}</td>
                <td>{report.doctorSpeciality}</td>
                <td>{report.charges}</td>
                <td>
                <a target='_blank' href={report.reportUrl} className="viewReports-btn" rel="noreferrer">
                        View
                    </a>
                </td>
                <td>
                <a target='_blank' href={report.downloadUrl} download className="viewReports-btn" rel="noreferrer">
                         Download
                    </a>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default Reports;