import React from 'react'
import AddPost from "../Pages/AddPost";
import FeedsComponent from "../Pages/Feeds";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserDetails } from "../../services/localStorage.service";

const notify = (data: any) => {
    const userDetails = JSON.parse(getUserDetails());
    if (data.data.postAdded.post.authorId !== userDetails.id) {
        toast.info("New Post Added. Kindly refresh the page", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: 1
        });
    }
};

const Home = () => {
    return (
        <div>
            <AddPost />
            <FeedsComponent notify={notify} />
            <ToastContainer />
        </div>
    )
}

export default Home;