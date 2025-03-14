import React, { useState, useEffect } from 'react';
import './style.css';
// import FETCH_ALL_JOBS from '../../config'

import config from "../../config"

const SplitLayout = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;
    const [selectedJob, setSelectedJob] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '', age: '', gender: '', education: '', currentLocation: '',
        currentJob: '', totalExperience: '', currentSalary: '', expectedSalary: '',
        email: '', mobile: '', position: ''
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`${config.apiUrl}api/job`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched jobs:", data);
                setJobs(data)
            })
            .catch((err) => console.error("Error fetching jobs:", err));
    }, []);

    const openModal = (job) => {
        setSelectedJob(job.jobTitle);
        setFormData(prevState => ({ ...prevState, position: job.jobTitle }));
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(formData).some(value => value.trim() === '')) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await fetch(`${config.apiUrl}/api/cm/apply_job/form`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Entered Data:", data);

            if (response.ok) {
                alert('Job Applied Successfully');
                setFormData({
                    fullName: '', age: '', gender: '', education: '', currentLocation: '',
                    currentJob: '', totalExperience: '', currentSalary: '', expectedSalary: '',
                    email: '', mobile: '', position: ''
                });
                closeModal();
            } else {
                alert('Error: ' + (data?.message || 'Something went wrong'));
            }
        } catch (error) {
            console.error('Error while submitting the job application:', error);
            alert('Something went wrong, please try again.');
        }
    };


    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    // const [companyFormData, setCompanyFormData] = useState({
    //     companyName: '', firstName: '', lastName: '', mobile: ''
    // });

    const handleCompanyInquiry = async (e) => {
        e.preventDefault();

        const formValues = {
            companyName: e.target.companyName.value.trim(),
            firstName: e.target.firstName.value.trim(),
            lastName: e.target.lastName.value.trim(),
            mobile: e.target.mobile.value.trim()
        };

        console.log("Sending data:", formValues); // Debug log

        // More strict validation
        for (const [key, value] of Object.entries(formValues)) {
            if (!value) {
                alert(`${key} is required!`);
                return;
            }
        }

        try {
            const response = await fetch(`${config.apiUrl}/api/cm/company/inquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formValues)
            });

            const data = await response.json();
            console.log("Response from server:", data); // Debug log

            if (response.ok) {
                alert('Company Inquiry Sent Successfully');
                e.target.reset();
            } else {
                alert('Error: ' + (data?.message || 'Something went wrong'));
            }
        } catch (error) {
            console.error('Error details:', error); // Debug log
            alert('Something went wrong, please try again.');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row w-full pt-2 gap-3 min-h-[31rem]">
            <div className="text-white flex flex-col w-full p-3 shadow rounded bg-[#3d5561] relative overflow-hidden">
                <h1 className="mb-2 text-small font-bold dark:text-white md:text-2xl lg:text-2xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-400">Recent Opening</span>
                </h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg overflow-hidden">
                        <thead className="bg-gray-700 text-white">
                            <tr>
                                <th className="p-3 text-left">Job Title</th>
                                <th className="p-3 text-left">Open Positions</th>
                                <th className="p-3 text-left">Apply</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                            {currentJobs.map((job, index) => (
                                <tr key={job._id} className="hover:bg-gray-600">
                                    <td className="p-3 flex items-center space-x-2">
                                        {job.jobTitle}
                                        {index < 4 && (
                                            <span id='blink' className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded ml-2">
                                                NEW
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3">{job.position}</td>
                                    <td className="p-3">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => openModal(job)}>
                                            Apply
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav className="mt-3">
                    <ul className="flex justify-center space-x-2">
                        {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, index) => (
                            <li key={index + 1} className={`px-2 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
                                <button onClick={() => paginate(index + 1)} className='px-2'>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                {modalOpen && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3" onClick={closeModal}>
                        <div id='bg-im' className=" p-5 rounded shadow-lg w-full max-w-lg h-[95%] overflow-y-auto modal-background" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-lg font-bold">Apply for {selectedJob}</h2>
                            <form onSubmit={handleSubmit} className="max-h-[90vh]">
                                {Object.keys(formData).map((key) => (
                                    <div className="mb-3" key={key}>
                                        <label htmlFor={key} className="block text-sm font-medium capitalize">
                                            {key.replace(/([A-Z])/g, ' $1')}
                                        </label>
                                        <input
                                            id={key}
                                            type="text"
                                            className="w-full border p-2 rounded"
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleChange}
                                            required
                                            readOnly={key === 'position'}
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-end space-x-2">
                                    <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={closeModal}>Cancel</button>
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Section */}
            {/* <div id='rightDiv' className="flex flex-col items-center justify-center w-full p-3 shadow rounded">
                <h2 className="font-bold text-lg">Share your CV with us!</h2>
                <p className="my-2 pb-3">We will get back to you soon.</p>
                <a
                    href="https://api.whatsapp.com/send?phone=919601505408&text=Hi there !"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700">
                    Send Your CV
                </a>
                <p className="text-sm pt-3 mt-2">Apply for hundreds of jobs across Surat.</p>
            </div> */}

            <div id='rightDiv' className="flex flex-col items-center justify-center w-full p-2 shadow rounded">
                <h1 className="mb-2 text-small font-bold  md:text-2xl lg:text-2xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-400">
                        Do You Need  <span className="text-white font-bold"> STAFF</span>  ?
                    </span>
                </h1>
                <p className="text-gray-300 mt-2">
                    We will help you to find highly skilled  <span className="font-bold text-white">STAFF</span> for your business !
                </p>

                <form className="mt-4 space-y-3" onSubmit={handleCompanyInquiry}>
                    <input id='inp' type="text" name='companyName' placeholder="Company Name" className="w-full p-2  rounded" />
                    <div className="flex space-x-2">
                        <input id='inp' type="text" name='firstName' placeholder="First Name" className="w-1/2 p-2  rounded" />
                        <input id='inp' type="text" name='lastName' placeholder="Last Name" className="w-1/2 p-2  rounded" />
                    </div>
                    <input id='inp' type="text" name='mobile' placeholder="Phone Number" className="w-full p-2  rounded" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        GET IN TOUCH
                    </button>
                </form>

                <div className='flex flex-col items-center justify-center'>
                    <p className="mt-4 font-bold">Call or WhatsApp</p>
                    <a
                        href="https://api.whatsapp.com/send?phone=919601505408&text=Hi, I need STAFF for my business."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
                        9601505408
                    </a>
                    <p className="text-sm pt-3 mt-2">Supplying hundreds of STAFF across Surat.</p>
                </div>
            </div>

        </div>
    );
};

export default SplitLayout;
